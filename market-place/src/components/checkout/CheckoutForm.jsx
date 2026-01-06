import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CheckoutForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    
    // Billing
    sameAsShipping: true,
    billingFirstName: '',
    billingLastName: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZipCode: '',
    
    // Payment
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    saveCard: false,
    
    // Shipping method
    shippingMethod: 'standard',
  });

  const shippingMethods = [
    { id: 'standard', name: 'Standard Shipping', price: 5.99, time: '5-7 business days' },
    { id: 'express', name: 'Express Shipping', price: 12.99, time: '2-3 business days' },
    { id: 'nextday', name: 'Next Day', price: 24.99, time: '1 business day' },
    { id: 'pickup', name: 'Store Pickup', price: 0, time: 'Ready in 1 hour' },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // If same as shipping is checked, copy shipping to billing
    if (name === 'sameAsShipping' && checked) {
      setFormData(prev => ({
        ...prev,
        billingFirstName: prev.firstName,
        billingLastName: prev.lastName,
        billingAddress: prev.address,
        billingCity: prev.city,
        billingState: prev.state,
        billingZipCode: prev.zipCode,
      }));
    }
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order submitted:', formData);
    alert('Order placed successfully!');
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Shipping Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Address *
        </label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City *
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State *
          </label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ZIP Code *
          </label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Shipping Method</h3>
      
      <div className="space-y-3">
        {shippingMethods.map((method) => (
          <label
            key={method.id}
            className={`flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
              formData.shippingMethod === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}
          >
            <input
              type="radio"
              name="shippingMethod"
              value={method.id}
              checked={formData.shippingMethod === method.id}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600"
            />
            <div className="ml-3 flex-1">
              <div className="flex justify-between">
                <span className="font-medium">{method.name}</span>
                <span className="font-bold">
                  {method.price === 0 ? 'FREE' : `$${method.price}`}
                </span>
              </div>
              <p className="text-sm text-gray-500">{method.time}</p>
            </div>
          </label>
        ))}
      </div>

      <div className="pt-6 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Address</h3>
        
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="sameAsShipping"
            name="sameAsShipping"
            checked={formData.sameAsShipping}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 rounded"
          />
          <label htmlFor="sameAsShipping" className="ml-2 text-sm text-gray-700">
            Same as shipping address
          </label>
        </div>

        {!formData.sameAsShipping && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="billingFirstName"
                  value={formData.billingFirstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="billingLastName"
                  value={formData.billingLastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                name="billingAddress"
                value={formData.billingAddress}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="billingCity"
                  value={formData.billingCity}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  name="billingState"
                  value={formData.billingState}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  name="billingZipCode"
                  value={formData.billingZipCode}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Payment Information</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card Number *
          </label>
          <div className="relative">
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              className="w-full px-3 py-2 border border-gray-300 rounded-md pl-10"
              maxLength="19"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name on Card *
          </label>
          <input
            type="text"
            name="cardName"
            value={formData.cardName}
            onChange={handleChange}
            placeholder="John Smith"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date *
            </label>
            <input
              type="text"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              placeholder="MM/YY"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CVV *
            </label>
            <div className="relative">
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="123"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                maxLength="4"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="saveCard"
            name="saveCard"
            checked={formData.saveCard}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 rounded"
          />
          <label htmlFor="saveCard" className="ml-2 text-sm text-gray-700">
            Save card for future purchases
          </label>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="pt-6 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Or pay with</h4>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <svg className="w-6 h-6 mr-2" viewBox="0 0 24 24">
              <path fill="#FFC439" d="M6.622 16.724c-.14-.453.264-.698.585-.775 1.58-.38 2.67-.52 4.296-.616 1.6-.094 2.756.012 4.18.284.348.067.726.28.595.745-.135.478-.73.837-1.217.925-1.523.28-3.025.35-4.558.294-1.497-.055-2.903-.185-4.404-.48a1.268 1.268 0 01-1.077-.377z"/>
              <path fill="#293688" d="M9.286 4.196c.77-.21 1.593-.277 2.37-.29 1.5-.024 3.01.18 4.445.57.76.206 1.49.514 2.14.93.64.408 1.18.948 1.56 1.62.34.6.5 1.29.48 1.98-.02.86-.25 1.7-.68 2.44-.38.66-.91 1.22-1.55 1.65-.63.42-1.35.71-2.1.86-1.5.3-3.05.32-4.56.1-1.2-.18-2.37-.53-3.45-1.05-.29-.14-.57-.3-.83-.48-.1-.07-.2-.14-.3-.22a.8.8 0 01-.27-.32c-.08-.17-.02-.37.14-.46.16-.09.36-.03.46.13.23.31.51.58.82.81 1.12.81 2.43 1.32 3.8 1.5 1.63.22 3.29.15 4.9-.2 1.38-.3 2.67-.94 3.7-1.87 1.03-.93 1.77-2.15 2.1-3.5.18-.74.19-1.51.06-2.26-.13-.75-.44-1.46-.9-2.06-.46-.6-1.06-1.08-1.75-1.4-.7-.32-1.47-.46-2.24-.5-1.5-.06-3.01.17-4.42.66-.82.28-1.6.67-2.32 1.15-.23.15-.45.32-.66.5-.1.08-.2.17-.3.26a.47.47 0 01-.32.12c-.18 0-.33-.15-.33-.33 0-.09.03-.18.1-.25.23-.22.47-.42.73-.6.9-.63 1.9-1.1 2.96-1.39z"/>
              <path fill="#293688" d="M7.516 9.926c0 .73.59 1.32 1.32 1.32.73 0 1.32-.59 1.32-1.32 0-.73-.59-1.32-1.32-1.32-.73 0-1.32.59-1.32 1.32z"/>
              <path fill="#FFC439" d="M19.76 12.346c.1-.35-.2-.6-.52-.65-1.28-.23-2.58-.28-3.87-.2-1.26.08-2.5.3-3.71.63-.38.1-.77.27-1.04.57-.27.3-.34.71-.2 1.08.14.38.5.66.9.72 1.24.2 2.5.26 3.75.2 1.22-.06 2.44-.22 3.64-.5.38-.09.74-.32.9-.68.16-.36.1-.78-.15-1.07z"/>
            </svg>
            <span className="font-medium">PayPal</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <svg className="w-6 h-6 mr-2" fill="#000000" viewBox="0 0 24 24">
              <path d="M7 9H2V7h5v2zm0 3H2v2h5v-2zm13.59 7l-3.83-3.83c-.8.52-1.74.83-2.76.83-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.02-.31 1.96-.83 2.75L22 17.59 20.59 19zM17 11c0-1.65-1.35-3-3-3s-3 1.35-3 3 1.35 3 3 3 3-1.35 3-3zM2 19h10v-2H2v2z"/>
            </svg>
            <span className="font-medium">Google Pay</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {[1, 2, 3].map((stepNum) => (
          <React.Fragment key={stepNum}>
            <div className="flex flex-col items-center">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                step === stepNum ? 'bg-blue-600 text-white' :
                step > stepNum ? 'bg-green-600 text-white' :
                'bg-gray-200 text-gray-600'
              }`}>
                {step > stepNum ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              <span className="mt-2 text-sm">
                {stepNum === 1 && 'Shipping'}
                {stepNum === 2 && 'Billing'}
                {stepNum === 3 && 'Payment'}
              </span>
            </div>
            {stepNum < 3 && (
              <div className={`flex-1 h-1 mx-4 ${
                step > stepNum ? 'bg-green-600' : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow border border-gray-200">
      <div className="p-6">
        {renderStepIndicator()}
        
        <form onSubmit={handleSubmit}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}

          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
              >
                ← Back
              </button>
            ) : (
              <Link
                to="/cart"
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
              >
                ← Return to Cart
              </Link>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              >
                Continue →
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
              >
                Place Order
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;