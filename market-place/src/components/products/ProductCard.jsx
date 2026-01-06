// src/components/products/ProductCard.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Add useNavigate

const ProductCard = ({ product }) => {
  const navigate = useNavigate(); // Add this
  
  const handleAddToCart = () => {
    // Your add to cart logic
    console.log('Added to cart:', product.id);
    // Optionally navigate to cart
    // navigate('/cart');
  };

  return (
    <div className="product-card">
      {/* Make product image/name clickable */}
      <Link to={`/product/${product.id}`} className="block">
        <div className="product-image">
          {/* Image here */}
        </div>
        <h3 className="product-name">{product.name}</h3>
      </Link>
      
      <div className="product-actions">
        <button 
          onClick={handleAddToCart}
          className="add-to-cart-btn"
        >
          Add to Cart
        </button>
        
        <Link 
          to={`/product/${product.id}`}
          className="view-details-btn"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;