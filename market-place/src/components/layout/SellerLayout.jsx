// src/components/layout/SellerLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const SellerLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg border-r">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Seller Center</h2>
          <p className="text-gray-500 text-sm mt-1">Manage Your Store</p>
        </div>
        
        <nav className="p-4 space-y-1">
          <Link 
            to="/seller" 
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition"
          >
            <span>📊</span>
            <span>Dashboard</span>
          </Link>
          
          <Link 
            to="/seller/products" 
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition"
          >
            <span>🛍️</span>
            <span>Products</span>
          </Link>
          
          <Link 
            to="/seller/orders" 
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition"
          >
            <span>📦</span>
            <span>Orders</span>
          </Link>
          
          <Link 
            to="/seller/analytics" 
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition"
          >
            <span>📈</span>
            <span>Analytics</span>
          </Link>
          
          <Link 
            to="/seller/settings" 
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition"
          >
            <span>⚙️</span>
            <span>Store Settings</span>
          </Link>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export default SellerLayout;