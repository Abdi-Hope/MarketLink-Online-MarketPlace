import React from 'react';
import { ShieldCheck, Lock, Fingerprint, Key, Bell, ShieldClose } from 'lucide-react';

const SecurityPage = () => {
    const securityFeatures = [
        { title: 'End-to-End Encryption', icon: <Lock className="text-blue-600" />, desc: 'All sensitive data and communications are encrypted using industry-standard protocols.' },
        { title: 'Fraud Detection', icon: <ShieldCheck className="text-green-600" />, desc: 'Real-time AI monitoring to detect and prevent suspicious transactions and activities.' },
        { title: 'Secure Authentication', icon: <Fingerprint className="text-purple-600" />, desc: 'Multi-factor authentication (MFA) and secure session management for all accounts.' },
        { title: 'Data Privacy', icon: <ShieldClose className="text-red-500" />, desc: 'We never sell your data. Your personal information stays private and protected.' },
    ];

    return (
        <div className="bg-white min-h-screen">
            <div className="bg-gray-900 border-b py-20 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-blue-500/5"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="w-16 h-16 bg-blue-600/20 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-500/30">
                        <ShieldCheck size={32} />
                    </div>
                    <h1 className="text-4xl font-black mb-4 tracking-tight">Security Center</h1>
                    <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Your security is our top priority. We use military-grade protection
                        to keep your shopping experience safe and secure.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                        {securityFeatures.map((f, i) => (
                            <div key={i} className="p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-2xl transition-all group">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                    {f.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{f.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="bg-blue-600 rounded-[3rem] p-12 text-white relative overflow-hidden group">
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                            <div className="md:w-2/3">
                                <h3 className="text-3xl font-black mb-6">Found a potential security issue?</h3>
                                <p className="text-blue-100 mb-8 leading-relaxed opacity-90">
                                    We take every security threat seriously. If you've discovered a bug or
                                    vulnerability, please report it to our bug bounty program.
                                    We offer rewards for verified security findings.
                                </p>
                                <button className="px-10 py-4 bg-white text-blue-600 rounded-2xl font-black hover:bg-blue-50 transition-all shadow-xl shadow-blue-900/20">
                                    Report a Vulnerability
                                </button>
                            </div>
                            <div className="md:w-1/3 flex justify-center">
                                <Key size={120} className="text-white/20 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecurityPage;
