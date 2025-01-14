const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize express app
const app = express();

// CORS configuration allowing access from http://localhost:5173
const corsOptions = {
    origin: "http://localhost:5173",
};

app.use(cors(corsOptions));  // Enable CORS for the configured origin
app.use(bodyParser.json());  // Parse incoming JSON request bodies

// Global ticket ID counter to assign unique ticket IDs
let globalTicketId = 1;

// Store logs for tracking system activities
let logs = [];

// Custom log function to capture logs and print them to the server console
function logMessage(message) {
    logs.push(message);
    console.log(message);  // Optional: Keep printing logs to the server console
}

// Ticket class represents a ticket with a unique ID
class Ticket {
    constructor(ticketId) {
        this.ticketId = ticketId;  // Assign the ticket ID
    }

    // Return a string representation of the ticket
    toString() {
        return `Ticket ID: ${this.ticketId}`;
    }
}

// TicketPool class represents the pool of tickets available for sale
class TicketPool {
    constructor(maximumCapacity, totalTickets) {
        this.ticketList = [];  // List of tickets currently in the pool
        this.maximumCapacity = maximumCapacity;  // Max capacity of tickets in the pool
        this.ticketsSold = 0;  // Number of tickets sold so far
        this.totalTickets = totalTickets;  // Total tickets available to be sold
        this.stopped = false;  // Flag to indicate whether the system is stopped
    }

    // Method to add a ticket to the pool (simulates the vendor adding tickets)
    async addTicket(ticket, vendorId) {
        while (!this.stopped) {
            if (this.ticketList.length < this.maximumCapacity) {
                this.ticketList.push(ticket);  // Add ticket to the pool
                logMessage(`Vendor-${vendorId} added a ticket. Pool size: ${this.ticketList.length}`);
                return;
            } else {
                // Wait if the pool is full
                logMessage(`Vendor-${vendorId} waiting to add tickets. Pool is full.`);
                await this.sleep(1000);
            }
        }
    }

    // Method to buy a ticket from the pool (simulates a customer buying a ticket)
    async buyTicket(customerId) {
        while (!this.stopped) {
            if (this.ticketList.length > 0) {
                const ticket = this.ticketList.shift();  // Remove the first ticket from the pool
                this.ticketsSold++;  // Increment the number of tickets sold
                logMessage(`Customer-${customerId} bought a ticket: ( ${ticket.toString()} )`);
                this.checkSystemStop();  // Check if the system should stop (all tickets sold)
                return ticket;
            } else {
                // Wait if the pool is empty
                logMessage(`Customer-${customerId} waiting to buy tickets. Pool is empty.`);
                await this.sleep(1000);
            }
        }
    }

    // Method to check if the system should stop after all tickets are sold
    checkSystemStop() {
        if (this.ticketsSold >= this.totalTickets) {
            this.stopped = true;  // Stop the system once all tickets are sold
            logMessage("\nSystem has stopped: All tickets are sold.\n");
        }
    }

    // Method to return system metrics such as pool size, tickets sold, and whether the system is stopped
    getMetrics() {
        return {
            poolSize: this.ticketList.length,
            ticketsSold: this.ticketsSold,
            stopped: this.stopped,
        };
    }

    // Utility method to sleep for a specified number of milliseconds (simulating delays)
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Vendor class represents a vendor who adds tickets to the pool
class Vendor {
    constructor(vendorId, ticketPool, totalTickets, ticketReleaseRate) {
        this.vendorId = vendorId;  // Vendor ID
        this.ticketPool = ticketPool;  // Ticket pool instance
        this.totalTickets = totalTickets;  // Total tickets to be released by this vendor
        this.ticketReleaseRate = ticketReleaseRate;  // Rate (in seconds) at which tickets are added
    }

    // Start method where the vendor continuously adds tickets to the pool
    async start() {
        for (let i = 0; i < this.totalTickets; i++) {
            if (this.ticketPool.stopped) break;  // Stop if the system is halted
            const ticket = new Ticket(globalTicketId++);  // Create a new ticket with a unique ID
            await this.ticketPool.addTicket(ticket, this.vendorId);  // Add ticket to the pool
            await this.sleep(this.ticketReleaseRate * 1000);  // Wait for the release rate time
        }
    }

    // Utility method to sleep for a specified number of milliseconds
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Customer class represents a customer who buys tickets from the pool
class Customer {
    constructor(customerId, ticketPool, customerRetrievalRate, quantity) {
        this.customerId = customerId;  // Customer ID
        this.ticketPool = ticketPool;  // Ticket pool instance
        this.customerRetrievalRate = customerRetrievalRate;  // Rate (in seconds) at which tickets are bought
        this.quantity = quantity;  // Number of tickets the customer wants to buy
    }

    // Start method where the customer continuously buys tickets from the pool
    async start() {
        for (let i = 0; i < this.quantity; i++) {
            if (this.ticketPool.stopped) break;  // Stop if the system is halted
            await this.ticketPool.buyTicket(this.customerId);  // Buy a ticket from the pool
            await this.sleep(this.customerRetrievalRate * 1000);  // Wait for the retrieval rate time
        }
    }

    // Utility method to sleep for a specified number of milliseconds
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// System configuration and dynamic routes for managing the ticketing system
let ticketPool = null;

// API endpoint to configure the ticketing system
app.post('/configureSystem', async (req, res) => {
    const { totalTickets, ticketReleaseRate, customerRetrievalRate, maximumCapacity } = req.body;

    // Validate the input parameters
    if (
        !totalTickets || 
        !ticketReleaseRate || 
        !customerRetrievalRate || 
        !maximumCapacity ||
        totalTickets <= 0 || 
        ticketReleaseRate <= 0 || 
        customerRetrievalRate <= 0 || 
        maximumCapacity <= 0
    ) {
        return res.status(400).send({ error: "All parameters must be positive numbers." });
    }

    // Initialize ticket pool and create vendors and customers
    ticketPool = new TicketPool(maximumCapacity, totalTickets);

    const vendors = [
        new Vendor(1, ticketPool, Math.ceil(totalTickets / 3), ticketReleaseRate),
        new Vendor(2, ticketPool, Math.ceil(totalTickets / 3), ticketReleaseRate),
        new Vendor(3, ticketPool, Math.ceil(totalTickets / 3), ticketReleaseRate),
    ];

    const customers = [
        new Customer(1, ticketPool, customerRetrievalRate, Math.ceil(totalTickets / 5)),
        new Customer(2, ticketPool, customerRetrievalRate, Math.ceil(totalTickets / 5)),
        new Customer(3, ticketPool, customerRetrievalRate, Math.ceil(totalTickets / 5)),
        new Customer(4, ticketPool, customerRetrievalRate, Math.ceil(totalTickets / 5)),
        new Customer(5, ticketPool, customerRetrievalRate, Math.ceil(totalTickets / 5)),
    ];

    logMessage("\nStarting system...\n");

    // Start all vendors and customers
    vendors.forEach(vendor => vendor.start());
    customers.forEach(customer => customer.start());

    res.send({ message: "System configured successfully", metrics: ticketPool.getMetrics(), logs });
});

// API endpoint to stop the system manually
app.post('/stopSystem', (req, res) => {
    if (ticketPool) {
        ticketPool.stopped = true;  // Set the system to stopped
        logMessage("System has been stopped by the user.");
        return res.send({ message: "System stopped successfully." });
    }
    res.status(400).send({ error: "System is not running." });
});

// API endpoint to get system metrics (e.g., pool size, tickets sold)
app.get('/metrics', (req, res) => {
    if (!ticketPool) {
        return res.status(503).send({ error: "System not ready" });
    }
    res.send({ ...ticketPool.getMetrics(), logs });
});

// Start the Express server on port 8080
app.listen(8080, () => {
    console.log(`Server is running on http://localhost:8080`);
});