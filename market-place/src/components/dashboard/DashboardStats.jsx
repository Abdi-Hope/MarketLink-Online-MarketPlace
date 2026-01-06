import React from 'react';

const DashboardStats = () => {
  const stats = [
    { title: 'Total Revenue', value: '$12,548', change: '+12.5%', icon: '💰' },
    { title: 'Total Orders', value: '342', change: '+8.2%', icon: '📦' },
    { title: 'Active Products', value: '56', change: '+3.1%', icon: '📊' },
    { title: 'Customer Rating', value: '4.8/5', change: '+0.2', icon: '⭐' },
  ];

  return (
    <div className="dashboard-stats">
      <h2 className="dashboard-stats-title">Overview</h2>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-header">
              <div className="stat-icon">{stat.icon}</div>
              <span className="stat-change positive">{stat.change}</span>
            </div>
            <h3 className="stat-value">{stat.value}</h3>
            <p className="stat-title">{stat.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;