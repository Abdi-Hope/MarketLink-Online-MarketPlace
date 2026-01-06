import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CategoryGrid = ({ categories = [] }) => {
  const defaultCategories = [
    { id: 1, name: 'Electronics', icon: '📱', count: 245, color: 'bg-blue-100', link: '/category/electronics' },
    { id: 2, name: 'Fashion', icon: '👕', count: 189, color: 'bg-pink-100', link: '/category/fashion' },
    { id: 3, name: 'Home & Garden', icon: '🏠', count: 156, color: 'bg-green-100', link: '/category/home' },
    { id: 4, name: 'Beauty', icon: '💄', count: 134, color: 'bg-purple-100', link: '/category/beauty' },
    { id: 5, name: 'Sports', icon: '⚽', count: 98, color: 'bg-orange-100', link: '/category/sports' },
    { id: 6, name: 'Books', icon: '📚', count: 76, color: 'bg-yellow-100', link: '/category/books' },
    { id: 7, name: 'Toys', icon: '🧸', count: 65, color: 'bg-red-100', link: '/category/toys' },
    { id: 8, name: 'Automotive', icon: '🚗', count: 54, color: 'bg-indigo-100', link: '/category/automotive' },
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Shop by Category
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Browse products from our most popular categories
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
            {displayCategories.map((category) => (
              <Link
                key={category.id}
                to={category.link}
                className="group relative bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all duration-300"
              >
                <div className={`${category.color} w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <h3 className="text-lg font-medium text-gray-900 text-center">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500 text-center">
                  {category.count} products
                </p>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link
              to="/categories"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100"
            >
              View All Categories
              <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

CategoryGrid.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.string,
      count: PropTypes.number,
      color: PropTypes.string,
      link: PropTypes.string
    })
  )
};

CategoryGrid.defaultProps = {
  categories: []
};

export default CategoryGrid;