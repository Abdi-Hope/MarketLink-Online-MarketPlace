import React from 'react';

const SalesChart = () => {
  // Mock data for the chart
  const chartData = [
    { month: 'Jan', sales: 4000 },
    { month: 'Feb', sales: 3000 },
    { month: 'Mar', sales: 5000 },
    { month: 'Apr', sales: 4500 },
    { month: 'May', sales: 6000 },
    { month: 'Jun', sales: 5500 },
    { month: 'Jul', sales: 7000 },
  ];

  const maxSales = Math.max(...chartData.map(d => d.sales));

  return (
    <div className="sales-chart">
      <div className="chart-header">
        <h3>Sales Overview</h3>
        <select className="period-select">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
          <option>Last year</option>
        </select>
      </div>
      
      <div className="chart-container">
        <div className="chart-y-axis">
          <span>${maxSales}</span>
          <span>${maxSales/2}</span>
          <span>$0</span>
        </div>
        
        <div className="chart-bars">
          {chartData.map((data, index) => {
            const height = (data.sales / maxSales) * 100;
            return (
              <div key={index} className="chart-bar-container">
                <div 
                  className="chart-bar" 
                  style={{ height: `${height}%` }}
                  title={`$${data.sales}`}
                ></div>
                <span className="chart-label">{data.month}</span>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="chart-stats">
        <div className="chart-stat">
          <span className="stat-label">Total Sales</span>
          <span className="stat-value">$35,500</span>
        </div>
        <div className="chart-stat">
          <span className="stat-label">Average Order</span>
          <span className="stat-value">$124.56</span>
        </div>
        <div className="chart-stat">
          <span className="stat-label">Growth</span>
          <span className="stat-value positive">+15.3%</span>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;