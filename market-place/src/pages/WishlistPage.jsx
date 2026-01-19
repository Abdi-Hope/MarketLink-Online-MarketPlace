import React, { useState } from 'react';
import { ShoppingCart, Trash2, Share2, Heart, ArrowRight, PackageX, CheckCircle, ExternalLink } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const WishlistPage = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([
    { id: 1, name: 'Wireless Headphones', price: 99.99, inStock: true, addedDate: '2024-01-10', image: '🎧' },
    { id: 2, name: 'Smart Watch', price: 249.99, inStock: true, addedDate: '2024-01-09', image: '⌚' },
    { id: 3, name: 'Running Shoes', price: 129.99, inStock: false, addedDate: '2024-01-08', image: '👟' },
    { id: 4, name: 'Coffee Maker', price: 79.99, inStock: true, addedDate: '2024-01-07', image: '☕' },
    { id: 5, name: 'Desk Lamp', price: 34.99, inStock: true, addedDate: '2024-01-06', image: '💡' },
  ]);

  const removeFromWishlist = (id, name) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
    toast.success(`${name} removed from wishlist`);
  };

  const moveToCart = (item) => {
    if (item.inStock) {
      toast.success(`Added ${item.name} to cart!`);
      removeFromWishlist(item.id, item.name);
    }
  };

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-transparent p-4 md:p-6 lg:p-8 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
          <p className="text-gray-600 mt-1">Keep track of items you love and buy them later</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              toast.success("Wishlist link copied to clipboard!");
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-sm"
          >
            <Share2 size={18} />
            <span>Share</span>
          </button>
        </div>
      </div>

      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="divide-y divide-gray-50">
                {wishlistItems.map(item => (
                  <div key={item.id} className="p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6 group hover:bg-gray-50/50 transition-colors">
                    <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-100 rounded-2xl flex items-center justify-center text-4xl shadow-inner shrink-0 group-hover:scale-105 transition-transform">
                      {item.image}
                    </div>

                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-lg font-bold text-gray-800 mb-1">{item.name}</h3>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-3">
                        <span className="text-xl font-black text-blue-600">${item.price.toFixed(2)}</span>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${item.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                          {item.inStock ? <CheckCircle size={12} /> : <PackageX size={12} />}
                          {item.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400">Added on: {item.addedDate}</p>
                    </div>

                    <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                      <button
                        disabled={!item.inStock}
                        onClick={() => moveToCart(item)}
                        className={`flex-1 sm:w-40 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold transition-all shadow-sm ${item.inStock
                            ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                      >
                        <ShoppingCart size={18} />
                        <span>Add to Cart</span>
                      </button>
                      <div className="flex gap-2">
                        <button
                          onClick={() => removeFromWishlist(item.id, item.name)}
                          className="flex-1 p-2.5 bg-white border border-gray-200 text-red-500 rounded-xl hover:bg-red-50 hover:border-red-200 transition-all shadow-sm"
                          title="Remove"
                        >
                          <Trash2 size={18} className="mx-auto" />
                        </button>
                        <button className="flex-1 p-2.5 bg-white border border-gray-200 text-gray-500 rounded-xl hover:bg-gray-50 transition-all shadow-sm" title="View details">
                          <ExternalLink size={18} className="mx-auto" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gray-800 text-white rounded-2xl font-bold hover:bg-gray-900 transition-all shadow-lg shadow-gray-200"
                onClick={() => {
                  const available = wishlistItems.filter(i => i.inStock);
                  if (available.length > 0) {
                    toast.success(`Added ${available.length} items to cart!`);
                    setWishlistItems(items => items.filter(i => !i.inStock));
                  }
                }}
              >
                <ShoppingCart size={20} />
                <span>Move Available Items to Cart</span>
              </button>
              <button
                onClick={() => {
                  if (window.confirm("Clear all items?")) {
                    setWishlistItems([]);
                    toast.success("Wishlist cleared");
                  }
                }}
                className="px-6 py-4 bg-white border border-gray-200 text-red-600 rounded-2xl font-bold hover:bg-red-50 transition-all"
              >
                Clear List
              </button>
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Total Items</span>
                  <span className="font-bold text-gray-800">{wishlistItems.length}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Available</span>
                  <span className="font-bold text-green-600">{wishlistItems.filter(i => i.inStock).length}</span>
                </div>
                <div className="border-t border-gray-50 pt-4 flex justify-between items-center">
                  <span className="text-base font-bold text-gray-800">Total Value</span>
                  <span className="text-xl font-black text-blue-600 font-mono">${totalValue.toFixed(2)}</span>
                </div>
              </div>
              <button
                onClick={() => navigate('/checkout')}
                className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
              >
                <span>Proceed to Buy</span>
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative group">
              <div className="relative z-10">
                <Heart className="mb-4 text-white/50 group-hover:scale-110 transition-transform" size={40} fill="currentColor" />
                <h4 className="font-bold text-lg mb-2">Price Drop Alerts</h4>
                <p className="text-blue-100 text-sm leading-relaxed mb-4">
                  We will notify you immediately if any item in your wishlist goes on sale.
                </p>
                <button className="text-xs font-bold uppercase tracking-widest bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30 transition-all">
                  Enable Alerts
                </button>
              </div>
              <div className="absolute -bottom-8 -right-8 opacity-10 rotate-12 transition-transform group-hover:rotate-0">
                <ShoppingCart size={140} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-16 text-center">
          <div className="w-24 h-24 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
            <Heart size={48} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Your wishlist is lonely</h2>
          <p className="text-gray-600 max-w-sm mx-auto mb-8 text-lg">
            Add items you love to your wishlist and we'll keep them safe for you until you're ready.
          </p>
          <button
            onClick={() => navigate('/products')}
            className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center gap-2 mx-auto"
          >
            <span>Explore Products</span>
            <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
