import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/cart/CartItem';
import CartSidebar from '../components/cart/CartSidebar';
import CartSummary from '../components/cart/CartSummary';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { useCart } from '../context/useCart';
import { useAuth } from '../context/useAuth';
import { toast } from 'react-hot-toast';

const CartPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    cartItems,
    loading,
    error,
    updateQuantity,
    removeItem,
    saveForLater,
    moveToCart,
    clearCart,
    savedItems,
    getCartTotals
  } = useCart();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);

  // Calculate totals manually if getCartTotals doesn't exist
  const calculateCartTotals = () => {
    // Ensure cartItems is an array
    const items = Array.isArray(cartItems) ? cartItems : [];

    const subtotal = items.reduce((sum, item) => {
      if (!item) return sum;

      // Extract price - handle multiple possible formats
      let price = 0;
      const itemPrice = item.price;

      if (itemPrice) {
        if (typeof itemPrice === 'object') {
          // Try all common price property names
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

      const quantity = Number.parseInt(item.quantity, 10) || 1;
      return sum + (price * quantity);
    }, 0);

    const shipping = subtotal >= 50 ? 0 : 5.99; // Free shipping over $50
    const tax = Number.parseFloat((subtotal * 0.08).toFixed(2)); // 8% tax
    const total = Number.parseFloat((subtotal + shipping + tax).toFixed(2));
    const totalItems = items.reduce((sum, item) => {
      return sum + (Number.parseInt(item.quantity, 10) || 1);
    }, 0);

    return {
      subtotal: Number.parseFloat(subtotal.toFixed(2)),
      shipping,
      tax,
      total,
      totalItems
    };
  };

  // Use getCartTotals from hook if available, otherwise calculate manually
  const totals = getCartTotals ? getCartTotals() : calculateCartTotals();
  const { subtotal, shipping, tax, total, totalItems } = totals;

  const handleQuantityChange = async (id, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(id);
      return;
    }

    setLocalLoading(true);
    try {
      await updateQuantity(id, newQuantity);
    } catch (err) {
      console.error('Error updating quantity:', err);
      toast.error('Failed to update quantity. Please try again.');
    } finally {
      setLocalLoading(false);
    }
  };

  const handleRemoveItem = async (id) => {
    if (globalThis.confirm('Are you sure you want to remove this item from your cart?')) {
      setLocalLoading(true);
      try {
        await removeItem(id);
      } catch (err) {
        console.error('Error removing item:', err);
        toast.error('Failed to remove item. Please try again.');
      } finally {
        setLocalLoading(false);
      }
    }
  };

  const handleSaveForLater = async (id) => {
    setLocalLoading(true);
    try {
      await saveForLater(id);
    } catch (err) {
      console.error('Error saving item:', err);
      toast.error('Failed to save item. Please try again.');
    } finally {
      setLocalLoading(false);
    }
  };

  const handleMoveToCart = async (id) => {
    setLocalLoading(true);
    try {
      await moveToCart(id);
    } catch (err) {
      console.error('Error moving item to cart:', err);
      alert('Failed to move item to cart. Please try again.');
    } finally {
      setLocalLoading(false);
    }
  };

  const handleCheckout = () => {
    if (!user) {
      navigate('/login', { state: { from: '/cart' } });
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      alert('Your cart is empty. Add items before checkout.');
      return;
    }

    // Check for out of stock items
    const outOfStockItems = cartItems.filter(item => item.inStock === false);
    if (outOfStockItems.length > 0) {
      alert('Please remove out of stock items before proceeding to checkout.');
      return;
    }

    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const handleClearCart = async () => {
    if (globalThis.confirm('Are you sure you want to clear your cart? This action cannot be undone.')) {
      setLocalLoading(true);
      try {
        await clearCart();
      } catch (err) {
        console.error('Error clearing cart:', err);
        alert('Failed to clear cart. Please try again.');
      } finally {
        setLocalLoading(false);
      }
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Show loading state
  if (loading || localLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="large" />
        <p className="ml-4 text-gray-600">Loading cart...</p>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md p-8 bg-white rounded-xl shadow-md">
          <div className="text-red-600 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Cart</h2>
          <p className="text-gray-600 mb-4">{error.message || 'Failed to load cart'}</p>
          <div className="space-y-3">
            <button
              onClick={() => globalThis.location.reload()}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors w-full"
            >
              Try Again
            </button>
            <button
              onClick={handleContinueShopping}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors w-full"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Cart Content */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={toggleSidebar}
                    className="lg:hidden flex items-center text-gray-600 hover:text-gray-900 p-2"
                  >
                    <span className="mr-2">Cart Summary</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <span className="text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </span>
                </div>
              </div>

              {!cartItems || cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
                  <button
                    onClick={handleContinueShopping}
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  {/* Cart Items List */}
                  <div className="space-y-4">
                    {cartItems.map((item) => {
                      // Get item ID - try multiple possible fields
                      const itemId = item.id || item._id || item.productId;

                      // Prepare item data for CartItem component
                      const cartItemData = {
                        ...item,
                        id: itemId,
                        // Ensure we have a price value
                        price: extractPrice(item),
                        // Ensure we have a quantity
                        quantity: item.quantity || 1,
                        // Ensure we have a name/title
                        name: item.name || item.title || 'Product',
                        // Ensure we have an image
                        image: item.image || item.images?.[0] || item.imgUrl || '',
                      };

                      return (
                        <CartItem
                          key={itemId}
                          item={cartItemData}
                          onQuantityChange={(newQuantity) => handleQuantityChange(itemId, newQuantity)}
                          onRemove={() => handleRemoveItem(itemId)}
                          onSaveForLater={() => handleSaveForLater(itemId)}
                          isLoading={localLoading}
                        />
                      );
                    })}
                  </div>

                  {/* Cart Actions */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                      <button
                        onClick={handleContinueShopping}
                        className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors w-full sm:w-auto"
                      >
                        ← Continue Shopping
                      </button>

                      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        <button
                          onClick={handleClearCart}
                          className="px-6 py-3 border border-red-300 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors"
                        >
                          Clear Cart
                        </button>
                        <button
                          onClick={() => {
                            // You can implement save cart to localStorage or backend
                            globalThis.localStorage.setItem('savedCart', JSON.stringify(cartItems));
                            toast.success('Cart saved! You can retrieve it later.');
                          }}
                          className="px-6 py-3 border border-blue-300 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                        >
                          Save Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Recommendations Section - Only show if cart has items */}
            {cartItems && cartItems.length > 0 && (
              <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">You might also like</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center text-gray-500 py-8 border-2 border-dashed border-gray-200 rounded-lg">
                    <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <p className="text-sm">More products coming soon</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cart Summary Sidebar */}
          <div className={`lg:w-1/3 ${isSidebarOpen ? 'block fixed top-0 right-0 h-full w-4/5 z-50 bg-white p-6 overflow-y-auto shadow-2xl' : 'hidden lg:block'}`}>
            <div className="sticky top-8">
              {isSidebarOpen && (
                <div className="flex justify-between items-center mb-6 lg:hidden">
                  <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                  <button
                    onClick={toggleSidebar}
                    className="p-2 text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
              <CartSummary
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
                totalItems={totalItems}
                onCheckout={handleCheckout}
                isCheckoutDisabled={!cartItems || cartItems.length === 0 || cartItems.some(item => item.inStock === false)}
                cartItems={cartItems}
              />
            </div>
          </div>
        </div>

        {/* Saved Items Sidebar */}
        {savedItems && savedItems.length > 0 && (
          <div className="mt-8">
            <CartSidebar
              savedItems={savedItems}
              onMoveToCart={handleMoveToCart}
              isLoading={localLoading}
            />
          </div>
        )}

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <button
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden cursor-pointer"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                toggleSidebar();
              }
            }}
            tabIndex={0}
          />
        )}
      </div>
    </div>
  );
};

// Helper function to extract price from item
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

export default CartPage;