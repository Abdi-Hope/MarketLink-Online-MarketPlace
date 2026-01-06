import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutPage = () => {
  const cartItems = [
    { id: 1, name: 'Wireless Headphones', price: 99.99, quantity: 1 },
    { id: 2, name: 'Phone Case', price: 24.99, quantity: 2 },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>
        
        <div className="checkout-steps">
          <div className="checkout-step active">Cart</div>
          <div className="checkout-step active">Information</div>
          <div className="checkout-step active">Shipping</div>
          <div className="checkout-step">Payment</div>
        </div>

        <div className="checkout-content">
          <div className="checkout-form-section">
            <h2>Shipping Information</h2>
            <form className="checkout-form">
              <div className="form-row">
                <input type="text" placeholder="First Name" required />
                <input type="text" placeholder="Last Name" required />
              </div>
              <input type="email" placeholder="Email Address" required />
              <input type="text" placeholder="Address" required />
              <div className="form-row">
                <input type="text" placeholder="City" required />
                <input type="text" placeholder="State" required />
                <input type="text" placeholder="ZIP Code" required />
              </div>
              <input type="tel" placeholder="Phone Number" required />
            </form>

            <h2>Payment Method</h2>
            <div className="payment-methods">
              <label className="payment-method">
                <input type="radio" name="payment" defaultChecked />
                <span>Credit/Debit Card</span>
              </label>
              <label className="payment-method">
                <input type="radio" name="payment" />
                <span>PayPal</span>
              </label>
              <label className="payment-method">
                <input type="radio" name="payment" />
                <span>Bank Transfer</span>
              </label>
            </div>
          </div>

          <div className="checkout-summary">
            <h2>Order Summary</h2>
            <div className="order-items">
              {cartItems.map(item => (
                <div key={item.id} className="order-item">
                  <span className="item-name">{item.name} × {item.quantity}</span>
                  <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="total-row">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="total-row grand-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button className="place-order-btn">Place Order</button>
            <p className="secure-checkout">
              🔒 Secure checkout. Your information is safe with us.
            </p>
            <Link to="/cart" className="back-to-cart">Back to Cart</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;