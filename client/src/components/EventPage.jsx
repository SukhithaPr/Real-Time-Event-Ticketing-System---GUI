import React, { useState, useEffect } from "react";

export default function EventPage() {
    const [totalTickets, setTotalTickets] = useState("");
    const [ticketReleaseRate, setTicketReleaseRate] = useState("");
    const [customerRetrievalRate, setCustomerRetrievalRate] = useState("");
    const [maxCapacity, setMaxCapacity] = useState("");
    const [status, setStatus] = useState("");
    const [metrics, setMetrics] = useState(null);
    const [logs, setLogs] = useState([]); // Store all logs
    const [systemStopped, setSystemStopped] = useState(false); // Track if the system stopped

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!totalTickets || !ticketReleaseRate || !customerRetrievalRate || !maxCapacity) {
            setStatus("All fields must be filled out.");
            return;
        }

        const formData = {
            totalTickets: parseInt(totalTickets),
            ticketReleaseRate: parseInt(ticketReleaseRate),
            customerRetrievalRate: parseInt(customerRetrievalRate),
            maximumCapacity: parseInt(maxCapacity),
        };

        try {
            const response = await fetch("http://localhost:8080/configureSystem", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                setMetrics(data.metrics || {});
                setLogs(data.logs || []); // Ensure logs is always an array
                setStatus("System configured successfully!");
            } else {
                setStatus("Error configuring system.");
                console.error("Backend error:", await response.text());
            }
        } catch (error) {
            console.error("Failed to connect to backend:", error);
            setStatus("Failed to connect to backend.");
        }
    };

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await fetch("http://localhost:8080/metrics");
                if (response.ok) {
                    const data = await response.json();

                    setMetrics(data || {}); // Handle empty metrics gracefully
                    if (Array.isArray(data.logs)) {
                        setLogs((prevLogs) => [...prevLogs, ...data.logs.slice(prevLogs.length)]); // Append new logs
                    }
                    if (data.stopped) {
                        setSystemStopped(true);
                    }
                } else {
                    console.error("Metrics fetch error:", await response.text());
                }
            } catch (error) {
                console.error("Error fetching metrics:", error);
            }
        };

        const interval = setInterval(() => {
            if (!systemStopped) {
                fetchLogs();
            } else {
                clearInterval(interval); // Stop polling when the system stops
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [systemStopped]);

    return (
        <div className="p-10 bg-gradient-to-br from-indigo-50 to-indigo-100 min-h-screen">
            {/* Form Section */}
            <div className="space-y-1 p-8 bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
                <h1 className="text-2xl pb-5 font-semibold text-center text-black">
                    Configure Ticketing System
                </h1>
                <form onSubmit={handleSubmit} className="space-y-8">
                    <input
                        type="number"
                        placeholder="Total Tickets"
                        value={totalTickets}
                        onChange={(e) => setTotalTickets(e.target.value)}
                        className="p-3 border border-black-500 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black-500 text-black"
                    />
                    <input
                        type="number"
                        placeholder="Ticket Release Rate (seconds)"
                        value={ticketReleaseRate}
                        onChange={(e) => setTicketReleaseRate(e.target.value)}
                        className="p-3 border border-black-500 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black-500 text-black"
                    />
                    <input
                        type="number"
                        placeholder="Customer Retrieval Rate (seconds)"
                        value={customerRetrievalRate}
                        onChange={(e) => setCustomerRetrievalRate(e.target.value)}
                        className="p-3 border border-black-500 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black-500 text-black"
                    />
                    <input
                        type="number"
                        placeholder="Maximum Capacity"
                        value={maxCapacity}
                        onChange={(e) => setMaxCapacity(e.target.value)}
                        className="p-3 border border-black-500 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black-500 text-black"
                    />
                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Start System
                    </button>
                    {status && <p className="text-center text-red-500 mt-2">{status}</p>}
                </form>
            </div>

            {/* Metrics Section */}
            <div className="mt-8 w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-xl">
                {metrics === null ? (
                    <p className="text-center text-gray-500">Loading metrics...</p>
                ) : (
                    <>
                        <p className="text-black">Available Tickets in the Pool: {metrics.poolSize}</p>
                        <p className="text-black">Tickets Sold: {metrics.ticketsSold}</p>
                        <p className="text-black">
                            System Stopped: {metrics.stopped ? "Yes" : "No"}
                        </p>
                    </>
                )}
            </div>

            {/* Logs Section */}
            <div className="mt-8 w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-xl">
                <h2 className="text-lg font-semibold text-black">Logs</h2>
                <div
                    className="bg-gray-100 p-4 rounded-lg overflow-auto"
                    style={{ maxHeight: "300px" }}
                >
                    {logs.map((log, index) => (
                        <p key={index} className="text-sm text-black">
                            {log}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
}
