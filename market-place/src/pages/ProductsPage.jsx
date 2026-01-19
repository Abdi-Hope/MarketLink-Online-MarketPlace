// src/pages/ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProductFilters';
import productService from '../services/productService';

const ProductsPage = () => {
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0,
    maxPrice: 5000,
    sortBy: 'featured',
    inStock: false
  });

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getProducts();
        setAllProducts(data);
        setFilteredProducts(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    applyFilters(filters);
  }, [filters, allProducts]);

  const applyFilters = (newFilters) => {
    let result = [...allProducts];

    // Filter by category
    if (newFilters.category !== 'all') {
      result = result.filter(
        product => product.category === newFilters.category || product.category_name === newFilters.category
      );
    }

    // Filter by price range
    result = result.filter(
      product => product.price >= newFilters.minPrice && product.price <= newFilters.maxPrice
    );

    // Filter by stock
    if (newFilters.inStock) {
      result = result.filter(product => product.stock > 0);
    }

    // Sort products
    if (newFilters.sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (newFilters.sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (newFilters.sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(result);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-red-50 rounded-xl border border-red-200">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-xl text-blue-100">
            Discover {allProducts.length} amazing products for every need
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
                    <span className="font-bold text-blue-600">{filteredProducts.length}</span> products found
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
                Showing <span className="font-bold">{filteredProducts.length}</span> of {allProducts.length} products
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange({ ...filters, sortBy: e.target.value })}
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
            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
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
            {filteredProducts.length > 0 && (
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