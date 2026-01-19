import React from 'react';
import { Accessibility, Eye, Volume2, MousePointer2, CheckCircle2 } from 'lucide-react';

const AccessibilityPage = () => {
    return (
        <div className="bg-white min-h-screen">
            <div className="bg-gray-50 border-b py-20">
                <div className="container mx-auto px-4 text-center">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Accessibility size={32} />
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Accessibility</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        MarketPlace is committed to making its website accessible to all individuals.
                        We are constantly working to improve the user experience for everyone.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                        {[
                            { title: 'Visual Accessibility', icon: <Eye size={24} />, desc: 'High contrast modes, scalable text sizes, and screen reader compatibility.' },
                            { title: 'Audio Support', icon: <Volume2 size={24} />, desc: 'Alternative text for all relevant audio content and video captions.' },
                            { title: 'Keyboard Nav', icon: <MousePointer2 size={24} />, desc: 'Full platform navigation support using only keyboard shortcuts.' },
                            { title: 'WCAG 2.1 Compliance', icon: <CheckCircle2 size={24} />, desc: 'Following the Web Content Accessibility Guidelines to ensure universal access.' },
                        ].map((f, i) => (
                            <div key={i} className="p-8 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-xl transition-all group text-center">
                                <div className="w-14 h-14 bg-gray-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                    {f.icon}
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gray-100 p-12 rounded-[3rem] text-center">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Feedback & Support</h3>
                        <p className="text-gray-500 mb-8 max-w-xl mx-auto leading-relaxed">
                            If you encounter any accessibility barriers while using our platform,
                            please let us know. We value your feedback and are committed to fixing issues promptly.
                        </p>
                        <button className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-all">
                            Submit Feedback
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccessibilityPage;
