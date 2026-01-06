import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CartSummary = ({ 
  selectedItems = [], 
  allItems = [],
  onSelectAll,
  onCheckout 
}) => {
  // Calculate totals
  const calculateTotals = () => {
    const subtotal = selectedItems.reduce((total, item) => {
      const price = item.discountedPrice || item.price;
      return total + (price * item.quantity);
    }, 0);

    const shipping = subtotal > 50 ? 0 : 5.99;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;

    return { subtotal, shipping, tax, total };
  };

  const totals = calculateTotals();
  const allSelected = allItems.length > 0 && selectedItems.length === allItems.length;
  const selectedCount = selectedItems.length;

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="p-6">
        {/* Select All */}
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="select-all"
            checked={allSelected}
            onChange={(e) => onSelectAll(e.target.checked)}
            className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <label htmlFor="select-all" className="ml-3 text-sm text-gray-700">
            Select all items ({selectedCount} selected)
          </label>
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal ({selectedCount} items)</span>
              <span className="font-medium">${totals.subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className={`font-medium ${totals.shipping === 0 ? 'text-green-600' : ''}`}>
                {totals.shipping === 0 ? 'FREE' : `$${totals.shipping.toFixed(2)}`}
              </span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Estimated Tax</span>
              <span className="font-medium">${totals.tax.toFixed(2)}</span>
            </div>
            
            <div className="border-t pt-3">
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>${totals.total.toFixed(2)}</span>
              </div>
              {totals.subtotal < 50 && (
                <div className="mt-2 text-sm text-green-600">
                  Add ${(50 - totals.subtotal).toFixed(2)} more for FREE shipping!
                </div>
              )}
            </div>
          </div>

          {/* Promo Code */}
          <div className="mt-6">
            <label htmlFor="promo-code" className="block text-sm font-medium text-gray-700 mb-2">
              Promo Code
            </label>
            <div className="flex">
              <input
                type="text"
                id="promo-code"
                placeholder="Enter code"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-gray-100 text-gray-700 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200">
                Apply
              </button>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={onCheckout}
            disabled={selectedCount === 0}
            className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Proceed to Checkout ({selectedCount} items)
          </button>

          {/* Payment Methods */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 mb-2">We accept</p>
            <div className="flex justify-center space-x-4">
              <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-xs font-semibold">VISA</span>
              </div>
              <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-xs font-semibold">MC</span>
              </div>
              <div className="h-8 w-12 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-xs font-semibold">PP</span>
              </div>
            </div>
          </div>

          {/* Security Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Secure SSL Encryption</span>
            </div>
            <p className="mt-2 text-xs text-gray-500 text-center">
              Your payment information is secure and encrypted
            </p>
          </div>

          {/* Continue Shopping */}
          <div className="mt-6 text-center">
            <Link
              to="/products"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

CartSummary.propTypes = {
  selectedItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      price: PropTypes.number.isRequired,
      discountedPrice: PropTypes.number,
      quantity: PropTypes.number.isRequired
    })
  ),
  allItems: PropTypes.array.isRequired,
  onSelectAll: PropTypes.func.isRequired,
  onCheckout: PropTypes.func.isRequired
};

CartSummary.defaultProps = {
  selectedItems: []
};

export default CartSummary;