import React from 'react';
import { Truck, Globe, Clock, Shield, MapPin, Package } from 'lucide-react';

const ShippingInfoPage = () => {
    const methods = [
        { title: 'Standard Shipping', time: '3-7 Business Days', cost: 'Free over $50', icon: <Truck className="text-blue-500" /> },
        { title: 'Express Delivery', time: '1-3 Business Days', cost: '$14.99', icon: <Package className="text-purple-500" /> },
        { title: 'International', time: '7-21 Business Days', cost: 'Calculated at checkout', icon: <Globe className="text-indigo-500" /> },
    ];

    return (
        <div className="bg-white min-h-screen">
            <div className="bg-blue-600 py-20 text-white relative overflow-hidden">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Shipping Information</h1>
                    <p className="text-blue-100 max-w-2xl mx-auto text-lg leading-relaxed">
                        We deliver to over 50 countries worldwide with real-time tracking
                        and guaranteed safety for your products.
                    </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-indigo-800 opacity-50"></div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        {methods.map((m, i) => (
                            <div key={i} className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all group">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                    {m.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{m.title}</h3>
                                <div className="space-y-2">
                                    <p className="text-blue-600 font-bold flex items-center gap-2">
                                        <Clock size={16} />
                                        {m.time}
                                    </p>
                                    <p className="text-gray-500 text-sm font-medium">{m.cost}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <div className="flex gap-6">
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                                    <Shield size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-2">Secure Packaging</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        Every item is carefully inspected and packed with eco-friendly,
                                        durable materials to ensure it reaches you in perfect condition.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-6">
                                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 mb-2">Real-Time Tracking</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        Follow your package from the warehouse to your doorstep with
                                        live updates and SMS notifications.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-900 p-10 rounded-[3rem] text-white">
                            <h3 className="text-2xl font-bold mb-6">Tracking Your Order</h3>
                            <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                                Once your order is shipped, you will receive an email with a tracking number.
                                You can enter this number on our tracking page or click the link in your email.
                            </p>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Enter tracking number (e.g. #ORD-123)"
                                    className="w-full bg-gray-800 border-none rounded-2xl px-6 py-4 text-white text-sm focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                                <button className="absolute right-2 top-2  bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition-all text-xs">
                                    Track
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingInfoPage;
