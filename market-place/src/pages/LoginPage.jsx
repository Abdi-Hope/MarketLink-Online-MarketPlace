// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth'; // Import from useAuth.jsx
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Get the page they wanted to go to before login
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }

    try {
      // Call the login function from useAuth
      const result = await login(email, password);

      console.log('Login result:', result);

      // Check if result exists and has success property
      if (result && result.success === true) {
        // Redirect based on role or where they came from
        let targetPath = from;

        // If they just came from standard login (no specific return path), use role-based defaults
        if (from === '/dashboard') {
          if (result.role === 'admin') targetPath = '/admin';
          else if (result.role === 'seller') targetPath = '/seller';
          else targetPath = '/dashboard';
        }

        navigate(targetPath, { replace: true });
      } else {
        // Handle error - check for different possible error fields
        const errorMessage = result?.message || result?.error || 'Login failed. Please try again.';
        setError(errorMessage);
      }
    } catch (err) {
      console.error('Login catch error:', err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center py-12 px-4 font-sans">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-200 rotate-3">
            <span className="text-white text-3xl font-black italic">ML</span>
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">MarketLink</h1>
          <p className="text-gray-500 mt-3 font-medium">Securely sign in to your marketplace account</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-100/50 p-10 border border-blue-50 relative overflow-hidden">
          {/* Decorative Blob */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-50"></div>

          <form onSubmit={handleSubmit} className="relative z-10">
            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-gray-900 text-xs font-black uppercase tracking-widest mb-3 ml-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-blue-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none font-bold text-gray-700 transition-all"
                  placeholder="Enter your email"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3 mx-1">
                <label className="block text-gray-900 text-xs font-black uppercase tracking-widest">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-blue-600 font-black hover:text-blue-800 transition-colors"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-blue-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none font-bold text-gray-700 transition-all"
                  placeholder="Your secure password"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-600 transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center mb-8 ml-1">
              <input
                type="checkbox"
                id="remember"
                className="h-5 w-5 text-blue-600 focus:ring-blue-600 border-none bg-gray-50 rounded-lg cursor-pointer"
                disabled={loading}
              />
              <label htmlFor="remember" className="ml-3 block text-sm text-gray-600 font-bold select-none cursor-pointer">
                Stay signed in
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-xs font-black flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-2xl font-black hover:bg-blue-700 shadow-xl shadow-blue-100 focus:ring-4 focus:ring-blue-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Authenticating...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In
                </span>
              )}
            </button>
          </form>

          {/* Registration Prompt */}
          <div className="mt-10 pt-8 border-t border-gray-50 text-center relative z-10">
            <p className="text-gray-500 font-medium">
              New to MarketLink?{' '}
              <Link
                to="/register"
                className="text-blue-600 hover:text-blue-800 font-black"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;