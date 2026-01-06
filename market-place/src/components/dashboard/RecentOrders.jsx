import React from 'react';

const RecentOrders = () => {
  const orders = [
    { id: '#ORD-001', customer: 'John Smith', amount: '$245.99', status: 'Delivered', date: '2024-01-15' },
    { id: '#ORD-002', customer: 'Emma Johnson', amount: '$129.50', status: 'Processing', date: '2024-01-14' },
    { id: '#ORD-003', customer: 'Michael Brown', amount: '$89.99', status: 'Shipped', date: '2024-01-13' },
    { id: '#ORD-004', customer: 'Sarah Davis', amount: '$356.75', status: 'Pending', date: '2024-01-12' },
    { id: '#ORD-005', customer: 'Robert Wilson', amount: '$199.99', status: 'Delivered', date: '2024-01-11' },
  ];

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
    <div className="recent-orders">
      <div className="orders-header">
        <h3>Recent Orders</h3>
        <button className="view-all-btn">View All</button>
      </div>
      
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.amount}</td>
                <td>
                  <span className={`status-badge ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td>{order.date}</td>
                <td>
                  <button className="action-btn view-btn">View</button>
                  <button className="action-btn edit-btn">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;