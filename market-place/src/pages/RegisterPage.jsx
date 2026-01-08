// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeTerms: false,
    newsletter: true,
    accountType: 'buyer'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const accountTypes = [
    { id: 'buyer', title: 'Buyer', icon: '🛒', description: 'Shop for products and services' },
    { id: 'seller', title: 'Seller', icon: '🏪', description: 'Sell products and grow your business' },
    { id: 'both', title: 'Both', icon: '🔄', description: 'Buy and sell on the platform' },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateEmail = (email) => {
    if (!email.trim()) return 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) return 'Email is invalid';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return 'Password must include uppercase, lowercase, and number';
    }
    return '';
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate required fields
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    // Validate email
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    
    // Validate password
    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;
    
    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Validate terms agreement
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and privacy policy';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Registration data:', formData);
      setIsSubmitting(false);
      alert('Registration successful! Redirecting to login...');
      navigate('/login');
    }, 1500);
  };

  const getPasswordStrengthInfo = (password) => {
    if (!password) return { strength: 0, label: 'None', color: 'bg-gray-200' };
    
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 25;
    
    let label = 'Weak';
    let color = 'bg-red-500';
    if (strength >= 50) { label = 'Fair'; color = 'bg-yellow-500'; }
    if (strength >= 75) { label = 'Good'; color = 'bg-blue-500'; }
    if (strength === 100) { label = 'Strong'; color = 'bg-green-500'; }
    
    return { strength, label, color };
  };

  const getStrengthLabelColor = (label) => {
    switch (label) {
      case 'Weak': return 'text-red-600';
      case 'Fair': return 'text-yellow-600';
      case 'Good': return 'text-blue-600';
      case 'Strong': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const pwdStrength = getPasswordStrengthInfo(formData.password);
  const strengthLabelColor = getStrengthLabelColor(pwdStrength.label);

  const socialLoginButtons = [
    { id: 'facebook', label: 'Facebook', icon: 'f', color: 'text-blue-600' },
    { id: 'google', label: 'Google', icon: 'G', color: 'text-red-500' },
    { id: 'apple', label: 'Apple', icon: 'A', color: 'text-black' },
  ];

  const benefits = [
    { icon: '🛡️', title: 'Secure Transactions', desc: 'Protected payments and data encryption' },
    { icon: '🚚', title: 'Fast Shipping', desc: 'Reliable delivery with tracking' },
    { icon: '👑', title: 'Exclusive Deals', desc: 'Member-only discounts and offers' },
    { icon: '💬', title: '24/7 Support', desc: 'Round-the-clock customer service' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <div className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Left Side - Registration Form */}
          <div className="lg:w-2/3 p-8 md:p-12">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                Create Your Account
              </h1>
              <p className="text-gray-600">
                Join thousands of users on our marketplace
              </p>
            </div>

            {/* Account Type Selection */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Account Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {accountTypes.map(type => (
                  <label
                    key={type.id}
                    className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all ${
                      formData.accountType === type.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="accountType"
                      value={type.id}
                      checked={formData.accountType === type.id}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="flex flex-col items-center text-center">
                      <span className="text-2xl mb-2">{type.icon}</span>
                      <span className="font-bold text-gray-800">{type.title}</span>
                      <span className="text-sm text-gray-500 mt-1">{type.description}</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Phone (Optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-gray-500">(Optional)</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
                
                {/* Password Strength */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Password strength:</span>
                      <span className={`font-medium ${strengthLabelColor}`}>
                        {pwdStrength.label}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${pwdStrength.color} transition-all duration-300`}
                        style={{ width: `${pwdStrength.strength}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Include uppercase, lowercase, numbers, and at least 8 characters
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password *
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Checkboxes */}
              <div className="space-y-4">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className={`mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${
                      errors.agreeTerms ? 'border-red-500' : ''
                    }`}
                  />
                  <div>
                    <span className="text-gray-700">
                      I agree to the{' '}
                      <Link to="/terms" className="text-blue-600 hover:text-blue-800 font-medium">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-blue-600 hover:text-blue-800 font-medium">
                        Privacy Policy
                      </Link>
                      *
                    </span>
                    {errors.agreeTerms && (
                      <p className="mt-1 text-sm text-red-600">{errors.agreeTerms}</p>
                    )}
                  </div>
                </label>

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleChange}
                    className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">
                    Yes, I want to receive marketing emails and updates
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>

              {/* Login Link */}
              <div className="text-center pt-4">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Right Side - Benefits */}
          <div className="lg:w-1/3 bg-gradient-to-b from-blue-600 to-indigo-700 text-white p-8 md:p-12">
            <div className="h-full flex flex-col justify-center">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Join Us?</h2>
                <p className="text-blue-100">
                  Discover the benefits of being part of our marketplace community
                </p>
              </div>

              <div className="space-y-6 mb-8">
                {benefits.map(benefit => (
                  <div key={benefit.title} className="flex items-start space-x-3">
                    <span className="text-2xl">{benefit.icon}</span>
                    <div>
                      <h4 className="font-bold text-lg">{benefit.title}</h4>
                      <p className="text-blue-200 text-sm">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-auto pt-8 border-t border-blue-500">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">50K+</div>
                    <div className="text-sm text-blue-200">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">10K+</div>
                    <div className="text-sm text-blue-200">Sellers</div>
                  </div>
                </div>
                <p className="text-center text-blue-200 text-sm mt-4">
                  Join our growing community today!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Login Options */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Or sign up with</p>
          <div className="flex justify-center space-x-4">
            {socialLoginButtons.map(button => (
              <button
                key={button.id}
                className="p-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="flex items-center space-x-2">
                  <span className={`${button.color}`}>{button.icon}</span>
                  <span className="text-gray-700">{button.label}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;