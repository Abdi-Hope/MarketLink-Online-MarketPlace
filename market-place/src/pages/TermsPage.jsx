// src/pages/TermsPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TermsPage = () => {
  const [activeSection, setActiveSection] = useState('acceptance');

  const sections = [
    { id: 'acceptance', title: 'Acceptance', icon: '✅' },
    { id: 'accounts', title: 'User Accounts', icon: '👤' },
    { id: 'purchases', title: 'Purchases', icon: '🛒' },
    { id: 'selling', title: 'Selling', icon: '🏪' },
    { id: 'content', title: 'Content', icon: '📝' },
    { id: 'prohibited', title: 'Prohibited', icon: '🚫' },
    { id: 'termination', title: 'Termination', icon: '⏹️' },
    { id: 'liability', title: 'Liability', icon: '⚖️' },
  ];

  const sectionContent = {
    acceptance: {
      title: 'Acceptance of Terms',
      content: `By accessing and using MarketPlace, you accept and agree to be bound by these Terms of Service.`,
      points: [
        'You must be at least 18 years old to use our platform',
        'By creating an account, you agree to these terms',
        'We reserve the right to update these terms at any time',
        'Continued use after changes constitutes acceptance'
      ]
    },
    accounts: {
      title: 'User Accounts',
      content: 'To access certain features, you must create an account.',
      points: [
        'Provide accurate and complete information',
        'Maintain the security of your account credentials',
        'You are responsible for all account activity',
        'Notify us immediately of unauthorized access'
      ]
    },
    purchases: {
      title: 'Purchases & Payments',
      content: 'Rules and guidelines for making purchases on our platform.',
      points: [
        'All prices are listed in USD unless otherwise specified',
        'You agree to pay all charges at the prices in effect',
        'We use third-party payment processors',
        'Refunds are subject to our refund policy'
      ]
    },
    selling: {
      title: 'Selling on MarketPlace',
      content: 'Requirements and obligations for sellers.',
      points: [
        'Sellers must provide accurate product descriptions',
        'You are responsible for product quality and delivery',
        'Comply with all applicable laws and regulations',
        'Maintain appropriate business licenses and permits'
      ]
    },
    content: {
      title: 'User Content',
      content: 'Guidelines for content you post on our platform.',
      points: [
        'You retain ownership of your content',
        'You grant us license to use your content on the platform',
        'Content must not violate any laws or rights',
        'We may remove content that violates our policies'
      ]
    },
    prohibited: {
      title: 'Prohibited Activities',
      content: 'Activities that are not allowed on our platform.',
      points: [
        'Fraudulent or deceptive practices',
        'Intellectual property infringement',
        'Harassment or hate speech',
        'Selling illegal or prohibited items'
      ]
    },
    termination: {
      title: 'Termination',
      content: 'We may suspend or terminate your account.',
      points: [
        'We may terminate accounts for policy violations',
        'You may terminate your account at any time',
        'Termination does not relieve you of outstanding obligations',
        'Some provisions survive termination'
      ]
    },
    liability: {
      title: 'Limitation of Liability',
      content: 'Our liability is limited as described below.',
      points: [
        'We are not liable for indirect or consequential damages',
        'Maximum liability is limited to the amount you paid',
        'We are not responsible for third-party actions',
        'Some jurisdictions do not allow these limitations'
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Terms of Service
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 mb-6">
              The rules and guidelines for using our marketplace
            </p>
            <div className="flex items-center space-x-2 text-indigo-200">
              <span>Effective Date:</span>
              <span className="font-semibold">{new Date().toLocaleDateString()}</span>
              <span className="ml-4">Version:</span>
              <span className="font-semibold">2.5.0</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-5xl mx-auto">
          {/* Warning Banner */}
          <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Important Legal Notice</h3>
                <p className="text-gray-700">
                  These Terms of Service constitute a legally binding agreement between you and MarketPlace. 
                  Please read them carefully. By using our platform, you agree to these terms.
                </p>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="mb-8">
            <div className="flex overflow-x-auto scrollbar-hide pb-2 space-x-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg whitespace-nowrap transition-all ${
                    activeSection === section.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <span>{section.icon}</span>
                  <span className="font-medium">{section.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-6 md:p-8 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                    {sectionContent[activeSection].title}
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Section {sections.findIndex(s => s.id === activeSection) + 1} • 
                    Last Updated: {new Date().toLocaleDateString()}
                  </p>
                </div>
                <span className="px-4 py-2 bg-indigo-100 text-indigo-600 font-medium rounded-full">
                  Legal Section
                </span>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="prose max-w-none">
                <div className="mb-8">
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    {sectionContent[activeSection].content}
                  </p>
                  
                  <div className="space-y-4">
                    {sectionContent[activeSection].points.map((point, index) => (
                      <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <span className="text-indigo-600 font-bold">{index + 1}.</span>
                        <span className="text-gray-700">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Legal Notes */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Legal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">Governing Law</h4>
                      <p className="text-gray-600 text-sm">
                        These terms are governed by the laws of the State of California, without regard to conflict of law principles.
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">Dispute Resolution</h4>
                      <p className="text-gray-600 text-sm">
                        Any disputes shall be resolved through binding arbitration in San Francisco, California.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => {
                    const currentIndex = sections.findIndex(s => s.id === activeSection);
                    if (currentIndex > 0) setActiveSection(sections[currentIndex - 1].id);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
                  disabled={sections[0].id === activeSection}
                >
                  <span>← Previous Section</span>
                </button>
                
                <div className="text-center hidden md:block">
                  <span className="text-sm text-gray-500">
                    Viewing: {sectionContent[activeSection].title}
                  </span>
                </div>
                
                <button
                  onClick={() => {
                    const currentIndex = sections.findIndex(s => s.id === activeSection);
                    if (currentIndex < sections.length - 1) setActiveSection(sections[currentIndex + 1].id);
                  }}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
                  disabled={sections[sections.length - 1].id === activeSection}
                >
                  <span>Next Section →</span>
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
              I Accept Terms
            </button>
            <button className="px-8 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
              Download PDF
            </button>
            <Link
              to="/privacy"
              className="px-8 py-3 border border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors text-center"
            >
              Privacy Policy
            </Link>
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 p-8">
            <div className="text-center max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Questions About Our Terms?</h3>
              <p className="text-gray-600 mb-6">
                Contact our legal team for clarification or questions about these terms.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                  Contact Legal Team
                </button>
                <button className="px-6 py-3 border border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors">
                  Request Clarification
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;