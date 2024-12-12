const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const corsOptions = {
    origin: "http://localhost:5173",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Global ticket ID counter
let globalTicketId = 1;

// Store logs
let logs = [];

// Custom log function to capture logs
function logMessage(message) {
    logs.push(message);
    console.log(message);  // Optional: Keep printing to the server console
}

// Ticket class
class Ticket {
    constructor(ticketId, eventName, ticketPrice) {
        this.ticketId = ticketId;
        this.eventName = eventName;
        this.ticketPrice = ticketPrice;
    }

    toString() {
        return `Ticket ID: ${this.ticketId} | Event: ${this.eventName} | Price: Rs.${this.ticketPrice}`;
    }
}

// TicketPool class
class TicketPool {
    constructor(maximumCapacity, totalTickets) {
        this.ticketList = [];
        this.maximumCapacity = maximumCapacity;
        this.ticketsSold = 0;
        this.totalTickets = totalTickets;
        this.stopped = false;
    }

    async addTicket(ticket, vendorId) {
        while (!this.stopped) {
            if (this.ticketList.length < this.maximumCapacity) {
                this.ticketList.push(ticket);
                logMessage(`Vendor-${vendorId} added a ticket. Pool size: ${this.ticketList.length}`);
                return;
            } else {
                logMessage(`Vendor-${vendorId} waiting to add tickets. Pool is full.`);
                await this.sleep(1000);
            }
        }
    }

    async buyTicket(customerId) {
        while (!this.stopped) {
            if (this.ticketList.length > 0) {
                const ticket = this.ticketList.shift();
                this.ticketsSold++;
                logMessage(`Customer-${customerId} bought a ticket: ( ${ticket.toString()} )`);
                this.checkSystemStop();
                return ticket;
            } else {
                logMessage(`Customer-${customerId} waiting to buy tickets. Pool is empty.`);
                await this.sleep(1000);
            }
        }
    }

    checkSystemStop() {
        if (this.ticketsSold >= this.totalTickets) {
            this.stopped = true;
            logMessage("\nSystem has stopped: All tickets are sold.\n");
        }
    }

    getMetrics() {
        return {
            poolSize: this.ticketList.length,
            ticketsSold: this.ticketsSold,
            stopped: this.stopped,
        };
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Vendor and Customer classes
class Vendor {
    constructor(vendorId, ticketPool, totalTickets, ticketReleaseRate) {
        this.vendorId = vendorId;
        this.ticketPool = ticketPool;
        this.totalTickets = totalTickets;
        this.ticketReleaseRate = ticketReleaseRate;
    }

    async start() {
        for (let i = 0; i < this.totalTickets; i++) {
            if (this.ticketPool.stopped) break;
            const ticket = new Ticket(globalTicketId++, "Spandana", 2000);
            await this.ticketPool.addTicket(ticket, this.vendorId);
            await this.sleep(this.ticketReleaseRate * 1000);
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

class Customer {
    constructor(customerId, ticketPool, customerRetrievalRate, quantity) {
        this.customerId = customerId;
        this.ticketPool = ticketPool;
        this.customerRetrievalRate = customerRetrievalRate;
        this.quantity = quantity;
    }

    async start() {
        for (let i = 0; i < this.quantity; i++) {
            if (this.ticketPool.stopped) break;
            await this.ticketPool.buyTicket(this.customerId);
            await this.sleep(this.customerRetrievalRate * 1000);
        }
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// System configuration and dynamic routes
let ticketPool = null;

app.post('/configureSystem', async (req, res) => {
    const { totalTickets, ticketReleaseRate, customerRetrievalRate, maximumCapacity } = req.body;
    if (!totalTickets || !ticketReleaseRate || !customerRetrievalRate || !maximumCapacity) {
        return res.status(400).send({ error: "Invalid configuration parameters" });
    }

    ticketPool = new TicketPool(maximumCapacity, totalTickets);

    const vendors = [
        new Vendor(1, ticketPool, Math.ceil(totalTickets / 3), ticketReleaseRate),
        new Vendor(2, ticketPool, Math.ceil(totalTickets / 3), ticketReleaseRate),
        new Vendor(3, ticketPool, Math.ceil(totalTickets / 3), ticketReleaseRate),
    ];

    const customers = [
        new Customer(1, ticketPool, customerRetrievalRate, totalTickets / 5),
        new Customer(2, ticketPool, customerRetrievalRate, totalTickets / 5),
        new Customer(3, ticketPool, customerRetrievalRate, totalTickets / 5),
        new Customer(4, ticketPool, customerRetrievalRate, totalTickets / 5),
        new Customer(5, ticketPool, customerRetrievalRate, totalTickets / 5),
    ];

    logMessage("\nStarting system...\n");

    vendors.forEach(vendor => vendor.start());
    customers.forEach(customer => customer.start());

    res.send({ message: "System configured successfully", metrics: ticketPool.getMetrics(), logs }); 
});

app.get('/metrics', (req, res) => {
    if (!ticketPool) {
        return res.status(503).send({ error: "System not ready" });
    }
    res.send({ ...ticketPool.getMetrics(), logs });
});

app.listen(8080, () => {
    console.log(`Server is running on http://localhost:8080`);
});