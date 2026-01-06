// src/pages/ProductsPage.jsx
import React, { useState } from 'react';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProductFilters';

// Mock products data (or fetch from API)
const mockProducts = [
  {
    id: 1,
    name: 'Wireless Bluetooth Headphones',
    description: 'Noise cancelling over-ear headphones with 30h battery',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'electronics',
    rating: 4.5,
    stock: 15,
    link: '/product/1'
  },
  {
    id: 2,
    name: 'Smart Watch Series 5',
    description: 'Fitness tracker with heart rate monitor and GPS',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'electronics',
    rating: 4.7,
    stock: 8,
    link: '/product/2'
  },
  {
    id: 3,
    name: 'Premium Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'home',
    rating: 4.3,
    stock: 20,
    link: '/product/3'
  },
  {
    id: 4,
    name: 'Yoga Mat Premium',
    description: 'Non-slip yoga mat with carrying strap',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'sports',
    rating: 4.4,
    stock: 25,
    link: '/product/4'
  },
  {
    id: 5,
    name: 'Designer Handbag',
    description: 'Leather handbag with multiple compartments',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'fashion',
    rating: 4.8,
    stock: 5,
    link: '/product/5'
  },
  {
    id: 6,
    name: 'Gaming Laptop',
    description: 'High-performance laptop with RTX graphics',
    price: 1499.99,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'electronics',
    rating: 4.9,
    stock: 3,
    link: '/product/6'
  },
  {
    id: 7,
    name: 'Organic Skincare Set',
    description: 'Natural skincare products for daily routine',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1556228578-9c360e1d8d34?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'beauty',
    rating: 4.6,
    stock: 18,
    link: '/product/7'
  },
  {
    id: 8,
    name: 'Cookware Set 10-Piece',
    description: 'Non-stick cookware set for all your cooking needs',
    price: 179.99,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'home',
    rating: 4.5,
    stock: 12,
    link: '/product/8'
  }
];

const ProductsPage = () => {
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0,
    maxPrice: 5000,
    sortBy: 'featured',
    inStock: false
  });

  const [products, setProducts] = useState(mockProducts);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    
    // Apply filters to products
    let filteredProducts = [...mockProducts];
    
    // Filter by category
    if (newFilters.category !== 'all') {
      filteredProducts = filteredProducts.filter(
        product => product.category === newFilters.category
      );
    }
    
    // Filter by price range
    filteredProducts = filteredProducts.filter(
      product => product.price >= newFilters.minPrice && product.price <= newFilters.maxPrice
    );
    
    // Filter by stock
    if (newFilters.inStock) {
      filteredProducts = filteredProducts.filter(product => product.stock > 0);
    }
    
    // Sort products
    if (newFilters.sortBy === 'price-low') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (newFilters.sortBy === 'price-high') {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (newFilters.sortBy === 'rating') {
      filteredProducts.sort((a, b) => b.rating - a.rating);
    }
    
    setProducts(filteredProducts);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-xl text-blue-100">
            Discover {products.length} amazing products for every need
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                <button 
                  onClick={() => setFilters({
                    category: 'all',
                    minPrice: 0,
                    maxPrice: 5000,
                    sortBy: 'featured',
                    inStock: false
                  })}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear All
                </button>
              </div>
              
              <ProductFilters 
                filters={filters}
                onFilterChange={handleFilterChange}
              />
              
              {/* Results Info */}
              <div className="mt-8 pt-6 border-t">
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-bold text-blue-600">{products.length}</span> products found
                  </p>
                  <p className="text-sm text-gray-500">
                    {filters.category !== 'all' && `Category: ${filters.category}`}
                    {filters.inStock && ' • In stock only'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Sort and View Options */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div className="text-gray-600 mb-4 md:mb-0">
                Showing <span className="font-bold">{products.length}</span> of {mockProducts.length} products
              </div>
              
              <div className="flex items-center space-x-4">
                <select 
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange({...filters, sortBy: e.target.value})}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters to find what you're looking for.</p>
                <button 
                  onClick={() => setFilters({
                    category: 'all',
                    minPrice: 0,
                    maxPrice: 5000,
                    sortBy: 'featured',
                    inStock: false
                  })}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* Pagination (optional) */}
            {products.length > 0 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-3 py-2 bg-blue-600 text-white rounded-lg">1</button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
                  <span className="px-2">...</span>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">10</button>
                  <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;