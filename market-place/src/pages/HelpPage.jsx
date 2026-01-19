import React, { useState } from 'react';
import { Search, MessageCircle, Phone, Mail, BookOpen, Shield, ShoppingBag, Truck, CreditCard, ChevronDown, ChevronRight, Send, CheckCircle, Clock, User, HelpCircle, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const HelpPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', text: 'Hello! How can I help you today?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const categories = [
    { title: 'My Orders', icon: <ShoppingBag size={24} />, desc: 'Track deliveries, change orders', path: '/orders', color: 'blue' },
    { title: 'Payments', icon: <CreditCard size={24} />, desc: 'Payment methods, refund status', path: '/faq', color: 'purple' },
    { title: 'Shipping', icon: <Truck size={24} />, desc: 'Rates, delivery times', path: '/shipping-info', color: 'green' },
    { title: 'Security', icon: <Shield size={24} />, desc: 'Privacy, password reset', path: '/security', color: 'red' },
  ];

  const faqs = [
    {
      category: 'Orders & Shipping',
      questions: [
        { q: 'How do I track my order?', a: 'You can track your order by going to "My Orders" in your dashboard. Click on the order you want to track and you\'ll see real-time updates on its status and location.' },
        { q: 'Can I change my shipping address after ordering?', a: 'Yes, but only if your order hasn\'t shipped yet. Go to "My Orders", select the order, and click "Edit Shipping Address". Once shipped, contact our support team.' },
        { q: 'What are the delivery times?', a: 'Standard delivery takes 3-5 business days. Express delivery takes 1-2 business days. International shipping varies by destination, typically 7-14 business days.' },
      ]
    },
    {
      category: 'Payments & Refunds',
      questions: [
        { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers.' },
        { q: 'When will I receive my refund?', a: 'Refunds are processed within 3-5 business days after we receive your return. The money will be credited back to your original payment method.' },
        { q: 'How do I request a refund?', a: 'Go to "My Orders", select the item you want to return, click "Request Refund", fill out the form, and submit. We\'ll send you a return label via email.' },
      ]
    },
    {
      category: 'Account & Security',
      questions: [
        { q: 'How do I verify my account?', a: 'After registering, check your email for a verification link. Click the link to verify your account. If you didn\'t receive it, go to Settings > Resend Verification Email.' },
        { q: 'I forgot my password. What should I do?', a: 'Click "Forgot Password" on the login page, enter your email, and we\'ll send you a password reset link within minutes.' },
        { q: 'How do I enable two-factor authentication?', a: 'Go to Settings > Security > Two-Factor Authentication. Follow the instructions to set up 2FA using your phone or authenticator app.' },
      ]
    },
    {
      category: 'Selling on MarketLink',
      questions: [
        { q: 'How do I become a seller?', a: 'Click "Become a Seller" in the navigation menu, complete the registration form, verify your identity, and set up your payment method. Approval typically takes 1-2 business days.' },
        { q: 'What are the seller fees?', a: 'We charge a 10% commission on each sale plus a small payment processing fee (2.9% + $0.30 per transaction). No monthly fees or listing fees.' },
        { q: 'How do I list a product?', a: 'After becoming a seller, go to your Seller Dashboard > Products > Add New Product. Fill in the product details, upload images, set pricing, and publish.' },
      ]
    }
  ];

  const helpArticles = [
    { title: 'Getting Started Guide', category: 'General', keywords: 'start begin new account register' },
    { title: 'Track My Package', category: 'Orders', keywords: 'track order shipping delivery location' },
    { title: 'Request a Refund', category: 'Returns', keywords: 'refund return money back exchange' },
    { title: 'Seller Fees Breakdown', category: 'Selling', keywords: 'fees commission selling costs' },
    { title: 'Payment Methods', category: 'Payments', keywords: 'payment pay credit card paypal' },
    { title: 'Account Security', category: 'Security', keywords: 'security password 2fa authentication' },
    { title: 'Shipping Rates', category: 'Shipping', keywords: 'shipping delivery cost rates international' },
    { title: 'Product Returns Policy', category: 'Returns', keywords: 'return policy exchange warranty' },
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const results = helpArticles.filter(article =>
        article.title.toLowerCase().includes(query.toLowerCase()) ||
        article.keywords.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const toggleFaq = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setExpandedFaq(expandedFaq === key ? null : key);
  };

  const handleChatSend = () => {
    if (chatInput.trim()) {
      setChatMessages([...chatMessages,
      { type: 'user', text: chatInput },
      { type: 'bot', text: 'Thank you for your message! A support agent will respond shortly. In the meantime, you can browse our FAQ section below.' }
      ]);
      setChatInput('');
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setContactForm({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-600', hover: 'hover:bg-blue-100' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-600', hover: 'hover:bg-purple-100' },
      green: { bg: 'bg-green-50', text: 'text-green-600', hover: 'hover:bg-green-100' },
      red: { bg: 'bg-red-50', text: 'text-red-600', hover: 'hover:bg-red-100' },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 min-h-screen">
      {/* Search Hero */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse animation-delay-2000"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white text-sm font-bold mb-6 backdrop-blur-sm">
            <Sparkles size={16} className="animate-spin-slow" />
            24/7 Support Available
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight">How can we help you?</h1>
          <p className="text-xl text-blue-100 mb-8">Search our knowledge base or get in touch with our support team</p>

          <div className="max-w-3xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors z-10" size={24} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search for articles, orders, or policies..."
              className="w-full pl-16 pr-8 py-6 bg-white border-2 border-transparent rounded-3xl text-gray-900 text-lg placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:shadow-2xl transition-all"
            />

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full mt-4 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-top-4 duration-300">
                {searchResults.map((result, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setShowResults(false);
                      setSearchQuery('');
                    }}
                    className="w-full px-6 py-4 flex items-center gap-4 hover:bg-blue-50 transition-colors text-left border-b border-gray-100 last:border-0"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <HelpCircle className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{result.title}</h4>
                      <p className="text-sm text-gray-500">{result.category}</p>
                    </div>
                    <ChevronRight className="ml-auto text-gray-400" size={20} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <span className="text-blue-200 font-semibold">Popular:</span>
            {['Track my package', 'Request a refund', 'Seller fees', 'Payment methods'].map((term, i) => (
              <button
                key={i}
                onClick={() => handleSearch(term)}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-white font-semibold transition-all backdrop-blur-sm"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 pb-20 relative z-20">
        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 group hover:-translate-y-2 hover:shadow-blue-200 transition-all">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
              <MessageCircle size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-3">Live Chat</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">Connect with our support team instantly and get real-time assistance</p>
            <button
              onClick={() => setShowChatModal(true)}
              className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-2xl font-black hover:shadow-xl transition-all transform hover:scale-105"
            >
              Start Chat Now
            </button>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-green-600 font-semibold">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              12 agents online
            </div>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 group hover:-translate-y-2 hover:shadow-purple-200 transition-all">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-fuchsia-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
              <Phone size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-3">Call Center</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">Speak directly with our expert support team for complex issues</p>
            <a
              href="tel:+15555HELP"
              className="block w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-2xl font-black hover:shadow-xl transition-all transform hover:scale-105 text-center"
            >
              +1 (555) 435-7000
            </a>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600 font-semibold">
              <Clock size={16} />
              Mon-Fri 9AM-6PM EST
            </div>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-gray-100 group hover:-translate-y-2 hover:shadow-green-200 transition-all">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg">
              <Mail size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-3">Email Support</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">Send us detailed inquiries and get a response within 24 hours</p>
            <a
              href="mailto:support@marketlink.com"
              className="block w-full px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-black hover:shadow-xl transition-all transform hover:scale-105 text-center"
            >
              Send Email
            </a>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600 font-semibold">
              <Clock size={16} />
              Response in ~ 24 hours
            </div>
          </div>
        </div>

        {/* Browse by Topic */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-4xl font-black text-gray-900 mb-4 text-center">Browse by Topic</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Quick access to the most common help topics</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => {
              const colors = getColorClasses(cat.color);
              return (
                <Link
                  key={i}
                  to={cat.path}
                  className={`p-8 bg-white rounded-[2rem] border border-gray-100 hover:shadow-2xl transition-all group ${colors.hover}`}
                >
                  <div className={`${colors.bg} ${colors.text} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                    {cat.icon}
                  </div>
                  <h4 className="text-xl font-black text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{cat.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{cat.desc}</p>
                  <div className="flex items-center gap-2 text-sm font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ChevronRight size={16} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl font-black text-gray-900 mb-4 text-center">Frequently Asked Questions</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Find quick answers to common questions</p>

          {faqs.map((category, catIndex) => (
            <div key={catIndex} className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.questions.map((faq, qIndex) => {
                  const isExpanded = expandedFaq === `${catIndex}-${qIndex}`;
                  return (
                    <div
                      key={qIndex}
                      className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
                    >
                      <button
                        onClick={() => toggleFaq(catIndex, qIndex)}
                        className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                      >
                        <h4 className="font-bold text-gray-900 text-lg pr-4">{faq.q}</h4>
                        <ChevronDown
                          className={`flex-shrink-0 text-blue-600 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                          size={24}
                        />
                      </button>
                      <div
                        className={`transition-all duration-500 ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
                      >
                        <div className="px-8 pb-6 pt-2">
                          <div className="pl-4 border-l-4 border-blue-500 text-gray-700 leading-relaxed">
                            {faq.a}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="bg-white rounded-[3rem] shadow-2xl p-12 border border-gray-100">
            <h2 className="text-3xl font-black text-gray-900 mb-3 text-center">Still Need Help?</h2>
            <p className="text-center text-gray-600 mb-10">Send us a message and we'll get back to you as soon as possible</p>

            {formSubmitted ? (
              <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={40} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Sent!</h3>
                <p className="text-gray-600">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Subject *</label>
                  <input
                    type="text"
                    required
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                    placeholder="How can we help you?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Message *</label>
                  <textarea
                    required
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    rows="6"
                    className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all resize-none"
                    placeholder="Please provide as much detail as possible..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-black text-lg hover:shadow-2xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3"
                >
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* User Guides */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[4rem] p-12 md:p-20 text-white flex flex-col lg:flex-row items-center gap-16 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="lg:w-1/2 relative z-10">
            <div className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-sm">
              <BookOpen size={48} className="text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">Comprehensive User Guides</h2>
            <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
              New to MarketPlace? Check out our getting started guide for buyers and sellers.
              We walk you through everything from your first purchase to managing your store.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/faq')}
                className="px-10 py-5 bg-white text-indigo-600 rounded-2xl font-black hover:bg-indigo-50 transition-all shadow-xl transform hover:scale-105"
              >
                Buyer Guide
              </button>
              <button
                onClick={() => navigate('/seller/register')}
                className="px-10 py-5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl font-black border-2 border-white/30 hover:border-white/50 transition-all shadow-xl transform hover:scale-105"
              >
                Seller Center
              </button>
            </div>
          </div>

          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
            {[
              { q: 'How do I track my order?', a: 'Visit your dashboard under My Orders', icon: <ShoppingBag size={20} /> },
              { q: 'When will I get my refund?', a: 'Usually within 3-5 business days', icon: <CreditCard size={20} /> },
              { q: 'How to verify my account?', a: 'Check your email for the verification link', icon: <Shield size={20} /> },
              { q: 'Can I change my address?', a: 'Yes, if the order hasn\'t shipped yet', icon: <Truck size={20} /> },
            ].map((item, i) => (
              <div key={i} className="group bg-white/10 p-6 rounded-3xl backdrop-blur-sm border border-white/10 hover:bg-white/20 hover:scale-105 transition-all cursor-pointer">
                <div className="flex items-start gap-3 mb-3">
                  <div className="text-blue-300">{item.icon}</div>
                  <h5 className="font-bold text-white">{item.q}</h5>
                </div>
                <p className="text-indigo-100 text-sm leading-relaxed ml-8">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Chat Modal */}
      {showChatModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-t-3xl md:rounded-3xl w-full md:max-w-2xl max-h-[80vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom-4 md:slide-in-from-bottom-0 duration-500">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-3xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-black text-white text-lg">Live Support Chat</h3>
                  <div className="flex items-center gap-2 text-sm text-blue-100">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    Online now
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowChatModal(false)}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronDown className="text-white" size={24} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-gray-50">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                  <div className={`max-w-[80%] px-6 py-4 rounded-3xl ${msg.type === 'user' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-white border border-gray-200 text-gray-900'}`}>
                    {msg.type === 'bot' && (
                      <div className="flex items-center gap-2 mb-2">
                        <User size={16} className="text-blue-600" />
                        <span className="text-xs font-bold text-blue-600">Support Agent</span>
                      </div>
                    )}
                    <p className="leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-6 border-t border-gray-200 bg-white rounded-b-3xl">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                  placeholder="Type your message..."
                  className="flex-1 px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
                />
                <button
                  onClick={handleChatSend}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-black hover:shadow-lg transition-all transform hover:scale-105"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default HelpPage;