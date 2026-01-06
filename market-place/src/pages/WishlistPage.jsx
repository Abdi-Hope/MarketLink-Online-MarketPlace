import React, { useState } from 'react';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([
    { id: 1, name: 'Wireless Headphones', price: 99.99, inStock: true, addedDate: '2024-01-10' },
    { id: 2, name: 'Smart Watch', price: 249.99, inStock: true, addedDate: '2024-01-09' },
    { id: 3, name: 'Running Shoes', price: 129.99, inStock: false, addedDate: '2024-01-08' },
    { id: 4, name: 'Coffee Maker', price: 79.99, inStock: true, addedDate: '2024-01-07' },
    { id: 5, name: 'Desk Lamp', price: 34.99, inStock: true, addedDate: '2024-01-06' },
  ]);

  const removeFromWishlist = (id) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  const moveToCart = (item) => {
    if (item.inStock) {
      alert(`Added ${item.name} to cart`);
      removeFromWishlist(item.id);
    }
  };

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="wishlist-page">
      <div className="page-header">
        <h1>My Wishlist</h1>
        <p>Save items for later or move them to cart</p>
      </div>

      <div className="wishlist-stats">
        <div className="stat-card">
          <h3>{wishlistItems.length}</h3>
          <p>Items in Wishlist</p>
        </div>
        <div className="stat-card">
          <h3>${totalValue.toFixed(2)}</h3>
          <p>Total Value</p>
        </div>
        <div className="stat-card">
          <h3>{wishlistItems.filter(item => item.inStock).length}</h3>
          <p>Items in Stock</p>
        </div>
      </div>

      {wishlistItems.length > 0 ? (
        <>
          <div className="wishlist-items">
            {wishlistItems.map(item => (
              <div key={item.id} className="wishlist-item">
                <div className="item-image">
                  <img src={`https://via.placeholder.com/100`} alt={item.name} />
                </div>
                
                <div className="item-info">
                  <h3 className="item-name">{item.name}</h3>
                  <div className="item-meta">
                    <span className="item-price">${item.price.toFixed(2)}</span>
                    <span className={`item-stock ${item.inStock ? 'in-stock' : 'out-of-stock'}`}>
                      {item.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                    <span className="item-date">Added: {item.addedDate}</span>
                  </div>
                </div>

                <div className="item-actions">
                  {item.inStock ? (
                    <button 
                      className="btn btn-primary"
                      onClick={() => moveToCart(item)}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <button 
                      className="btn btn-secondary"
                      onClick={() => alert('Notify when back in stock')}
                    >
                      Notify Me
                    </button>
                  )}
                  
                  <button 
                    className="btn btn-outline"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    Remove
                  </button>
                  
                  <button className="btn btn-ghost">
                    Share
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="wishlist-actions">
            <button 
              className="btn btn-primary"
              onClick={() => {
                const inStockItems = wishlistItems.filter(item => item.inStock);
                alert(`Added ${inStockItems.length} items to cart`);
                setWishlistItems(items => items.filter(item => !item.inStock));
              }}
              disabled={!wishlistItems.some(item => item.inStock)}
            >
              Add All Available to Cart
            </button>
            
            <button 
              className="btn btn-danger"
              onClick={() => {
                if (window.confirm('Are you sure you want to clear your wishlist?')) {
                  setWishlistItems([]);
                }
              }}
            >
              Clear Wishlist
            </button>
            
            <button className="btn btn-outline">
              Share Wishlist
            </button>
          </div>

          <div className="wishlist-suggestions">
            <h3>You might also like:</h3>
            <div className="suggestions-grid">
              {wishlistItems.slice(0, 3).map(item => (
                <div key={`suggest-${item.id}`} className="suggestion-card">
                  <img src={`https://via.placeholder.com/80`} alt={item.name} />
                  <h4>{item.name}</h4>
                  <p>${item.price.toFixed(2)}</p>
                  <button className="btn btn-sm">Add to Wishlist</button>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="empty-wishlist">
          <div className="empty-state">
            <h3>Your wishlist is empty</h3>
            <p>Add items you like to your wishlist for easy access later</p>
            <button className="btn btn-primary">Browse Products</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;