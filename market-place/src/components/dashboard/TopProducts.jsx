import React from 'react';

const TopProducts = () => {
  const products = [
    { name: 'Wireless Headphones', sales: 234, revenue: '$4,680', rating: 4.8 },
    { name: 'Smart Watch', sales: 189, revenue: '$5,670', rating: 4.6 },
    { name: 'Laptop Stand', sales: 156, revenue: '$1,872', rating: 4.9 },
    { name: 'Phone Case', sales: 142, revenue: '$1,136', rating: 4.7 },
    { name: 'Desk Lamp', sales: 128, revenue: '$2,560', rating: 4.5 },
  ];

  return (
    <div className="top-products">
      <div className="products-header">
        <h3>Top Selling Products</h3>
        <button className="view-all-btn">View All</button>
      </div>
      
      <div className="products-list">
        {products.map((product, index) => (
          <div key={index} className="product-item">
            <div className="product-info">
              <div className="product-rank">{index + 1}</div>
              <div className="product-details">
                <h4 className="product-name">{product.name}</h4>
                <div className="product-stats">
                  <span className="product-sales">{product.sales} sold</span>
                  <span className="product-revenue">{product.revenue}</span>
                </div>
              </div>
            </div>
            
            <div className="product-rating">
              <span className="rating-stars">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </span>
              <span className="rating-value">{product.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;