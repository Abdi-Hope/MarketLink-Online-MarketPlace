import React from 'react';
import { Scale, FileCheck, AlertCircle, ShoppingBag, UserCheck, CreditCard } from 'lucide-react';

const TermsPage = () => {
  const terms = [
    {
      title: 'Agreement to Terms',
      icon: <Scale className="text-blue-600" />,
      content: 'By accessing our platform, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you are prohibited from using this site.'
    },
    {
      title: 'User Obligations',
      icon: <UserCheck className="text-purple-600" />,
      content: 'You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.'
    },
    {
      title: 'Purchases & Payment',
      icon: <CreditCard className="text-green-600" />,
      content: 'We reserve the right to refuse or cancel your order if fraud or an unauthorized or illegal transaction is suspected. You represent that you have the legal right to use any payment method chosen.'
    },
    {
      title: 'Intellectual Property',
      icon: <FileCheck className="text-indigo-600" />,
      content: 'The content on this platform, including text, graphics, logos, and images, is the property of MarketPlace and is protected by copyright and other intellectual property laws.'
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-gray-50 border-b py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Scale size={32} />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Terms of Service</h1>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Please read these terms carefully before using our platform.
            Using MarketPlace implies acceptance of these rules.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {terms.map((term, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {term.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{term.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{term.content}</p>
              </div>
            ))}
          </div>

          <div className="prose prose-purple max-w-none">
            <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100 mb-12 flex items-start gap-4">
              <AlertCircle className="text-amber-600 shrink-0" size={24} />
              <div>
                <h4 className="font-bold text-amber-900 mb-2">Important Notice</h4>
                <p className="text-amber-800 text-sm">
                  MarketPlace acts as a platform to connect buyers and sellers. While we vet our sellers,
                  individual transactions are subject to the specific return policies defined by each seller.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Governing Law</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Any claim relating to MarketPlace web site shall be governed by the laws of the
              State of California without regard to its conflict of law provisions.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Prohibited Uses</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              You are prohibited from using the site or its content for any unlawful purpose,
              to solicit others to perform or participate in any unlawful acts, or to violate
              any international or local regulations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;