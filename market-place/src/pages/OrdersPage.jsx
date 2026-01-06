import React, { useState } from 'react';

const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  const orders = [
    { id: '#ORD-001', date: '2024-01-15', total: '$245.99', status: 'Delivered', items: 3 },
    { id: '#ORD-002', date: '2024-01-14', total: '$129.50', status: 'Processing', items: 1 },
    { id: '#ORD-003', date: '2024-01-13', total: '$89.99', status: 'Shipped', items: 2 },
    { id: '#ORD-004', date: '2024-01-12', total: '$356.75', status: 'Pending', items: 4 },
    { id: '#ORD-005', date: '2024-01-11', total: '$199.99', status: 'Delivered', items: 1 },
  ];

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    return order.status.toLowerCase() === activeTab.toLowerCase();
  });

  const getStatusClass = (status) => {
    switch (status) {
      case 'Delivered': return 'status-delivered';
      case 'Processing': return 'status-processing';
      case 'Shipped': return 'status-shipped';
      case 'Pending': return 'status-pending';
      default: return '';
    }
  };

  return (
    <div className="orders-page">
      <div className="page-header">
        <h1>My Orders</h1>
        <p>Track and manage your orders</p>
      </div>

      <div className="orders-tabs">
        <button 
          className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
          onClick={() => setActiveTab('all')}
        >
          All Orders
        </button>
        <button 
          className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending
        </button>
        <button 
          className={`tab-btn ${activeTab === 'processing' ? 'active' : ''}`}
          onClick={() => setActiveTab('processing')}
        >
          Processing
        </button>
        <button 
          className={`tab-btn ${activeTab === 'shipped' ? 'active' : ''}`}
          onClick={() => setActiveTab('shipped')}
        >
          Shipped
        </button>
        <button 
          className={`tab-btn ${activeTab === 'delivered' ? 'active' : ''}`}
          onClick={() => setActiveTab('delivered')}
        >
          Delivered
        </button>
      </div>

      <div className="orders-container">
        {filteredOrders.map(order => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <div className="order-info">
                <h3 className="order-id">{order.id}</h3>
                <span className="order-date">Ordered on {order.date}</span>
              </div>
              <div className="order-status">
                <span className={`status-badge ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </div>
            </div>

            <div className="order-details">
              <div className="order-total">
                <span>Total Amount:</span>
                <strong>{order.total}</strong>
              </div>
              <div className="order-items-count">
                <span>Items:</span>
                <strong>{order.items}</strong>
              </div>
            </div>

            <div className="order-actions">
              <button className="btn btn-outline">View Details</button>
              <button className="btn btn-primary">Track Order</button>
              {order.status === 'Delivered' && (
                <button className="btn btn-secondary">Reorder</button>
              )}
              {order.status === 'Pending' && (
                <button className="btn btn-danger">Cancel Order</button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="no-orders">
          <p>No orders found for this filter.</p>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;