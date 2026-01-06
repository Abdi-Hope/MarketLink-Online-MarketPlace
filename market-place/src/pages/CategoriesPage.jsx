import React from 'react';

const CategoriesPage = () => {
  const categories = [
    { id: 1, name: 'Electronics', count: 245, icon: '📱' },
    { id: 2, name: 'Fashion', count: 189, icon: '👕' },
    { id: 3, name: 'Home & Garden', count: 156, icon: '🏠' },
    { id: 4, name: 'Books', count: 342, icon: '📚' },
    { id: 5, name: 'Sports', count: 98, icon: '⚽' },
    { id: 6, name: 'Beauty', count: 176, icon: '💄' },
    { id: 7, name: 'Toys', count: 134, icon: '🧸' },
    { id: 8, name: 'Automotive', count: 87, icon: '🚗' },
  ];

  return (
    <div className="categories-page">
      <div className="page-header">
        <h1>Product Categories</h1>
        <p>Browse products by category</p>
      </div>

      <div className="categories-grid">
        {categories.map(category => (
          <div key={category.id} className="category-card">
            <div className="category-icon">{category.icon}</div>
            <div className="category-content">
              <h3 className="category-name">{category.name}</h3>
              <p className="category-count">{category.count} products</p>
            </div>
            <button className="category-view-btn">View Products</button>
          </div>
        ))}
      </div>

      <div className="popular-categories">
        <h2>Popular Categories</h2>
        <div className="popular-list">
          {categories.slice(0, 4).map(category => (
            <div key={category.id} className="popular-item">
              <span>{category.icon} {category.name}</span>
              <span className="item-count">{category.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;