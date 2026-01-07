import React from "react";

const SellerOrders = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Orders</h1>
        <p className="text-gray-600 mt-2">Manage customer orders</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              All Orders
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Pending
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Completed
            </button>
          </div>
          <div className="text-gray-500">
            7 pending orders
          </div>
        </div>
        
        <div className="text-center py-12">
          <div className="text-4xl mb-4"></div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Order Management</h3>
          <p className="text-gray-600">View and manage all customer orders from here.</p>
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            View Sample Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerOrders;
