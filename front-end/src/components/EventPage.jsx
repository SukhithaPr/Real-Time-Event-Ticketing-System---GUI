import React, { useState } from 'react';

export default function EventPage() {
    const [formData, setFormData] = useState({
        totalTickets: '',
        releaseRate: '',
        retrievalRate: '',
        maxCapacity: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Form Data: ${JSON.stringify(formData)}`); // Simulating form submission
    };

    const handleStart = () => {
        alert('Start Process');
    };

    const handleStop = () => {
        alert('Stop Process');
    };

    return (
        <div className="flex items-center justify-center gap-10 min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 p-10">
            <div>
                <img
                    src="https://scontent.fcmb2-2.fna.fbcdn.net/v/t39.30808-6/466505399_867358052217212_4911383765135743027_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFGtuiyZtN57ePPxx1q4_4E4NPIjCBcw_3g08iMIFzD_ah0udyW7qdzUdBKCUOdpojQgdYlYG3g4E9D48Rq5FiO&_nc_ohc=XESBZJ9oPcMQ7kNvgEbGmNf&_nc_zt=23&_nc_ht=scontent.fcmb2-2.fna&_nc_gid=Ag54qd8CEzDwFG97bP2ZbnV&oh=00_AYB_OE-lJJ5gclA_YBfBy8845HE8dDlfGNPR6STryQzWkw&oe=6758C9A0"
                    alt="Event"
                    className="rounded-lg shadow-lg w-full max-w-md"
                />
            </div>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg p-8 bg-white rounded-lg shadow-xl space-y-8"
            >
                <h1 className="text-xl font-bold text-gray-700 text-center">
                    Event Ticket Simulation
                </h1>
                {[
                    {
                        label: 'Total Tickets',
                        name: 'totalTickets',
                        value: formData.totalTickets,
                    },
                    {
                        label: 'Ticket Release Rate (tickets/sec)',
                        name: 'releaseRate',
                        value: formData.releaseRate,
                    },
                    {
                        label: 'Customer Retrieval Rate (customers/sec)',
                        name: 'retrievalRate',
                        value: formData.retrievalRate,
                    },
                    {
                        label: 'Max Ticket Capacity',
                        name: 'maxCapacity',
                        value: formData.maxCapacity,
                    },
                ].map((field, index) => (
                    <div key={index}>
                        <label
                            htmlFor={field.name}
                            className="block text-sm font-medium text-gray-700"
                        >
                            {field.label}
                        </label>
                        <input
                            id={field.name}
                            name={field.name}
                            type="text"
                            value={field.value}
                            onChange={handleChange}
                            className="mt-2 block w-full rounded-lg border-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-gray-700 p-1 text-lg"
                        />
                    </div>
                ))}
                <div className="flex items-center justify-between gap-4">
                    <button
                        type="button"
                        onClick={handleStart}
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        Start
                    </button>
                    <button
                        type="button"
                        onClick={handleStop}
                        className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Stop
                    </button>
                </div>
            </form>
        </div>
    );
}
