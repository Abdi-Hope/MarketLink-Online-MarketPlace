import React from 'react';
import { Cookie, Info, Shield, CheckCircle2 } from 'lucide-react';

const CookiesPage = () => {
    return (
        <div className="bg-white min-h-screen">
            <div className="bg-gray-50 border-b py-20">
                <div className="container mx-auto px-4 text-center">
                    <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Cookie size={32} />
                    </div>
                    <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Cookie Policy</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
                        We use cookies to improve your experience on our platform.
                        This policy explains how and why we use them.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto space-y-12">
                    <section className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <Info className="text-blue-500" size={24} />
                            What are Cookies?
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Cookies are small text files that are stored on your computer or mobile device
                            when you visit a website. They are widely used to make websites work more
                            efficiently, as well as to provide information to the owners of the site.
                        </p>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-900 px-4">How we use them</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { title: 'Essential', desc: 'Required for basic site functionality and security.' },
                                { title: 'Performance', desc: 'Help us understand how visitors interact with the site.' },
                                { title: 'Functional', desc: 'Remember your preferences and personalize your experience.' },
                                { title: 'Marketing', desc: 'Used to deliver relevant advertisements to you.' },
                            ].map((item, i) => (
                                <div key={i} className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex gap-4">
                                    <CheckCircle2 className="text-green-500 shrink-0" size={20} />
                                    <div>
                                        <h4 className="font-bold text-gray-900 mb-1">{item.title}</h4>
                                        <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-gray-900 text-white p-10 rounded-[3rem]">
                        <h3 className="text-2xl font-bold mb-4">Managing Cookies</h3>
                        <p className="text-gray-400 mb-8 leading-relaxed">
                            Most web browsers allow some control of most cookies through the browser settings.
                            To find out more about cookies, including how to see what cookies have been set,
                            visit allaboutcookies.org.
                        </p>
                        <button className="px-8 py-3 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition-all">
                            Cookie Settings
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CookiesPage;
