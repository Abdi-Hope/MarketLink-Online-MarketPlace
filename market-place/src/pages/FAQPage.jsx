// src/pages/FAQPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState([]);

  const toggleFAQ = (id) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  // FAQ Categories
  const categories = [
    { id: 'all', name: 'All Questions', count: 45 },
    { id: 'account', name: 'Account', count: 12 },
    { id: 'buying', name: 'Buying', count: 8 },
    { id: 'selling', name: 'Selling', count: 15 },
    { id: 'payments', name: 'Payments', count: 7 },
    { id: 'shipping', name: 'Shipping', count: 10 },
    { id: 'returns', name: 'Returns', count: 9 },
  ];

  // All FAQ Items
  const allFAQs = [
    // Account FAQs
    { id: 1, category: 'account', question: 'How do I create an account?', 
      answer: 'Click the "Sign Up" button in the top right corner of any page. You can sign up using your email address or connect with Google or Facebook. After providing your details, you will receive a verification email to activate your account.' },
    { id: 2, category: 'account', question: 'Is registration free?', 
      answer: 'Yes, creating an account on our marketplace is completely free for both buyers and sellers. There are no hidden fees or monthly charges for basic account features.' },
    { id: 3, category: 'account', question: 'How do I reset my password?', 
      answer: 'Click "Forgot Password" on the login page, enter your registered email address, and follow the instructions sent to your inbox. The password reset link is valid for 24 hours.' },
    
    // Buying FAQs
    { id: 4, category: 'buying', question: 'How do I place an order?', 
      answer: 'Browse products, click "Add to Cart" for desired items, then proceed to checkout. Enter your shipping address, select payment method, and confirm your order. You will receive an order confirmation email.' },
    { id: 5, category: 'buying', question: 'Can I modify or cancel my order?', 
      answer: 'You can modify or cancel your order within 1 hour of placing it from your Orders page. After 1 hour, please contact the seller directly to request changes.' },
    
    // Selling FAQs
    { id: 6, category: 'selling', question: 'How do I start selling?', 
      answer: 'Go to your dashboard and click "Become a Seller". Complete your seller profile, verify your identity, and you can start listing products immediately. We recommend reading our seller guidelines first.' },
    { id: 7, category: 'selling', question: 'What are the seller fees?', 
      answer: 'We charge a 5% commission on each successful sale. There are no listing fees, monthly subscription fees, or hidden charges. Payment processing fees are separate and vary by payment method.' },
    { id: 8, category: 'selling', question: 'How do I list a product?', 
      answer: 'Go to your seller dashboard, click "Add Product", fill in the product details (title, description, price, category), upload high-quality images, set shipping options, and publish your listing.' },
    
    // Payment FAQs
    { id: 9, category: 'payments', question: 'What payment methods are accepted?', 
      answer: 'We accept credit/debit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and bank transfers. Available payment methods may vary by region.' },
    { id: 10, category: 'payments', question: 'Is my payment information secure?', 
      answer: 'Yes, we use industry-standard SSL encryption and never store your full payment details on our servers. All transactions are processed through PCI-compliant payment gateways.' },
    
    // Shipping FAQs
    { id: 11, category: 'shipping', question: 'How long does shipping take?', 
      answer: 'Shipping times vary by seller location and shipping method. Domestic orders typically arrive in 3-7 business days. International shipping can take 7-21 business days. Exact delivery estimates are shown at checkout.' },
    { id: 12, category: 'shipping', question: 'How do I track my order?', 
      answer: 'Once your order ships, you will receive a tracking number via email. You can also view tracking information in your Orders section. Click on the order details to see real-time updates.' },
    
    // Returns FAQs
    { id: 13, category: 'returns', question: 'What is your return policy?', 
      answer: 'We offer a 30-day return policy for most items. Items must be in original condition with all tags attached. Some categories (like personalized items) may have different return policies.' },
    { id: 14, category: 'returns', question: 'How do I return an item?', 
      answer: 'Go to your Orders page, select the item you want to return, choose a reason, and print the return label. Pack the item securely, attach the label, and drop it off at the designated carrier location.' },
  ];

  // Filter FAQs based on active category
  const filteredFAQs = activeCategory === 'all' 
    ? allFAQs 
    : allFAQs.filter(faq => faq.category === activeCategory);

  // Popular Questions
  const popularQuestions = [
    { id: 1, question: 'How do I contact customer support?', category: 'account' },
    { id: 2, question: 'What are the shipping costs?', category: 'shipping' },
    { id: 3, question: 'Can I sell internationally?', category: 'selling' },
    { id: 4, question: 'How do I get a refund?', category: 'returns' },
    { id: 5, question: 'Is my personal information safe?', category: 'account' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg md:text-xl text-indigo-100 mb-6">
              Find quick answers to common questions about our marketplace
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <input
                type="text"
                placeholder="Search questions..."
                className="flex-1 max-w-md px-6 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              {/* Categories */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                        activeCategory === category.id
                          ? 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                      }`}
                    >
                      <span className="font-medium">{category.name}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        activeCategory === category.id
                          ? 'bg-indigo-100 text-indigo-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Questions */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Popular Questions</h3>
                <div className="space-y-3">
                  {popularQuestions.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveCategory(item.category);
                        const faqId = allFAQs.find(f => f.question.includes(item.question.split(' ')[0]))?.id;
                        if (faqId) setOpenItems([faqId]);
                      }}
                      className="w-full text-left p-3 bg-white rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-sm transition-all"
                    >
                      <p className="font-medium text-gray-800 text-sm mb-1">{item.question}</p>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                        {item.category}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Help Card */}
              <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                <div className="text-4xl mb-4">❓</div>
                <h4 className="font-bold text-gray-800 mb-2">Still have questions?</h4>
                <p className="text-gray-600 text-sm mb-4">
                  Can't find what you're looking for?
                </p>
                <Link
                  to="/help"
                  className="inline-block w-full py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content - FAQs */}
          <div className="lg:col-span-3">
            {/* Stats Bar */}
            <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {categories.find(c => c.id === activeCategory)?.name}
                  </h2>
                  <p className="text-gray-600">
                    {filteredFAQs.length} questions in this category
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Print FAQ
                  </button>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Ask New Question
                  </button>
                </div>
              </div>
            </div>

            {/* FAQ List */}
            <div className="space-y-4">
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md"
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full p-6 text-left flex items-start justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-600 text-xs font-medium rounded-full">
                            {faq.category.charAt(0).toUpperCase() + faq.category.slice(1)}
                          </span>
                          <span className="text-sm text-gray-500">FAQ #{faq.id}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="ml-4">
                        <svg
                          className={`w-6 h-6 text-gray-400 transform transition-transform ${
                            openItems.includes(faq.id) ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>
                    
                    {openItems.includes(faq.id) && (
                      <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                        <div className="prose max-w-none">
                          <p className="text-gray-600">{faq.answer}</p>
                          <div className="flex items-center space-x-4 mt-6 pt-4 border-t border-gray-100">
                            <span className="text-sm text-gray-500">Was this helpful?</span>
                            <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-green-600">
                              <span>👍</span>
                              <span>Yes</span>
                            </button>
                            <button className="flex items-center space-x-1 text-sm text-gray-600 hover:text-red-600">
                              <span>👎</span>
                              <span>No</span>
                            </button>
                            <button className="text-sm text-indigo-600 hover:text-indigo-800 ml-auto">
                              Report issue
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                  <div className="text-5xl mb-6">🔍</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    No questions found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try selecting a different category or searching for specific terms.
                  </p>
                  <button
                    onClick={() => setActiveCategory('all')}
                    className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    View All Questions
                  </button>
                </div>
              )}
            </div>

            {/* Pagination */}
            {filteredFAQs.length > 0 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    ← Previous
                  </button>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">1</button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    2
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    3
                  </button>
                  <span className="px-2 text-gray-500">...</span>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    10
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Next →
                  </button>
                </nav>
              </div>
            )}

            {/* Contact Section */}
            <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Still need help?
                  </h3>
                  <p className="text-gray-600">
                    Our support team is available 24/7 to assist you with any questions.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
                    Live Chat
                  </button>
                  <button className="px-6 py-3 border border-indigo-600 text-indigo-600 font-medium rounded-lg hover:bg-indigo-50 transition-colors">
                    Email Support
                  </button>
                </div>
              </div>
            </div>

            {/* FAQ Tips */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="text-3xl mb-4">💡</div>
                <h4 className="font-bold text-gray-800 mb-2">Tips for Buyers</h4>
                <p className="text-gray-600 text-sm">
                  Read product descriptions carefully, check seller ratings, and review return policies before purchasing.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="text-3xl mb-4">📝</div>
                <h4 className="font-bold text-gray-800 mb-2">Tips for Sellers</h4>
                <p className="text-gray-600 text-sm">
                  Use high-quality images, write detailed descriptions, and respond promptly to buyer inquiries.
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="text-3xl mb-4">🔒</div>
                <h4 className="font-bold text-gray-800 mb-2">Security Tips</h4>
                <p className="text-gray-600 text-sm">
                  Never share passwords, enable two-factor authentication, and report suspicious activity immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;