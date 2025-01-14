import React, { useState, useEffect } from "react"; // Import React and necessary hooks
import { Line } from "react-chartjs-2"; // Import the Line chart component from chart.js
import { Chart, registerables } from "chart.js"; // Import Chart.js and its components

Chart.register(...registerables); // Register all necessary chart components

export default function EventPage() {
    // State hooks for form inputs and system metrics
    const [totalTickets, setTotalTickets] = useState(""); 
    const [ticketReleaseRate, setTicketReleaseRate] = useState("");
    const [customerRetrievalRate, setCustomerRetrievalRate] = useState("");
    const [maxCapacity, setMaxCapacity] = useState("");
    const [status, setStatus] = useState(""); // Holds the status message (success/error)
    const [metrics, setMetrics] = useState(null); // Holds system metrics (e.g., tickets sold)
    const [logs, setLogs] = useState([]); // Holds the system logs
    const [systemStopped, setSystemStopped] = useState(false); // Flag to check if system is stopped

    // State hook for chart data
    const [chartData, setChartData] = useState({
        labels: [], // Labels for the chart (e.g., timestamps)
        datasets: [
            {
                label: "Tickets in Pool", // Label for the first dataset
                data: [], // Data for tickets in the pool
                borderColor: "rgba(75, 192, 192, 1)", // Color for the line
                backgroundColor: "rgba(75, 192, 192, 0.2)", // Background color for the area under the line
                fill: true, // Enable filling the area under the line
            },
            {
                label: "Tickets Sold", // Label for the second dataset
                data: [], // Data for tickets sold
                borderColor: "rgba(255, 99, 132, 1)", // Color for the line
                backgroundColor: "rgba(255, 99, 132, 0.2)", // Background color for the area under the line
                fill: true, // Enable filling the area under the line
            },
        ],
    });

    // Handle form submission for configuring the system
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Check if all form fields are filled
        if (!totalTickets || !ticketReleaseRate || !customerRetrievalRate || !maxCapacity) {
            setStatus("All fields must be filled out.");
            return;
        }

        // Prepare form data to send to the backend
        const formData = {
            totalTickets: parseInt(totalTickets),
            ticketReleaseRate: parseInt(ticketReleaseRate),
            customerRetrievalRate: parseInt(customerRetrievalRate),
            maximumCapacity: parseInt(maxCapacity),
        };

        // Send the form data to the backend to configure the system
        try {
            const response = await fetch("http://localhost:8080/configureSystem", {
                method: "POST", // POST request to the backend
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json(); // Parse the JSON response
                setMetrics(data.metrics || {}); // Set the metrics from the response
                setLogs(data.logs || []); // Set the logs from the response
                setStatus("System configured successfully!"); // Set success status
            } else {
                setStatus("Error configuring system.");
                console.error("Backend error:", await response.text());
            }
        } catch (error) {
            console.error("Failed to connect to backend:", error);
            setStatus("Failed to connect to backend."); // Set error status if request fails
        }
    };

    // Handle system stop button click
    const handleStop = async () => {
        try {
            const response = await fetch("http://localhost:8080/stopSystem", {
                method: "POST", // POST request to stop the system
            });

            if (response.ok) {
                setSystemStopped(true); // Set systemStopped state to true
                setStatus("System stopped successfully."); // Set success status
            } else {
                setStatus("Error stopping the system.");
                console.error("Backend error:", await response.text());
            }
        } catch (error) {
            console.error("Failed to connect to backend:", error);
            setStatus("Failed to connect to backend."); // Set error status if request fails
        }
    };

    // Fetch metrics from the backend every second when the system is not stopped
    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const response = await fetch("http://localhost:8080/metrics");
                if (response.ok) {
                    const data = await response.json(); // Parse the JSON response
                    setMetrics(data || {}); // Set metrics data
                    // Update chart data with new metrics
                    setChartData((prevData) => {
                        const updatedLabels = [...prevData.labels, new Date().toLocaleTimeString()];
                        const poolData = [...prevData.datasets[0].data, data.poolSize];
                        const soldData = [...prevData.datasets[1].data, data.ticketsSold];
                        return {
                            labels: updatedLabels,
                            datasets: [
                                { ...prevData.datasets[0], data: poolData },
                                { ...prevData.datasets[1], data: soldData },
                            ],
                        };
                    });

                    // Update logs with new logs from backend
                    if (Array.isArray(data.logs)) {
                        setLogs((prevLogs) => [...prevLogs, ...data.logs.slice(prevLogs.length)]);
                    }

                    if (data.stopped) {
                        setSystemStopped(true); // If system stopped, update state
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
                fetchMetrics(); // Fetch metrics every second if system is running
            } else {
                clearInterval(interval); // Clear the interval if system is stopped
            }
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval when component unmounts
    }, [systemStopped]); // Dependency array: re-run effect when systemStopped changes

    return (
        <div className="p-10 bg-gradient-to-br from-indigo-50 to-indigo-100 min-h-screen">
            {/* Form for system configuration */}
            <div className="space-y-1 p-8 bg-white rounded-lg shadow-xl w-full max-w-md mx-auto">
                <h1 className="text-2xl pb-5 font-semibold text-center text-black">
                    Configure Ticketing System
                </h1>
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Form inputs for total tickets, release rate, retrieval rate, and max capacity */}
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
                    {/* Submit and stop buttons */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Start System
                    </button>
                    <button
                        type="button"
                        onClick={handleStop}
                        className="w-full mt-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Stop System
                    </button>
                    {status && <p className="text-center text-red-500 mt-2">{status}</p>}
                </form>
            </div>

            {/* Display system metrics */}
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

            {/* Display real-time analytics chart */}
            <div className="mt-8">
                <h2 className="text-lg font-semibold">Real-Time Analytics</h2>
                <div style={{ height: "400px" }}>
                    <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
            </div>

            {/* Display logs */}
            <div className="mt-8 w-full max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-xl">
                <h2 className="text-lg font-semibold">Logs</h2>
                <div className="bg-gray-100 p-4 rounded-lg overflow-y-auto" style={{ maxHeight: "200px" }}>
                    {logs.length > 0 ? (
                        logs.map((log, index) => (
                            <p key={index} className="text-sm text-black">
                                {log}
                            </p>
                        ))
                    ) : (
                        <p>No logs available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}