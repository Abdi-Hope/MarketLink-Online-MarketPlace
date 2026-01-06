// src/components/layout/DashboardLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg border-r">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-gray-500 text-sm mt-1">User Panel</p>
        </div>
        
        <nav className="p-4 space-y-1">
          <Link 
            to="/dashboard" 
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition"
          >
            <span>📊</span>
            <span>Overview</span>
          </Link>
          
          <Link 
            to="/dashboard/orders" 
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition"
          >
            <span>📦</span>
            <span>My Orders</span>
          </Link>
          
          <Link 
            to="/dashboard/wishlist" 
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition"
          >
            <span>❤️</span>
            <span>Wishlist</span>
          </Link>
          
          <Link 
            to="/dashboard/settings" 
            className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition"
          >
            <span>⚙️</span>
            <span>Settings</span>
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

export default DashboardLayout;