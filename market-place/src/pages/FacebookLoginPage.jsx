import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const FacebookLoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get('role') || 'buyer';

  const handleDisabledLogin = () => {
    toast.error('Facebook login is currently unavailable.');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-xl overflow-hidden">

        {/* Header */}
        <div className="p-8 text-center border-b border-gray-100">
          <div className="flex justify-center mb-4">
            <svg className="w-12 h-12" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </div>

          <h1 className="text-2xl font-semibold text-gray-800">
            Facebook Login Disabled
          </h1>
          <p className="text-gray-500 mt-2">
            This feature is currently unavailable
          </p>
        </div>

        {/* Body */}
        <div className="p-8">
          <button
            onClick={handleDisabledLogin}
            className="w-full px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span>Continue with Facebook</span>
          </button>

          <div className="mt-6 text-sm text-gray-600 text-center">
            Facebook authentication has been disabled due to compatibility issues.
          </div>

          <div className="flex justify-center pt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
            >
              ← Back
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-4 bg-gray-50 flex justify-between text-xs text-gray-500">
          <div>English (US)</div>
          <div className="flex space-x-4">
            <span>Help</span>
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FacebookLoginPage;
