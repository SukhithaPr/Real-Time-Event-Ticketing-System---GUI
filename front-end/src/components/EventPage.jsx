import React, { useState } from 'react';

export default function EventPage() {
    return (
        <div className="flex items-center justify-center gap-10 min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-100 p-10">
            <div className='shadow-xl space-y-8'>
                <img
                    src="https://scontent.fcmb2-2.fna.fbcdn.net/v/t39.30808-6/466505399_867358052217212_4911383765135743027_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFGtuiyZtN57ePPxx1q4_4E4NPIjCBcw_3g08iMIFzD_ah0udyW7qdzUdBKCUOdpojQgdYlYG3g4E9D48Rq5FiO&_nc_ohc=XESBZJ9oPcMQ7kNvgEbGmNf&_nc_zt=23&_nc_ht=scontent.fcmb2-2.fna&_nc_gid=Ag54qd8CEzDwFG97bP2ZbnV&oh=00_AYB_OE-lJJ5gclA_YBfBy8845HE8dDlfGNPR6STryQzWkw&oe=6758C9A0"
                    alt="Event"
                    className="rounded-lg shadow-lg "
                />
            </div>
            <div className='flex flex-col gap-5'>
                
                <div className="w-full p-5 bg-white rounded-lg shadow-xl">
                <label for="username" className="block text-sm/6 font-medium text-gray-900">Customers Available : x</label>
                <label for="username" className="block text-sm/6 font-medium text-gray-900">Vendors Available : y</label>
                </div>

                <form className="w-full max-w-lg p-8 bg-white rounded-lg shadow-xl space-y-5">

                <label for="username" className="block text-sm/6 font-medium text-gray-900">Enter total number of tickets :</label>

                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6"></div>
                    <input
                        type="number"
                        name="username"
                        id="username"
                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                </div>

                <label for="username" className="block text-sm/6 font-medium text-gray-900">Enter ticket release rate (tickets per second) :</label>

                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6"></div>
                    <input
                        type="number"
                        name="username"
                        id="username"
                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                </div>

                <label for="username" className="block text-sm/6 font-medium text-gray-900">Enter customer retrieval rate (customers per second) :</label>

                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6"></div>
                    <input
                        type="number"
                        name="username"
                        id="username"
                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                </div>

                <label for="username" className="block text-sm/6 font-medium text-gray-900">Enter maximum ticket capacity :</label>

                <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6"></div>
                    <input
                        type="number"
                        name="username"
                        id="username"
                        className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                </div>

                <div className="flex items-center justify-between gap-4">
                    <button
                        type="button"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Start
                    </button>
                    <button
                        type="button"
                        className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Stop
                    </button>
                </div>
                <button
                        type="button"
                        className="w-full py-2 px-4 bg-lime-600 text-white font-semibold rounded-lg shadow-md hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500"
                    >
                        Restart
                    </button>
            </form>
            </div>
        </div>
    );
}
