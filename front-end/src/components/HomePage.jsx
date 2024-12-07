import { Link } from 'react-router-dom';


const products = [
    {
        id: 1,
        name: 'Spandana',
        href: '/EventPage',
        imageSrc: 'https://scontent.fcmb2-2.fna.fbcdn.net/v/t39.30808-6/466505399_867358052217212_4911383765135743027_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFGtuiyZtN57ePPxx1q4_4E4NPIjCBcw_3g08iMIFzD_ah0udyW7qdzUdBKCUOdpojQgdYlYG3g4E9D48Rq5FiO&_nc_ohc=XESBZJ9oPcMQ7kNvgEbGmNf&_nc_zt=23&_nc_ht=scontent.fcmb2-2.fna&_nc_gid=Ag54qd8CEzDwFG97bP2ZbnV&oh=00_AYB_OE-lJJ5gclA_YBfBy8845HE8dDlfGNPR6STryQzWkw&oe=6758C9A0',
        imageAlt: "Front of men's Basic Tee in black.",
    },

    {
        id: 2,
        name: 'Awarjana',
        href: '#',
        imageSrc: 'https://assets.mytickets.lk/images/events/Awarjana/Awarjana%201x1xx-1730088977503.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
    },

    {
        id: 3,
        name: 'Parampara',
        href: '#',
        imageSrc: 'https://assets.mytickets.lk/images/events/Parampara%20Live%20In%20Concert/1080%20x%201080%20DESIGN%201-1730370079854.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
    },

    {
        id: 4,
        name: 'SHAAN & SANKA LIVE IN SRI LANKA',
        href: '#',
        imageSrc: 'https://assets.mytickets.lk/images/events/SHAAN%20&%20SANKA%20LIVE%20IN%20SRI%20LANKA/without%20all%20details%201080x1080%20(2)-1730545551510.jpg',
        imageAlt: "Front of men's Basic Tee in black.",
    }
]

export default function HomePage() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 text-center">Select an Event</h1>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="group relative">
                            <img
                                alt={product.imageAlt}
                                src={product.imageSrc}
                                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                            />
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <a href={product.href}>
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            {product.name}
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
