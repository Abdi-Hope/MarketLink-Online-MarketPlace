import React, { useState } from 'react';

const PaymentMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [savedCards, setSavedCards] = useState([
    { id: 1, type: 'visa', last4: '4242', name: 'John Smith', expiry: '12/24' },
    { id: 2, type: 'mastercard', last4: '8888', name: 'John Smith', expiry: '08/25' },
  ]);

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
    { id: 'paypal', name: 'PayPal', icon: '💰' },
    { id: 'applepay', name: 'Apple Pay', icon: '' },
    { id: 'googlepay', name: 'Google Pay', icon: 'G' },
    { id: 'bank', name: 'Bank Transfer', icon: '🏦' },
  ];

  const handleDeleteCard = (cardId) => {
    if (window.confirm('Are you sure you want to remove this card?')) {
      setSavedCards(savedCards.filter(card => card.id !== cardId));
    }
  };

  const getCardIcon = (type) => {
    switch(type) {
      case 'visa': return 'VISA';
      case 'mastercard': return 'MC';
      case 'amex': return 'AMEX';
      default: return 'CC';
    }
  };

  const getCardColor = (type) => {
    switch(type) {
      case 'visa': return 'bg-blue-600';
      case 'mastercard': return 'bg-red-600';
      case 'amex': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-900">Payment Method</h3>
        <p className="text-gray-600 text-sm mt-1">Choose your preferred payment method</p>
      </div>

      {/* Payment Method Selection */}
      <div className="p-6 border-b border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`p-4 rounded-lg border flex flex-col items-center justify-center transition-colors ${
                selectedMethod === method.id 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <span className="text-2xl mb-2">{method.icon}</span>
              <span className="text-sm font-medium">{method.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Saved Cards */}
      {selectedMethod === 'card' && savedCards.length > 0 && (
        <div className="p-6 border-b border-gray-200">
          <h4 className="font-medium text-gray-900 mb-4">Saved Cards</h4>
          <div className="space-y-3">
            {savedCards.map((card) => (
              <label
                key={card.id}
                className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="radio"
                  name="savedCard"
                  value={card.id}
                  className="h-4 w-4 text-blue-600"
                />
                <div className="ml-3 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`h-8 w-12 rounded flex items-center justify-center text-white text-xs font-bold ${getCardColor(card.type)}`}>
                        {getCardIcon(card.type)}
                      </div>
                      <div className="ml-3">
                        <div className="font-medium">•••• {card.last4}</div>
                        <div className="text-sm text-gray-500">{card.name} • Expires {card.expiry}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteCard(card.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Add New Card Form */}
      {selectedMethod === 'card' && (
        <div className="p-6">
          <h4 className="font-medium text-gray-900 mb-4">Add New Card</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name on Card
              </label>
              <input
                type="text"
                placeholder="John Smith"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="saveCard"
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <label htmlFor="saveCard" className="ml-2 text-sm text-gray-700">
                Save card for future purchases
              </label>
            </div>
          </div>
        </div>
      )}

      {/* PayPal Info */}
      {selectedMethod === 'paypal' && (
        <div className="p-6">
          <div className="text-center">
            <div className="inline-block p-4 bg-blue-50 rounded-full mb-4">
              <svg className="w-12 h-12 text-blue-600" viewBox="0 0 24 24">
                <path fill="#003087" d="M12.422 3.395c-.774-.116-1.54-.22-2.297-.22-4.5 0-8.125 3.625-8.125 8.125s3.625 8.125 8.125 8.125c.757 0 1.523-.104 2.297-.22 2.485-.37 4.922-1.502 6.578-3.547 1.656-2.045 2.344-4.724 1.875-7.422-.469-2.698-2.188-5.03-4.688-6.242-2.5-1.21-5.43-1.008-7.93.2z"/>
                <path fill="#009CDE" d="M12.422 3.395c-.774-.116-1.54-.22-2.297-.22-4.5 0-8.125 3.625-8.125 8.125s3.625 8.125 8.125 8.125c.757 0 1.523-.104 2.297-.22 2.485-.37 4.922-1.502 6.578-3.547 1.656-2.045 2.344-4.724 1.875-7.422-.469-2.698-2.188-5.03-4.688-6.242-2.5-1.21-5.43-1.008-7.93.2z" opacity=".5"/>
                <path fill="#fff" d="M9.125 11.25h3.75c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25h-3.75c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25z"/>
              </svg>
            </div>
            <p className="text-gray-600 mb-6">
              You will be redirected to PayPal to complete your payment securely.
            </p>
            <button className="w-full bg-yellow-400 text-gray-900 py-3 px-4 rounded-lg font-medium hover:bg-yellow-500">
              Continue with PayPal
            </button>
          </div>
        </div>
      )}

      {/* Apple Pay/Google Pay Info */}
      {(selectedMethod === 'applepay' || selectedMethod === 'googlepay') && (
        <div className="p-6">
          <div className="text-center">
            <div className={`inline-block p-4 rounded-full mb-4 ${
              selectedMethod === 'applepay' ? 'bg-black' : 'bg-white border border-gray-300'
            }`}>
              <span className={`text-2xl font-bold ${
                selectedMethod === 'applepay' ? 'text-white' : 'text-gray-900'
              }`}>
                {selectedMethod === 'applepay' ? ' Pay' : 'G Pay'}
              </span>
            </div>
            <p className="text-gray-600 mb-6">
              {selectedMethod === 'applepay' 
                ? 'Pay securely with Apple Pay using your iPhone, iPad, or Mac.'
                : 'Pay securely with Google Pay using your saved payment methods.'
              }
            </p>
            <button className={`w-full py-3 px-4 rounded-lg font-medium ${
              selectedMethod === 'applepay'
                ? 'bg-black text-white hover:bg-gray-900'
                : 'bg-white border border-gray-300 text-gray-900 hover:bg-gray-50'
            }`}>
              Continue with {selectedMethod === 'applepay' ? 'Apple Pay' : 'Google Pay'}
            </button>
          </div>
        </div>
      )}

      {/* Bank Transfer Info */}
      {selectedMethod === 'bank' && (
        <div className="p-6">
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h4 className="font-medium text-blue-900 mb-2">Bank Transfer Instructions</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Use your order ID as payment reference</li>
              <li>• Payment must be received within 24 hours</li>
              <li>• Order will be processed after payment confirmation</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bank Name
              </label>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">MarketLink Payments Inc.</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number
                </label>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="font-mono">1234567890</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Routing Number
                </label>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="font-mono">021000021</span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SWIFT/BIC Code
              </label>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="font-mono">BOFAUS3N</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;