// src/components/cart/CartSidebar.jsx
import React from 'react';

const CartSidebar = ({ savedItems, onMoveToCart, isLoading }) => {
  if (!savedItems || savedItems.length === 0) return null;
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Saved for Later ({savedItems.length})</h3>
      
      <div className="space-y-4">
        {savedItems.map((item) => {
          const itemId = item.id || item._id || item.productId;
          const price = extractPrice(item);
          const name = item.name || item.title || 'Product';
          const image = item.image || item.images?.[0] || item.imgUrl || '';
          
          return (
            <div key={itemId} className="flex items-center border border-gray-200 rounded-lg p-3">
              {/* Product Image */}
              <div className="w-16 h-16 flex-shrink-0">
                <img 
                  src={image || '/placeholder-image.jpg'} 
                  alt={name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              
              {/* Product Info */}
              <div className="ml-3 flex-grow">
                <h4 className="font-medium text-gray-900">{name}</h4>
                <p className="text-gray-600">${price.toFixed(2)}</p>
              </div>
              
              {/* Move to Cart Button */}
              <button
                onClick={() => onMoveToCart(itemId)}
                disabled={isLoading}
                className="ml-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                Move to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Helper function to extract price (same as in CartPage)
const extractPrice = (item) => {
  if (!item) return 0;
  
  let price = 0;
  const itemPrice = item.price;
  
  if (itemPrice) {
    if (typeof itemPrice === 'object') {
      price = itemPrice.value || itemPrice.amount || itemPrice.current || 
              itemPrice.regular || itemPrice.price || itemPrice.base || 0;
    } else if (typeof itemPrice === 'number') {
      price = itemPrice;
    } else if (typeof itemPrice === 'string') {
      price = Number.parseFloat(itemPrice) || 0;
    }
  }
  
  // Check for sale price (if available)
  if (item.salePrice || item.discountedPrice) {
    const salePrice = item.salePrice || item.discountedPrice;
    if (typeof salePrice === 'object') {
      price = salePrice.value || salePrice.amount || price;
    } else if (typeof salePrice === 'number') {
      price = salePrice;
    } else if (typeof salePrice === 'string') {
      const parsed = Number.parseFloat(salePrice);
      if (!Number.isNaN(parsed)) price = parsed;
    }
  }
  
  return price;
};

export default CartSidebar;