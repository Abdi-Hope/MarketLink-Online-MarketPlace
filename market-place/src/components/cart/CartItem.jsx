// src/components/cart/CartItem.jsx
import React from 'react';
import PropTypes from 'prop-types';

const CartItem = ({ item, onQuantityChange, onRemove, onSaveForLater, isLoading = false }) => {
  if (!item) return null;
  
  const { id, name, price, quantity, image } = item;
  
  const handleQuantityChange = (e) => {
    const newQuantity = Number.parseInt(e.target.value, 10);
    if (!Number.isNaN(newQuantity) && onQuantityChange) {
      onQuantityChange(newQuantity);
    }
  };
  
  const totalPrice = (price * quantity).toFixed(2);
  
  return (
    <div className="flex items-center border-b border-gray-200 py-4">
      {/* Product Image */}
      <div className="w-20 h-20 flex-shrink-0">
        <img 
          src={image || '/placeholder-image.jpg'} 
          alt={name}
          className="w-full h-full object-cover rounded"
        />
      </div>
      
      {/* Product Info */}
      <div className="ml-4 flex-grow">
        <h3 className="text-lg font-medium text-gray-900">{name}</h3>
        <p className="text-gray-600">${price.toFixed(2)}</p>
        
        {/* Quantity Controls */}
        <div className="mt-2 flex items-center">
          <label htmlFor={`quantity-${id}`} className="mr-2 text-sm text-gray-600">Qty:</label>
          <select
            id={`quantity-${id}`}
            value={quantity}
            onChange={handleQuantityChange}
            disabled={isLoading}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Price and Actions */}
      <div className="ml-4 text-right">
        <p className="text-lg font-medium text-gray-900">${totalPrice}</p>
        <div className="mt-2 flex space-x-2">
          <button
            onClick={onRemove}
            disabled={isLoading}
            className="text-sm text-red-600 hover:text-red-800 disabled:opacity-50"
          >
            Remove
          </button>
          <button
            onClick={onSaveForLater}
            disabled={isLoading}
            className="text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50"
          >
            Save for later
          </button>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    image: PropTypes.string
  }).isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSaveForLater: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

CartItem.defaultProps = {
  isLoading: false
};

export default CartItem;