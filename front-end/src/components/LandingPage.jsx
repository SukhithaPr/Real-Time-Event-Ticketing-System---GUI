import { Link } from 'react-router-dom';

import React from 'react';

const LandingPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-40 sm:px-80 bg-gray">
            <div className="text-center">
                <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                    Welcome to the Ticket Simulator
                </h1>
                <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                    Without you, there are no tickets, no customers, no events.<br /> Don't let that happen. Let's start the simulation together.</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link to='/home' className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Get started
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;
