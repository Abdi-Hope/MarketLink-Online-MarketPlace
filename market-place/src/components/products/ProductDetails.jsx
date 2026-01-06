import React from 'react';
import PropTypes from 'prop-types';

const ProductDetails = ({ product }) => {
  // Handle missing product
  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

  // Get stock status and color
  const getStockStatus = () => {
    if (product.stock > 10) return 'In Stock';
    if (product.stock > 0) return 'Low Stock';
    return 'Out of Stock';
  };

  const getStockColorClass = () => {
    if (product.stock > 10) return 'bg-green-100 text-green-800';
    if (product.stock > 0) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  // Format price safely
  const formatPrice = () => {
    if (!product.price) return '$0.00';
    return `$${Number.parseFloat(product.price).toFixed(2)}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-white p-4 rounded-lg shadow">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-auto rounded-lg object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/600x400?text=Product+Image";
            }}
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mt-2">{product.name}</h1>
            <p className="text-2xl font-bold text-gray-800 mt-2">{formatPrice()}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600">
              {product.description || "No description available for this product."}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-center space-x-4 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStockColorClass()}`}>
                {getStockStatus()}
              </span>
              <span className="text-gray-600">Available: {product.stock} units</span>
            </div>

            <div className="flex space-x-4">
              <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Add to Cart
              </button>
              <button className="flex-1 border border-blue-600 text-blue-600 py-3 px-6 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// PropTypes validation
ProductDetails.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired
  })
};

// Default props
ProductDetails.defaultProps = {
  product: null
};

export default ProductDetails;