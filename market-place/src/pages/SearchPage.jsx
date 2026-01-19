// src/pages/SearchPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, X, DollarSign, Star } from 'lucide-react';
import ProductGrid from '../components/products/ProductGrid';
import LoadingSpinner from '../components/common/LoadingSpinner';

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Advanced filters
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    category: '',
    minRating: 0,
    inStock: false,
    sortBy: 'relevance'
  });

  const categories = ['Electronics', 'Fashion', 'Accessories', 'Home', 'Furniture', 'Food'];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    setSearchQuery(query);

    if (query) {
      fetchSearchResults(query);
    } else {
      setProducts([]);
    }
  }, [location.search]);

  const fetchSearchResults = async (query) => {
    setLoading(true);
    try {
      // Mock products database for searching
      const allMockProducts = [
        { id: 1, name: 'Premium Wireless Headphones', price: 199.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800', category: 'Electronics', stock: 15, rating: 4.8 },
        { id: 2, name: 'Smart Watch Series X', price: 299.50, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800', category: 'Electronics', stock: 8, rating: 4.5 },
        { id: 3, name: 'Organic Cotton T-Shirt', price: 29.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800', category: 'Fashion', stock: 50, rating: 4.2 },
        { id: 4, name: 'Leather Messenger Bag', price: 89.00, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800', category: 'Accessories', stock: 12, rating: 4.7 },
        { id: 5, name: 'Professional Camera Tripod', price: 55.40, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800', category: 'Electronics', stock: 20, rating: 4.4 },
        { id: 6, name: 'Minimalist Wall Clock', price: 45.00, image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800', category: 'Home', stock: 5, rating: 4.9 },
        { id: 7, name: 'Ergonomic Office Chair', price: 249.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800', category: 'Furniture', stock: 10, rating: 4.6 },
        { id: 8, name: 'Gourmet Coffee Beans', price: 18.50, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800', category: 'Food', stock: 100, rating: 4.8 },
        { id: 9, name: 'Bluetooth Speaker', price: 79.99, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800', category: 'Electronics', stock: 0, rating: 4.3 },
        { id: 10, name: 'Yoga Mat Premium', price: 35.00, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800', category: 'Accessories', stock: 25, rating: 4.6 },
      ];

      // Apply search filter
      let results = allMockProducts.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      );

      // Apply advanced filters
      if (filters.minPrice) {
        results = results.filter(p => p.price >= parseFloat(filters.minPrice));
      }
      if (filters.maxPrice) {
        results = results.filter(p => p.price <= parseFloat(filters.maxPrice));
      }
      if (filters.category) {
        results = results.filter(p => p.category === filters.category);
      }
      if (filters.minRating > 0) {
        results = results.filter(p => p.rating >= filters.minRating);
      }
      if (filters.inStock) {
        results = results.filter(p => p.stock > 0);
      }

      // Apply sorting
      switch (filters.sortBy) {
        case 'price-low':
          results.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          results.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          results.sort((a, b) => b.rating - a.rating);
          break;
        case 'name':
          results.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          break;
      }

      await new Promise(resolve => setTimeout(resolve, 500));
      setProducts(results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    // Re-apply search with new filters
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    if (query) {
      fetchSearchResults(query);
    }
  };

  const clearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      category: '',
      minRating: 0,
      inStock: false,
      sortBy: 'relevance'
    });
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    if (query) {
      fetchSearchResults(query);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section with Large Search Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Advanced Product Search
          </h1>

          {/* Large Search Input */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-6">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, categories, brands..."
                className="w-full pl-14 pr-32 py-5 text-lg border-2 border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
                autoFocus
              />
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
              >
                Search
              </button>
            </div>
          </form>

          {/* Filter Toggle Button */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
            >
              <SlidersHorizontal size={20} />
              {showFilters ? 'Hide Filters' : 'Show Advanced Filters'}
            </button>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 animate-in slide-in-from-top-2 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <DollarSign className="inline mr-1" size={16} />
                    Price Range
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Minimum Rating */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Star className="inline mr-1" size={16} />
                    Minimum Rating
                  </label>
                  <select
                    value={filters.minRating}
                    onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={0}>Any Rating</option>
                    <option value={4}>4+ Stars</option>
                    <option value={4.5}>4.5+ Stars</option>
                    <option value={4.7}>4.7+ Stars</option>
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Sort By</label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="name">Name: A-Z</option>
                  </select>
                </div>

                {/* In Stock Only */}
                <div className="flex items-center">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="ml-3 text-sm font-semibold text-gray-700">In Stock Only</span>
                  </label>
                </div>

                {/* Clear Filters */}
                <div className="flex items-center">
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-semibold transition-colors"
                  >
                    <X size={18} />
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Section */}
        {loading ? (
          <LoadingSpinner />
        ) : searchQuery ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Search Results for: <span className="text-blue-600">"{searchQuery}"</span>
              </h2>
              <p className="text-gray-600 mt-2">
                Found {products.length} {products.length === 1 ? 'product' : 'products'}
              </p>
            </div>

            {products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any products matching "{searchQuery}"
                </p>
                <div className="space-y-2 text-sm text-gray-500">
                  <p>• Try different or more general keywords</p>
                  <p>• Check your spelling</p>
                  <p>• Browse our categories or explore today's deals</p>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Search className="mx-auto h-16 w-16 text-blue-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Start Your Search
            </h2>
            <p className="text-gray-600 mb-6">
              Enter keywords in the search bar above to find products
            </p>
            <div className="inline-block text-left">
              <p className="text-sm font-semibold text-gray-700 mb-2">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                {['Headphones', 'Watch', 'Laptop', 'Coffee', 'Chair'].map(term => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term);
                      navigate(`/search?q=${term}`);
                    }}
                    className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;