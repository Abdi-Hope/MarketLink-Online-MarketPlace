import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowRight, Sparkles, TrendingUp, Zap } from 'lucide-react';

const CategoryGrid = ({ categories = [] }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const defaultCategories = [
    {
      id: 1,
      name: 'Electronics',
      icon: '📱',
      count: 245,
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      link: '/category/electronics',
      subcategories: ['Smartphones', 'Laptops', 'Tablets', 'Audio'],
      trending: true
    },
    {
      id: 2,
      name: 'Fashion',
      icon: '👕',
      count: 189,
      gradient: 'from-pink-500 via-rose-500 to-red-500',
      bgGradient: 'from-pink-50 to-rose-50',
      link: '/category/fashion',
      subcategories: ['Men', 'Women', 'Kids', 'Accessories'],
      trending: true
    },
    {
      id: 3,
      name: 'Home & Garden',
      icon: '🏠',
      count: 156,
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      bgGradient: 'from-green-50 to-emerald-50',
      link: '/category/home',
      subcategories: ['Furniture', 'Decor', 'Kitchen', 'Garden']
    },
    {
      id: 4,
      name: 'Beauty',
      icon: '💄',
      count: 134,
      gradient: 'from-purple-500 via-fuchsia-500 to-pink-500',
      bgGradient: 'from-purple-50 to-fuchsia-50',
      link: '/category/beauty',
      subcategories: ['Skincare', 'Makeup', 'Haircare', 'Perfume']
    },
    {
      id: 5,
      name: 'Sports',
      icon: '⚽',
      count: 98,
      gradient: 'from-orange-500 via-amber-500 to-yellow-500',
      bgGradient: 'from-orange-50 to-amber-50',
      link: '/category/sports',
      subcategories: ['Fitness', 'Outdoor', 'Shoes', 'Equipment']
    },
    {
      id: 6,
      name: 'Books',
      icon: '📚',
      count: 76,
      gradient: 'from-yellow-500 via-lime-500 to-green-500',
      bgGradient: 'from-yellow-50 to-lime-50',
      link: '/category/books',
      subcategories: ['Fiction', 'Business', 'Self-help', 'Academic']
    },
    {
      id: 7,
      name: 'Toys',
      icon: '🧸',
      count: 65,
      gradient: 'from-red-500 via-pink-500 to-purple-500',
      bgGradient: 'from-red-50 to-pink-50',
      link: '/category/toys',
      subcategories: ['Lego', 'Action Figures', 'Board Games', 'Plush']
    },
    {
      id: 8,
      name: 'Automotive',
      icon: '🚗',
      count: 54,
      gradient: 'from-indigo-500 via-blue-500 to-cyan-500',
      bgGradient: 'from-indigo-50 to-blue-50',
      link: '/category/automotive',
      subcategories: ['Parts', 'Accessories', 'Car Care', 'Tools']
    },
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  const handleCategoryClick = (category) => {
    if (activeCategory === category.id) {
      setActiveCategory(null);
    } else {
      setActiveCategory(category.id);
    }
  };

  const goToCategory = (link) => {
    navigate(link);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-16 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section with Enhanced Design */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white text-sm font-bold mb-6 shadow-lg animate-bounce-slow">
            <Sparkles size={16} className="animate-spin-slow" />
            Trending Categories
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-900 bg-clip-text text-transparent leading-tight">
            Shop by Category
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 font-medium">
            Explore our curated collections across major categories
          </p>
        </div>

        {/* Enhanced Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayCategories.map((category, index) => (
            <div
              key={category.id}
              className="group relative"
              onMouseEnter={() => setHoveredCard(category.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Trending Badge */}
              {category.trending && (
                <div className="absolute -top-3 -right-3 z-20 flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                  <TrendingUp size={14} />
                  Hot
                </div>
              )}

              {/* Glow Effect on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${category.gradient} rounded-[2rem] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`}
              />

              {/* Main Card */}
              <div
                className={`relative bg-white rounded-[2rem] border-2 transition-all duration-500 overflow-hidden cursor-pointer ${activeCategory === category.id
                    ? 'border-transparent shadow-2xl scale-105 -translate-y-2'
                    : hoveredCard === category.id
                      ? 'border-transparent shadow-xl scale-102 -translate-y-1'
                      : 'border-gray-100 shadow-md'
                  }`}
                onClick={() => handleCategoryClick(category)}
              >
                {/* Gradient Background Layer */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.bgGradient} opacity-50 group-hover:opacity-70 transition-opacity duration-500`} />

                {/* Content */}
                <div className="relative p-8">
                  {/* Icon Container with Animation */}
                  <div className="relative mb-6">
                    <div className={`w-24 h-24 rounded-[1.5rem] bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${activeCategory === category.id ? 'scale-110 rotate-12' : ''
                      }`}>
                      <span className="text-5xl filter drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        {category.icon}
                      </span>
                    </div>

                    {/* Floating Sparkle */}
                    {hoveredCard === category.id && (
                      <div className="absolute -top-2 -right-2 animate-ping">
                        <Sparkles className={`text-yellow-400`} size={20} />
                      </div>
                    )}
                  </div>

                  {/* Title and Count */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-black text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                        {category.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.gradient} animate-pulse`} />
                        <p className="text-gray-600 font-bold text-sm">
                          {category.count} Products
                        </p>
                      </div>
                    </div>

                    {/* Chevron with Animation */}
                    <div className={`p-3 rounded-full transition-all duration-500 ${activeCategory === category.id
                        ? `rotate-90 bg-gradient-to-r ${category.gradient} text-white shadow-lg`
                        : 'bg-gray-100 text-gray-400 group-hover:bg-gradient-to-r group-hover:from-blue-100 group-hover:to-purple-100 group-hover:text-blue-600'
                      }`}>
                      <ChevronRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Animated Divider */}
                  <div className={`h-1 rounded-full bg-gradient-to-r ${category.gradient} transform origin-left transition-all duration-500 ${hoveredCard === category.id || activeCategory === category.id ? 'scale-x-100' : 'scale-x-0'
                    }`} />
                </div>

                {/* Collapsible Subcategories with Enhanced Design */}
                <div
                  className={`transition-all duration-700 ease-in-out backdrop-blur-sm ${activeCategory === category.id
                      ? 'max-h-[400px] opacity-100 p-6 pt-0'
                      : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
                >
                  <div className="space-y-4">
                    <p className="text-xs font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <Zap size={12} className="text-yellow-500" />
                      Popular in {category.name}
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      {(category.subcategories || ['New Arrivals', 'Best Sellers', 'Discounted', 'Verified']).map((sub, i) => (
                        <Link
                          key={i}
                          to={`${category.link}?sub=${sub.toLowerCase()}`}
                          className="group/item flex items-center gap-2 px-3 py-2 rounded-lg bg-white bg-opacity-60 hover:bg-opacity-100 text-sm font-bold text-gray-700 hover:text-blue-600 transition-all duration-300 hover:shadow-md hover:scale-105"
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.gradient} group-hover/item:scale-150 transition-transform`} />
                          <span className="truncate">{sub}</span>
                        </Link>
                      ))}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goToCategory(category.link);
                      }}
                      className={`w-full mt-4 py-4 bg-gradient-to-r ${category.gradient} text-white rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group/btn`}
                    >
                      <span className="relative z-10">Explore {category.name}</span>
                      <ArrowRight size={18} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />

                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover/btn:opacity-30 group-hover/btn:animate-shine" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced CTA Button */}
        <div className="text-center mt-16">
          <Link
            to="/categories"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl text-white font-black text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
          >
            <span className="relative z-10">Explore All Categories</span>
            <ArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform" size={24} />

            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(50px, 50px) scale(1.05);
          }
        }

        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-shine {
          animation: shine 1.5s ease-in-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }

        .scale-102 {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

CategoryGrid.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.string,
      count: PropTypes.number,
      gradient: PropTypes.string,
      link: PropTypes.string
    })
  )
};

CategoryGrid.defaultProps = {
  categories: []
};

export default CategoryGrid;