import React from 'react';
import { Link } from 'react-router-dom'; // Add this import


const OrderSummary = ({ items = [], shippingCost = 5.99, taxRate = 0.08 }) => {
  // Calculate totals
  const subtotal = items.reduce((total, item) => {
    const price = item.discountedPrice || item.price;
    return total + (price * item.quantity);
  }, 0);

  const tax = subtotal * taxRate;
  const total = subtotal + shippingCost + tax;
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-900">Order Summary</h3>
        <p className="text-gray-600 text-sm mt-1">{itemCount} items in order</p>
      </div>

      {/* Order Items */}
      <div className="p-6 border-b border-gray-200">
        <h4 className="font-medium text-gray-900 mb-4">Order Items</h4>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center">
              <div className="h-16 w-16 flex-shrink-0 rounded overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex justify-between">
                  <div>
                    <h5 className="text-sm font-medium text-gray-900">{item.name}</h5>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    ${((item.discountedPrice || item.price) * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="p-6">
        <h4 className="font-medium text-gray-900 mb-4">Price Details</h4>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal ({itemCount} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span>${shippingCost.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 pt-3">
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span className="text-lg">${total.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Including ${tax.toFixed(2)} in taxes</p>
          </div>
        </div>

        {/* Promo Code */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Promo Code
          </label>
          <div className="flex">
            <input
              type="text"
              placeholder="Enter code"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button className="px-4 py-2 bg-gray-100 text-gray-700 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200">
              Apply
            </button>
          </div>
        </div>

        {/* Order Notes */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Order Notes (Optional)
          </label>
          <textarea
            rows="3"
            placeholder="Add special instructions for your order..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Security & Policies */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Secure SSL encryption</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>30-day return policy</span>
          </div>
           <div className="text-sm text-gray-600 mt-4">
            By completing your purchase, you agree to our{' '}
            <Link to="/terms" className="text-blue-600 hover:text-blue-800">Terms of Service</Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-blue-600 hover:text-blue-800">Privacy Policy</Link>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
