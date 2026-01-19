import React from 'react';
import { RefreshCcw, ShieldCheck, HelpCircle, Package, ArrowRight, CheckCircle2 } from 'lucide-react';

const ReturnsPage = () => {
    const steps = [
        { title: 'Initiate Return', desc: 'Go to your Orders and click on Return Item', icon: <RefreshCcw size={20} /> },
        { title: 'Pack Item', desc: 'Secure the item in its original packaging', icon: <Package size={20} /> },
        { title: 'Ship Back', desc: 'Print the prepaid label and drop it off', icon: <ArrowRight size={20} /> },
        { title: 'Get Refund', desc: 'Refund processed within 3-5 business days', icon: <ShieldCheck size={20} /> },
    ];

    return (
        <div className="bg-white min-h-screen">
            <div className="bg-gradient-to-br from-indigo-900 to-purple-900 py-20 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Returns & Refunds</h1>
                    <p className="text-indigo-100 max-w-2xl mx-auto text-lg leading-relaxed">
                        Not satisfied with your purchase? No problem. Our hassle-free
                        return policy ensures you can shop with absolute peace of mind.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="max-w-5xl mx-auto">
                    {/* Main Policy Card */}
                    <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 mb-20">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            <div className="p-12 bg-indigo-50">
                                <h2 className="text-3xl font-bold text-indigo-900 mb-6 underline decoration-indigo-200 underline-offset-8">Our 30-Day Policy</h2>
                                <div className="space-y-6">
                                    {[
                                        'Full refund guaranteed within 30 days',
                                        'Items must be in original condition',
                                        'Tags and labels must be attached',
                                        'Original packaging is required',
                                        'Prepaid return labels provided'
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <CheckCircle2 className="text-indigo-600 shrink-0" size={20} />
                                            <span className="text-indigo-800 font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="p-12 flex flex-col justify-center">
                                <HelpCircle className="text-indigo-600 mb-4" size={48} />
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Questions about returns?</h3>
                                <p className="text-gray-500 mb-8 leading-relaxed text-sm">
                                    Our support team is available 24/7 to help you with the return process.
                                    Most returns are automatically approved within minutes.
                                </p>
                                <button className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg">
                                    Chat with Support
                                </button>
                            </div>
                        </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-12 text-center underline decoration-indigo-500 underline-offset-8">How it Works</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
                        {steps.map((step, i) => (
                            <div key={i} className="text-center group">
                                <div className="w-16 h-16 bg-white border-2 border-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-sm">
                                    {step.icon}
                                </div>
                                <div className="text-xs font-black text-indigo-400 uppercase tracking-widest mb-2">Step {i + 1}</div>
                                <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
                                <p className="text-gray-500 text-xs leading-relaxed px-4">{step.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-amber-50 rounded-3xl p-8 border border-amber-100 flex items-start gap-6">
                        <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                            <Package size={24} />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-amber-900 mb-2">Non-Returnable Items</h4>
                            <p className="text-amber-800 text-sm leading-relaxed">
                                Personalized items, hygiene-sensitive products (like earrings or undergarments),
                                and digital downloads cannot be returned once purchased.
                                Please check the product description for specific return eligibility.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReturnsPage;
