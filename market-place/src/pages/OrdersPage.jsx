import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const orders = [
    { 
      id: '#ORD-001', 
      date: '2024-01-15', 
      total: 245.99, 
      status: 'Delivered', 
      items: 3,
      shippingAddress: '123 Main St, New York, NY 10001',
      paymentMethod: 'Credit Card (**** 1234)',
      trackingNumber: 'TRK123456789',
      products: [
        { id: 1, name: 'Wireless Headphones', price: 129.99, quantity: 1, image: '🎧' },
        { id: 2, name: 'Phone Case', price: 19.99, quantity: 2, image: '📱' },
      ]
    },
    { 
      id: '#ORD-002', 
      date: '2024-01-14', 
      total: 129.5, 
      status: 'Processing', 
      items: 1,
      shippingAddress: '456 Oak Ave, Los Angeles, CA 90001',
      paymentMethod: 'PayPal',
      trackingNumber: 'TRK987654321',
      products: [
        { id: 3, name: 'Smart Watch', price: 129.5, quantity: 1, image: '⌚' },
      ]
    },
    { 
      id: '#ORD-003', 
      date: '2024-01-13', 
      total: 89.99, 
      status: 'Shipped', 
      items: 2,
      shippingAddress: '789 Pine Rd, Chicago, IL 60601',
      paymentMethod: 'Credit Card (**** 5678)',
      trackingNumber: 'TRK456789123',
      products: [
        { id: 4, name: 'Laptop Backpack', price: 59.99, quantity: 1, image: '🎒' },
        { id: 5, name: 'USB Cable', price: 15, quantity: 2, image: '🔌' },
      ]
    },
    { 
      id: '#ORD-004', 
      date: '2024-01-12', 
      total: 356.75, 
      status: 'Pending', 
      items: 4,
      shippingAddress: '321 Elm St, Houston, TX 77001',
      paymentMethod: 'Debit Card (**** 9012)',
      trackingNumber: null,
      products: [
        { id: 6, name: 'Coffee Maker', price: 89.99, quantity: 1, image: '☕' },
        { id: 7, name: 'Desk Lamp', price: 49.99, quantity: 1, image: '💡' },
        { id: 8, name: 'Notebook Set', price: 24.99, quantity: 2, image: '📓' },
      ]
    },
    { 
      id: '#ORD-005', 
      date: '2024-01-11', 
      total: 199.99, 
      status: 'Delivered', 
      items: 1,
      shippingAddress: '654 Maple Dr, Phoenix, AZ 85001',
      paymentMethod: 'Apple Pay',
      trackingNumber: 'TRK789123456',
      products: [
        { id: 9, name: 'Tablet', price: 199.99, quantity: 1, image: '📱' },
      ]
    },
    { 
      id: '#ORD-006', 
      date: '2024-01-10', 
      total: 74.97, 
      status: 'Cancelled', 
      items: 3,
      shippingAddress: '987 Cedar Ln, Philadelphia, PA 19101',
      paymentMethod: 'Credit Card (**** 3456)',
      trackingNumber: null,
      products: [
        { id: 10, name: 'Water Bottle', price: 24.99, quantity: 3, image: '💧' },
      ]
    },
  ];

  const tabs = [
    { id: 'all', label: 'All Orders', count: orders.length },
    { id: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'Pending').length },
    { id: 'processing', label: 'Processing', count: orders.filter(o => o.status === 'Processing').length },
    { id: 'shipped', label: 'Shipped', count: orders.filter(o => o.status === 'Shipped').length },
    { id: 'delivered', label: 'Delivered', count: orders.filter(o => o.status === 'Delivered').length },
    { id: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'Cancelled').length },
  ];

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    return order.status.toLowerCase() === activeTab.toLowerCase();
  }).filter(order => {
    const hasSearchQuery = searchQuery.trim() !== '';
    if (!hasSearchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return order.id.toLowerCase().includes(searchLower) ||
           order.status.toLowerCase().includes(searchLower);
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'Processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return '✅';
      case 'Processing': return '🔄';
      case 'Shipped': return '🚚';
      case 'Pending': return '⏳';
      case 'Cancelled': return '❌';
      default: return '📦';
    }
  };

  const handleOrderAction = (orderId, action) => {
    alert(`${action} action for ${orderId}`);
    // In real app, implement API calls here
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: ${searchQuery}`);
      // In real app, implement search functionality here
    }
  };

  // Helper function to determine display text
  const getEmptyStateMessage = () => {
    const hasSearchTerm = searchQuery.trim() !== '';
    
    if (hasSearchTerm) {
      return 'Try a different search term';
    }
    
    if (activeTab !== 'all') {
      return `No ${activeTab.toLowerCase()} orders found`;
    }
    
    return 'No orders found';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">My Orders</h1>
            <p className="text-gray-600 mt-2">Track and manage your orders</p>
          </div>
          <div className="flex items-center space-x-3">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
              />
              <button type="submit" className="absolute left-3 top-2.5 text-gray-400">
                🔍
              </button>
            </form>
            <Link
              to="/products"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Total Orders</div>
            <div className="text-2xl font-bold text-gray-800">{orders.length}</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Total Spent</div>
            <div className="text-2xl font-bold text-gray-800">
              ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Pending</div>
            <div className="text-2xl font-bold text-yellow-600">
              {orders.filter(o => o.status === 'Pending').length}
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Delivered</div>
            <div className="text-2xl font-bold text-green-600">
              {orders.filter(o => o.status === 'Delivered').length}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs - Scrollable on mobile */}
      <div className="mb-6">
        <div className="flex space-x-1 overflow-x-auto scrollbar-hide pb-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span className="font-medium">{tab.label}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md"
            >
              {/* Order Header */}
              <div className="p-4 md:p-6 border-b border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-lg">{getStatusIcon(order.status)}</span>
                      <div>
                        <h3 className="font-bold text-gray-800">{order.id}</h3>
                        <p className="text-sm text-gray-500">
                          Ordered on {new Date(order.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                    <button
                      onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                      aria-label={expandedOrder === order.id ? "Hide details" : "Show details"}
                    >
                      <svg
                        className={`w-5 h-5 transform transition-transform ${
                          expandedOrder === order.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="p-4 md:p-6 border-b border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center md:text-left">
                    <div className="text-sm text-gray-500 mb-1">Total Amount</div>
                    <div className="text-xl font-bold text-gray-800">${order.total.toFixed(2)}</div>
                  </div>
                  <div className="text-center md:text-left">
                    <div className="text-sm text-gray-500 mb-1">Items</div>
                    <div className="text-xl font-bold text-gray-800">
                      {order.items} {order.items === 1 ? 'item' : 'items'}
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <div className="text-sm text-gray-500 mb-1">Payment Method</div>
                    <div className="text-sm font-medium text-gray-800">{order.paymentMethod}</div>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedOrder === order.id && (
                <div className="p-4 md:p-6 bg-gray-50 border-t border-gray-200">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Products */}
                    <div>
                      <h4 className="font-bold text-gray-800 mb-4">Order Items</h4>
                      <div className="space-y-3">
                        {order.products.map(product => (
                          <div key={product.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                                {product.image}
                              </div>
                              <div>
                                <div className="font-medium text-gray-800">{product.name}</div>
                                <div className="text-sm text-gray-500">Qty: {product.quantity}</div>
                              </div>
                            </div>
                            <div className="font-bold text-gray-800">
                              ${(product.price * product.quantity).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Info */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-gray-800 mb-2">Shipping Address</h4>
                        <p className="text-gray-600">{order.shippingAddress}</p>
                      </div>
                      {order.trackingNumber && (
                        <div>
                          <h4 className="font-bold text-gray-800 mb-2">Tracking Information</h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-gray-600">Tracking #:</span>
                            <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono">
                              {order.trackingNumber}
                            </code>
                            <button 
                              onClick={() => handleOrderAction(order.id, 'track')}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              Track Package
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="p-4 md:p-6">
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {expandedOrder === order.id ? 'Hide Details' : 'View Details'}
                  </button>
                  
                  {order.trackingNumber && (
                    <button
                      onClick={() => handleOrderAction(order.id, 'track')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Track Order
                    </button>
                  )}
                  
                  {order.status === 'Delivered' && (
                    <>
                      <button
                        onClick={() => handleOrderAction(order.id, 'reorder')}
                        className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        Reorder
                      </button>
                      <button
                        onClick={() => handleOrderAction(order.id, 'review')}
                        className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                      >
                        Write Review
                      </button>
                    </>
                  )}
                  
                  {order.status === 'Pending' && (
                    <button
                      onClick={() => handleOrderAction(order.id, 'cancel')}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Cancel Order
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleOrderAction(order.id, 'invoice')}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors ml-auto"
                  >
                    Download Invoice
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12 text-center">
            <div className="text-5xl mb-6">📦</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No orders found</h3>
            <p className="text-gray-600 mb-6">
              {getEmptyStateMessage()}
            </p>
            <Link
              to="/products"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>

      {/* Order Timeline Tips */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Order Status Timeline</h3>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Pending</span>
          </div>
          <div className="text-gray-400">→</div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Processing</span>
          </div>
          <div className="text-gray-400">→</div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Shipped</span>
          </div>
          <div className="text-gray-400">→</div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Delivered</span>
          </div>
          <div className="text-gray-400">→</div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-700">Cancelled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;