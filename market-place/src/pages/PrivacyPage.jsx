// src/pages/PrivacyPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PrivacyPage = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview', icon: '📋' },
    { id: 'collection', title: 'Data Collection', icon: '📊' },
    { id: 'use', title: 'Data Use', icon: '🔧' },
    { id: 'sharing', title: 'Data Sharing', icon: '🤝' },
    { id: 'security', title: 'Security', icon: '🔒' },
    { id: 'rights', title: 'Your Rights', icon: '👤' },
    { id: 'cookies', title: 'Cookies', icon: '🍪' },
    { id: 'contact', title: 'Contact Us', icon: '📞' },
  ];

  const sectionContent = {
    overview: {
      title: 'Privacy Policy Overview',
      content: `Effective Date: ${new Date().toLocaleDateString()}

Welcome to MarketPlace! Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our marketplace platform.`,
      points: [
        'We are committed to protecting your personal data',
        'This policy applies to all users of our platform',
        'By using our services, you agree to this policy',
        'We may update this policy periodically'
      ]
    },
    collection: {
      title: 'Information We Collect',
      content: 'We collect information to provide better services to all our users.',
      points: [
        'Personal Information: Name, email, phone number, address',
        'Account Information: Username, password, profile data',
        'Transaction Data: Purchase history, payment information',
        'Technical Data: IP address, browser type, device information',
        'Usage Data: Pages visited, time spent, interactions'
      ]
    },
    use: {
      title: 'How We Use Your Information',
      content: 'Your information helps us provide, maintain, and improve our services.',
      points: [
        'To process transactions and deliver products',
        'To communicate with you about orders and updates',
        'To improve our platform and user experience',
        'To prevent fraud and enhance security',
        'To comply with legal obligations'
      ]
    },
    sharing: {
      title: 'Information Sharing',
      content: 'We do not sell your personal information. We share data only in limited circumstances.',
      points: [
        'With sellers for order fulfillment',
        'With payment processors for transactions',
        'With shipping carriers for delivery',
        'When required by law or legal process',
        'To protect our rights and safety'
      ]
    },
    security: {
      title: 'Data Security',
      content: 'We implement appropriate security measures to protect your information.',
      points: [
        'SSL encryption for data transmission',
        'Secure servers and firewalls',
        'Regular security assessments',
        'Limited access to personal data',
        'Employee training on data protection'
      ]
    },
    rights: {
      title: 'Your Privacy Rights',
      content: 'You have rights regarding your personal information.',
      points: [
        'Access your personal data',
        'Correct inaccurate information',
        'Request data deletion',
        'Opt-out of marketing communications',
        'Download your data (data portability)'
      ]
    },
    cookies: {
      title: 'Cookies & Tracking',
      content: 'We use cookies and similar technologies to enhance your experience.',
      points: [
        'Essential cookies for platform functionality',
        'Analytics cookies to understand usage',
        'Marketing cookies for personalized ads',
        'You can manage cookie preferences',
        'Browser settings control cookie acceptance'
      ]
    },
    contact: {
      title: 'Contact Information',
      content: 'If you have questions about our Privacy Policy, please contact us.',
      points: [
        'Email: privacy@marketplace.com',
        'Phone: +1 (800) 123-4567',
        'Address: 123 Privacy Street, Data City, DC 12345',
        'Response Time: Within 48 hours',
        'Data Protection Officer: Sarah Johnson'
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-6">
              Protecting your privacy is our commitment
            </p>
            <div className="flex items-center space-x-2 text-blue-200">
              <span>Last Updated:</span>
              <span className="font-semibold">{new Date().toLocaleDateString()}</span>
              <span className="ml-4">Version:</span>
              <span className="font-semibold">3.2.1</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="sticky top-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Navigation</h3>
                <div className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                        activeSection === section.id
                          ? 'bg-blue-50 text-blue-600 border border-blue-200'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                      }`}
                    >
                      <span className="text-lg">{section.icon}</span>
                      <span className="font-medium text-left">{section.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6">
                <h4 className="font-bold text-gray-800 mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <button className="w-full p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all text-left">
                    <span className="font-medium text-gray-800">Download PDF</span>
                  </button>
                  <button className="w-full p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all text-left">
                    <span className="font-medium text-gray-800">Print Policy</span>
                  </button>
                  <Link
                    to="/settings"
                    className="block w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
                  >
                    Privacy Settings
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Section Header */}
              <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {sectionContent[activeSection].title}
                    </h2>
                    <p className="text-gray-600 mt-2">
                      {sections.find(s => s.id === activeSection)?.icon} • 
                      Updated {new Date().toLocaleDateString()}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full">
                    Section {sections.findIndex(s => s.id === activeSection) + 1} of {sections.length}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="prose max-w-none">
                  <p className="text-gray-600 mb-6 text-lg">
                    {sectionContent[activeSection].content}
                  </p>

                  <div className="space-y-4 mb-8">
                    {sectionContent[activeSection].points.map((point, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                        <span className="text-blue-600">✓</span>
                        <span className="text-gray-700">{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Additional Information */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Important Notes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <h4 className="font-bold text-gray-800 mb-2">Updates to Policy</h4>
                        <p className="text-gray-600 text-sm">
                          We may update this policy. Significant changes will be notified via email or platform notice.
                        </p>
                      </div>
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-bold text-gray-800 mb-2">Compliance</h4>
                        <p className="text-gray-600 text-sm">
                          Our practices comply with GDPR, CCPA, and other applicable privacy laws.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Footer */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-between">
                  <button
                    onClick={() => {
                      const currentIndex = sections.findIndex(s => s.id === activeSection);
                      if (currentIndex > 0) setActiveSection(sections[currentIndex - 1].id);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    disabled={sections[0].id === activeSection}
                  >
                    <span>← Previous</span>
                  </button>
                  
                  <div className="text-center">
                    <span className="text-sm text-gray-500">
                      {sections.findIndex(s => s.id === activeSection) + 1} of {sections.length}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => {
                      const currentIndex = sections.findIndex(s => s.id === activeSection);
                      if (currentIndex < sections.length - 1) setActiveSection(sections[currentIndex + 1].id);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    disabled={sections[sections.length - 1].id === activeSection}
                  >
                    <span>Next →</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Questions about Privacy?</h3>
                  <p className="text-gray-600">
                    Contact our Privacy Team for any questions or concerns.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    Email Privacy Team
                  </button>
                  <button className="px-6 py-3 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">
                    Schedule Call
                  </button>
                </div>
              </div>
            </div>

            {/* Related Links */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                to="/terms"
                className="p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-4">📜</div>
                <h4 className="font-bold text-gray-800 mb-2">Terms of Service</h4>
                <p className="text-gray-600 text-sm">Read our terms and conditions</p>
              </Link>
              
              <Link
                to="/cookies"
                className="p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-4">🍪</div>
                <h4 className="font-bold text-gray-800 mb-2">Cookie Policy</h4>
                <p className="text-gray-600 text-sm">Learn about cookies and tracking</p>
              </Link>
              
              <Link
                to="/help"
                className="p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="text-3xl mb-4">❓</div>
                <h4 className="font-bold text-gray-800 mb-2">Help Center</h4>
                <p className="text-gray-600 text-sm">Get help with privacy questions</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;