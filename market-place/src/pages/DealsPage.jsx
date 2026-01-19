// src/pages/DealsPage.jsx
import React, { useState, useEffect } from 'react';
import { Clock, Flame, TrendingUp, Package, Star, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProductGrid from '../components/products/ProductGrid';
import LoadingSpinner from '../components/common/LoadingSpinner';

const DealsPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [deals, setDeals] = useState([]);
    const [timeLeft, setTimeLeft] = useState({
        hours: 12,
        minutes: 45,
        seconds: 30
    });

    useEffect(() => {
        // Fetch today's deals
        const fetchDeals = async () => {
            setLoading(true);
            try {
                // Mock deals data with discounts
                const mockDeals = [
                    {
                        id: 1,
                        name: 'Premium Wireless Headphones',
                        price: 199.99,
                        originalPrice: 299.99,
                        discount: 33,
                        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
                        category: 'Electronics',
                        stock: 15,
                        rating: 4.8,
                        dealType: 'flash'
                    },
                    {
                        id: 2,
                        name: 'Smart Watch Series X',
                        price: 199.50,
                        originalPrice: 299.50,
                        discount: 33,
                        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
                        category: 'Electronics',
                        stock: 8,
                        rating: 4.5,
                        dealType: 'hot'
                    },
                    {
                        id: 3,
                        name: 'Organic Cotton T-Shirt',
                        price: 19.99,
                        originalPrice: 29.99,
                        discount: 33,
                        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800',
                        category: 'Fashion',
                        stock: 50,
                        rating: 4.2,
                        dealType: 'daily'
                    },
                    {
                        id: 4,
                        name: 'Leather Messenger Bag',
                        price: 59.00,
                        originalPrice: 89.00,
                        discount: 34,
                        image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800',
                        category: 'Accessories',
                        stock: 12,
                        rating: 4.7,
                        dealType: 'daily'
                    },
                    {
                        id: 5,
                        name: 'Professional Camera Tripod',
                        price: 35.40,
                        originalPrice: 55.40,
                        discount: 36,
                        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
                        category: 'Electronics',
                        stock: 20,
                        rating: 4.4,
                        dealType: 'flash'
                    },
                    {
                        id: 6,
                        name: 'Minimalist Wall Clock',
                        price: 29.00,
                        originalPrice: 45.00,
                        discount: 36,
                        image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800',
                        category: 'Home',
                        stock: 5,
                        rating: 4.9,
                        dealType: 'hot'
                    },
                    {
                        id: 7,
                        name: 'Ergonomic Office Chair',
                        price: 174.99,
                        originalPrice: 249.99,
                        discount: 30,
                        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
                        category: 'Furniture',
                        stock: 10,
                        rating: 4.6,
                        dealType: 'daily'
                    },
                    {
                        id: 8,
                        name: 'Gourmet Coffee Beans',
                        price: 12.50,
                        originalPrice: 18.50,
                        discount: 32,
                        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800',
                        category: 'Food',
                        stock: 100,
                        rating: 4.8,
                        dealType: 'flash'
                    },
                ];

                await new Promise(resolve => setTimeout(resolve, 800));
                setDeals(mockDeals);
            } catch (error) {
                console.error('Error fetching deals:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDeals();
    }, []);

    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { hours, minutes, seconds } = prev;

                if (seconds > 0) {
                    seconds--;
                } else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                } else if (hours > 0) {
                    hours--;
                    minutes = 59;
                    seconds = 59;
                }

                return { hours, minutes, seconds };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const getDealBadge = (dealType) => {
        switch (dealType) {
            case 'flash':
                return { icon: <Flame size={16} />, text: 'Flash Deal', color: 'bg-red-500' };
            case 'hot':
                return { icon: <TrendingUp size={16} />, text: 'Hot Deal', color: 'bg-orange-500' };
            default:
                return { icon: <Package size={16} />, text: 'Daily Deal', color: 'bg-blue-500' };
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            <div className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 md:p-12 mb-8 text-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <Flame size={40} className="animate-bounce" />
                            <h1 className="text-4xl md:text-5xl font-bold">Today's Exclusive Deals</h1>
                        </div>
                        <p className="text-xl md:text-2xl mb-6 text-blue-100">
                            Save up to 40% on selected products - Limited time only!
                        </p>

                        {/* Countdown Timer */}
                        <div className="flex items-center gap-6 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl p-6 w-fit">
                            <div className="flex items-center gap-2">
                                <Clock size={28} />
                                <span className="text-lg font-semibold">Deals end in:</span>
                            </div>
                            <div className="flex gap-4">
                                <div className="text-center">
                                    <div className="bg-white text-blue-600 rounded-xl px-4 py-3 font-bold text-3xl min-w-[80px]">
                                        {String(timeLeft.hours).padStart(2, '0')}
                                    </div>
                                    <p className="text-sm mt-2 text-blue-100">Hours</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-white text-purple-600 rounded-xl px-4 py-3 font-bold text-3xl min-w-[80px]">
                                        {String(timeLeft.minutes).padStart(2, '0')}
                                    </div>
                                    <p className="text-sm mt-2 text-blue-100">Minutes</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-white text-pink-600 rounded-xl px-4 py-3 font-bold text-3xl min-w-[80px]">
                                        {String(timeLeft.seconds).padStart(2, '0')}
                                    </div>
                                    <p className="text-sm mt-2 text-blue-100">Seconds</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition-shadow">
                        <div className="bg-blue-100 text-blue-600 p-4 rounded-xl">
                            <Package size={32} />
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-gray-800">{deals.length}</h3>
                            <p className="text-gray-600">Active Deals</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition-shadow">
                        <div className="bg-green-100 text-green-600 p-4 rounded-xl">
                            <TrendingUp size={32} />
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-gray-800">40%</h3>
                            <p className="text-gray-600">Max Discount</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center gap-4 hover:shadow-xl transition-shadow">
                        <div className="bg-purple-100 text-purple-600 p-4 rounded-xl">
                            <Star size={32} />
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-gray-800">4.6+</h3>
                            <p className="text-gray-600">Avg Rating</p>
                        </div>
                    </div>
                </div>

                {/* Deal Categories Filter */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Filter by Deal Type</h2>
                    <div className="flex flex-wrap gap-3">
                        {['All Deals', 'Flash Deals', 'Hot Deals', 'Daily Deals'].map(category => (
                            <button
                                key={category}
                                className="px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-xl"
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Deals Grid */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                        🔥 Hot Deals for You
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {deals.map(deal => {
                            const badge = getDealBadge(deal.dealType);
                            return (
                                <div
                                    key={deal.id}
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group"
                                    onClick={() => navigate(`/product/${deal.id}`)}
                                >
                                    {/* Deal Badge */}
                                    <div className="relative">
                                        <img
                                            src={deal.image}
                                            alt={deal.name}
                                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className={`absolute top-3 left-3 ${badge.color} text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold shadow-lg`}>
                                            {badge.icon}
                                            {badge.text}
                                        </div>
                                        <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                            -{deal.discount}%
                                        </div>
                                    </div>

                                    <div className="p-5">
                                        <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                            {deal.name}
                                        </h3>

                                        {/* Rating */}
                                        <div className="flex items-center gap-1 mb-3">
                                            <Star size={16} className="fill-yellow-400 text-yellow-400" />
                                            <span className="font-semibold text-gray-700">{deal.rating}</span>
                                            <span className="text-gray-500 text-sm ml-1">({Math.floor(Math.random() * 500 + 100)} reviews)</span>
                                        </div>

                                        {/* Price */}
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="text-2xl font-bold text-blue-600">${deal.price.toFixed(2)}</span>
                                            <span className="text-gray-400 line-through text-sm">${deal.originalPrice.toFixed(2)}</span>
                                        </div>

                                        {/* Stock Status */}
                                        <div className="mb-4">
                                            {deal.stock > 10 ? (
                                                <span className="text-green-600 text-sm font-semibold">✓ In Stock</span>
                                            ) : deal.stock > 0 ? (
                                                <span className="text-orange-600 text-sm font-semibold">⚠ Only {deal.stock} left!</span>
                                            ) : (
                                                <span className="text-red-600 text-sm font-semibold">✗ Out of Stock</span>
                                            )}
                                        </div>

                                        {/* Add to Cart Button */}
                                        <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg">
                                            <ShoppingCart size={20} />
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 md:p-12 text-white text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Don't Miss Out!</h2>
                    <p className="text-xl mb-6 text-purple-100">
                        New deals added every hour. Check back frequently for the best offers!
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                    >
                        Refresh Deals
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DealsPage;
