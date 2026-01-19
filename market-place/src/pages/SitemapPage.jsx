import React from 'react';
import { Map, ShoppingBag, User, HelpCircle, FileText, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const SitemapPage = () => {
    const links = [
        {
            title: 'Shop',
            icon: <ShoppingBag size={20} />,
            items: [
                { name: 'All Products', path: '/products' },
                { name: 'Categories', path: '/categories' },
                { name: 'Deals', path: '/' },
                { name: 'Brands', path: '/' },
            ]
        },
        {
            title: 'Company',
            icon: <Globe size={20} />,
            items: [
                { name: 'About Us', path: '/about' },
                { name: 'Contact', path: '/contact' },
                { name: 'FAQ', path: '/faq' },
                { name: 'Help Center', path: '/help' },
            ]
        },
        {
            title: 'Support & Legal',
            icon: <FileText size={20} />,
            items: [
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Terms of Service', path: '/terms' },
                { name: 'Shipping Info', path: '/shipping-info' },
                { name: 'Returns & Refunds', path: '/returns' },
            ]
        },
        {
            title: 'Account',
            icon: <User size={20} />,
            items: [
                { name: 'My Profile', path: '/profile' },
                { name: 'My Orders', path: '/orders' },
                { name: 'Wishlist', path: '/wishlist' },
                { name: 'Seller Dashboard', path: '/seller' },
            ]
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            <div className="bg-gray-50 border-b py-20">
                <div className="container mx-auto px-4 text-center">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Map size={32} />
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Sitemap</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        A birds-eye view of all the pages and sections available on MarketPlace.
                        Find exactly what you are looking for.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
                    {links.map((section, i) => (
                        <div key={i}>
                            <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center">
                                    {section.icon}
                                </div>
                                {section.title}
                            </h3>
                            <ul className="space-y-4">
                                {section.items.map((item, j) => (
                                    <li key={j}>
                                        <Link
                                            to={item.path}
                                            className="text-gray-500 hover:text-blue-600 font-bold transition-all flex items-center group"
                                        >
                                            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-3 group-hover:bg-blue-600 transition-colors"></div>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SitemapPage;
