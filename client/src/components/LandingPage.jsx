import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen px-6 sm:px-12 bg-gray-100">
            <div className="text-center">
                <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
                    Welcome to the Ticket Simulator
                </h1>
                <p className="mt-8 text-lg font-medium text-gray-600 sm:text-xl">
                    Without you, there are no tickets, no customers, no events.<br />
                    Don't let that happen. Let's start the simulation together.
                </p>
                <div className="mt-10">
                    <Link
                        to="/home"
                        className="rounded-md bg-indigo-600 px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 hover:scale-105 transform transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default LandingPage;
