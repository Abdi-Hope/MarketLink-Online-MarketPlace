// src/components/cart/CartSummary.jsx
import React from 'react';
import PropTypes from 'prop-types';

const CartSummary = ({ 
  subtotal = 0, 
  shipping = 0, 
  tax = 0, 
  total = 0, 
  totalItems = 0, 
  onCheckout, 
  isCheckoutDisabled = true
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({totalItems} items)</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <button
        onClick={onCheckout}
        disabled={isCheckoutDisabled}
        className="mt-6 w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Proceed to Checkout
      </button>
      
      <p className="mt-4 text-sm text-gray-500 text-center">
        {shipping === 0 ? 'Free shipping on orders over $50!' : `Add $${(50 - subtotal).toFixed(2)} more for free shipping!`}
      </p>
    </div>
  );
};

CartSummary.propTypes = {
  subtotal: PropTypes.number,
  shipping: PropTypes.number,
  tax: PropTypes.number,
  total: PropTypes.number,
  totalItems: PropTypes.number,
  onCheckout: PropTypes.func.isRequired,
  isCheckoutDisabled: PropTypes.bool
};

CartSummary.defaultProps = {
  subtotal: 0,
  shipping: 0,
  tax: 0,
  total: 0,
  totalItems: 0,
  isCheckoutDisabled: false
};

export default CartSummary;