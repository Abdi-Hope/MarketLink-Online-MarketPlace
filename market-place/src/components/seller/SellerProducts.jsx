import React from "react";

const SellerProducts = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Products</h1>
        <p className="text-gray-600 mt-2">Manage your product listings</p>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            + Add New Product
          </button>
          <div className="text-gray-500">
            Showing 24 products
          </div>
        </div>
        
        <div className="text-center py-12">
          <div className="text-4xl mb-4"></div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Product Management</h3>
          <p className="text-gray-600">Add, edit, and manage your product listings here.</p>
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Create Your First Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerProducts;
