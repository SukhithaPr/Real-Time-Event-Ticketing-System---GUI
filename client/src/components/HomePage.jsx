import React from "react";
import { Link } from "react-router-dom";

const products = [
    {
        id: 1,
        name: 'Spandana',
        href: '/EventPage',
        imageSrc: 'https://scontent.fcmb2-2.fna.fbcdn.net/v/t39.30808-6/466505399_867358052217212_4911383765135743027_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=v5GtT_F6LHwQ7kNvgFSYYq8&_nc_zt=23&_nc_ht=scontent.fcmb2-2.fna&_nc_gid=A9si5X7y6ltPhfIpKZ-b1zM&oh=00_AYBze2v5GCbTgMDVssS7ufNUU-az9lCMEF6Q9UBP0Hz-cg&oe=676009E0',
        imageAlt: "Spandana Event Poster",
        price: "$20",
    },
    {
        id: 2,
        name: 'Awarjana',
        href: '/EventPage',
        imageSrc: 'https://assets.mytickets.lk/images/events/Awarjana/Awarjana%201x1xx-1730088977503.jpg',
        imageAlt: "Awarjana Event Poster",
        price: "$15",
    },
    {
        id: 3,
        name: 'Parampara',
        href: '/EventPage',
        imageSrc: 'https://assets.mytickets.lk/images/events/Parampara%20Live%20In%20Concert/1080%20x%201080%20DESIGN%201-1730370079854.jpg',
        imageAlt: "Parampara Event Poster",
        price: "$30",
    },
    {
        id: 4,
        name: 'SHAAN & SANKA LIVE IN SRI LANKA',
        href: '/EventPage',
        imageSrc: 'https://assets.mytickets.lk/images/events/SHAAN%20&%20SANKA%20LIVE%20IN%20SRI%20LANKA/without%20all%20details%201080x1080%20(2)-1730545551510.jpg',
        imageAlt: "SHAAN & SANKA Event Poster",
        price: "$25",
    },
];

export default function HomePage() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-center">
                    Select an Event
                </h1>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="group relative">
                            <img
                                alt={product.imageAlt || `Poster for ${product.name}`}
                                src={product.imageSrc}
                                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                            />
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <Link to={product.href}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.name}
                                        </Link>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {product.color || "No color information available"}
                                    </p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">
                                    {product.price || "Price not specified"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
