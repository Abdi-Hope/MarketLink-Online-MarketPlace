import React from "react";

const SellerAnalytics = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Analytics</h1>
        <p className="text-gray-600 mt-2">Track your sales and performance</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm text-gray-500 mb-2">Total Revenue</div>
          <div className="text-2xl font-bold text-gray-800">$12,540.75</div>
          <div className="text-sm text-green-600 mt-1">+12.5% from last month</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm text-gray-500 mb-2">Total Orders</div>
          <div className="text-2xl font-bold text-gray-800">154</div>
          <div className="text-sm text-green-600 mt-1">+8.2% from last month</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="text-sm text-gray-500 mb-2">Conversion Rate</div>
          <div className="text-2xl font-bold text-gray-800">42%</div>
          <div className="text-sm text-green-600 mt-1">+5.3% from last month</div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-6">Sales Overview</h3>
        <div className="text-center py-12">
          <div className="text-4xl mb-4"></div>
          <p className="text-gray-600">Detailed analytics and charts will be displayed here.</p>
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerAnalytics;
