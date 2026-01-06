import React, { useState } from 'react';

const ProductApproval = () => {
  const [pendingProducts, setPendingProducts] = useState([
    { id: 1, name: 'Wireless Earbuds Pro', seller: 'TechGadgets', price: 89.99, submitted: '2 hours ago' },
    { id: 2, name: 'Organic Cotton T-Shirt', seller: 'EcoWear', price: 24.99, submitted: '5 hours ago' },
    { id: 3, name: 'Smart Home Camera', seller: 'SecureHome', price: 129.99, submitted: '1 day ago' },
    { id: 4, name: 'Yoga Mat Premium', seller: 'FitLife', price: 34.99, submitted: '2 days ago' },
  ]);

  const handleApprove = (id) => {
    setPendingProducts(products => products.filter(p => p.id !== id));
    alert(`Product ${id} approved!`);
  };

  const handleReject = (id) => {
    setPendingProducts(products => products.filter(p => p.id !== id));
    alert(`Product ${id} rejected!`);
  };

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Pending Product Approvals</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Product</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Seller</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Price</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Submitted</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingProducts.map((product) => (
              <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="font-medium text-gray-900">{product.name}</div>
                </td>
                <td className="py-4 px-4 text-gray-600">{product.seller}</td>
                <td className="py-4 px-4 font-medium">${product.price}</td>
                <td className="py-4 px-4 text-gray-500 text-sm">{product.submitted}</td>
                <td className="py-4 px-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleApprove(product.id)}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm font-medium hover:bg-green-200"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(product.id)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm font-medium hover:bg-red-200"
                    >
                      Reject
                    </button>
                    <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm font-medium hover:bg-gray-200">
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {pendingProducts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No pending products for approval
        </div>
      )}
    </div>
  );
};

export default ProductApproval;