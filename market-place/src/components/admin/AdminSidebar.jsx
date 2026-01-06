// src/components/admin/AdminSidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Add this import

const AdminSidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <p className="text-gray-400 text-sm">MarketPlace Administration</p>
      </div>
      
      <nav className="space-y-2">
        {/* Replace all <a> with <Link> */}
        <Link to="/admin" className="block p-2 rounded hover:bg-gray-800">Dashboard</Link>
        <Link to="/admin/users" className="block p-2 rounded hover:bg-gray-800">Users</Link>
        <Link to="/admin/products" className="block p-2 rounded hover:bg-gray-800">Products</Link>
        <Link to="/admin/orders" className="block p-2 rounded hover:bg-gray-800">Orders</Link>
        <Link to="/admin/reports" className="block p-2 rounded hover:bg-gray-800">Reports</Link>
        <Link to="/admin/settings" className="block p-2 rounded hover:bg-gray-800">Settings</Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;
