# Ticketing System README

## Overview

This project is a ticketing system built with Node.js and React. It allows vendors to add tickets to a pool and customers to purchase them in real-time. The system provides metrics on ticket availability and sales, along with logs for monitoring purposes.

## Technologies Used

- **Backend**: Node.js, Express
- **Frontend**: React
- **Middleware**: CORS, Body-parser
- **Database**: In-memory storage for simplicity (logs and ticket data)

## Features

- **Vendor Management**: Vendors can add tickets to the pool at a specified release rate.
- **Customer Management**: Customers can purchase tickets from the pool at a specified retrieval rate.
- **Real-Time Metrics**: Displays available tickets, tickets sold, and system status.
- **Logging**: Captures logs of ticket transactions and system events.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v12 or higher)
- npm (Node package manager)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies for the backend:
   ```bash
   cd backend
   npm install
   ```

3. Install dependencies for the frontend:
   ```bash
   cd frontend
   npm install
   ```

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   node server.js
   ```

2. Start the frontend application:
   ```bash
   cd frontend
   npm start
   ```

3. Access the application at `http://localhost:5173`.

## API Endpoints

### POST /configureSystem

Configures the ticketing system with the following parameters:

- `totalTickets`: Total number of tickets available for sale.
- `ticketReleaseRate`: Rate at which vendors add tickets (in seconds).
- `customerRetrievalRate`: Rate at which customers purchase tickets (in seconds).
- `maximumCapacity`: Maximum number of tickets that can be held in the pool.

### GET /metrics

Retrieves current metrics of the ticketing system, including:

- `poolSize`: Current number of available tickets.
- `ticketsSold`: Total number of tickets sold.
- `stopped`: Indicates if the system has stopped selling tickets.

## Code Structure

### Backend (`server.js`)

Contains the main server logic, including:

- Ticket management classes (`Ticket`, `TicketPool`, `Vendor`, `Customer`).
- API routes for configuring the system and retrieving metrics.

### Frontend (`Main.jsx, App.jsx, LandingPage,jsx, HomePage.jsx, EventPage.jsx`)

Handles user input for configuring the ticketing system and displays real-time metrics and logs.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.