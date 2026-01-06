// src/components/layout/AdminLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <p className="text-gray-400 text-sm mt-1">MarketPlace Admin</p>
        </div>
        
        <nav className="p-4 space-y-1">
          <Link 
            to="/admin" 
            className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition"
          >
            <span>📊</span>
            <span>Dashboard</span>
          </Link>
          
          <Link 
            to="/admin/users" 
            className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition"
          >
            <span>👥</span>
            <span>Users</span>
          </Link>
          
          <Link 
            to="/admin/products" 
            className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition"
          >
            <span>🛍️</span>
            <span>Products</span>
          </Link>
          
          <Link 
            to="/admin/orders" 
            className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition"
          >
            <span>📋</span>
            <span>Orders</span>
          </Link>
          
          <Link 
            to="/admin/reports" 
            className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition"
          >
            <span>📈</span>
            <span>Reports</span>
          </Link>
          
          <Link 
            to="/admin/settings" 
            className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition"
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

export default AdminLayout;