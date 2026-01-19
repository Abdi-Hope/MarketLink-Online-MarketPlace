import React from 'react';
import { Shield, Eye, Lock, FileText, Bell, Globe } from 'lucide-react';

const PrivacyPage = () => {
  const sections = [
    {
      title: 'Information We Collect',
      icon: <Eye className="text-blue-600" />,
      content: 'We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us. This info may include name, email, phone number, postal address, profile picture, payment method, and other info you choose to provide.'
    },
    {
      title: 'How We Use Info',
      icon: <FileText className="text-purple-600" />,
      content: 'We use the info we collect to provide, maintain, and improve our services, such as to facilitate payments, send receipts, provide products and services you request, develop new features, provide customer support, and send administrative messages.'
    },
    {
      title: 'Data Security',
      icon: <Lock className="text-green-600" />,
      content: 'We use industry-standard encryption and security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.'
    },
    {
      title: 'Cookies & Tracking',
      icon: <Globe className="text-orange-600" />,
      content: 'We use cookies and similar tracking technologies to track the activity on our service and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier.'
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gray-50 border-b py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield size={32} />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Last Updated: January 18, 2024. Your privacy is important to us.
            This policy explains how we handle your data.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {sections.map((section, i) => (
              <div key={i} className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {section.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{section.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

          <div className="prose prose-blue max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 underline decoration-blue-500 underline-offset-8">Detailed Policy Information</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              At MarketPlace, we are committed to maintaining the trust and confidence of our visitors
              to our web site. In particular, we want you to know that MarketPlace is not in the
              business of selling, renting or trading email lists with other companies and businesses
              for marketing purposes.
            </p>
            <h3 className="text-xl font-bold text-gray-900 mb-4 italic">1. Third Party Services</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              We may employ third party companies and individuals to facilitate our Service,
              to provide the Service on our behalf, to perform Service-related services or
              to assist us in analyzing how our Service is used. These third parties have
              access to your Personal Information only to perform these tasks on our behalf
              and are obligated not to disclose or use it for any other purpose.
            </p>
            <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <Bell size={18} />
                Policy Updates
              </h4>
              <p className="text-blue-800 text-sm">
                We may update our Privacy Policy from time to time. We will notify you of any changes by
                posting the new Privacy Policy on this page and updating the "last updated" date.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;