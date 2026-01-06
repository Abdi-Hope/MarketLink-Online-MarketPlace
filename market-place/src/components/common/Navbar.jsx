// src/components/common/Navbar.jsx
import React, { useState } from 'react';
import { Menu, X, ShoppingCart, User, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Only useNavigate

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Categories', path: '/categories' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Seller', path: '/seller' },
    { name: 'Admin', path: '/admin' },
  ];

  return (
    <nav className="bg-white shadow-md border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button 
            onClick={() => navigate('/')}
            className="text-xl font-bold text-blue-600 hover:text-blue-700"
          >
            MarketPlace
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button 
              onClick={() => navigate('/cart')}
              className="relative p-2 rounded-lg hover:bg-gray-100"
              title="Cart"
            >
              <ShoppingCart size={22} className="text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>
            
            {/* Profile Button */}
            <button 
              onClick={() => navigate('/profile')}
              className="hidden md:flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
            >
              <User size={22} className="text-gray-700" />
              <span className="font-medium text-gray-700">Profile</span>
            </button>
            
            {/* Divider */}
            <div className="hidden md:block w-px h-6 bg-gray-300"></div>
            
            {/* Login Button */}
            <button 
              onClick={() => navigate('/login')}
              className="hidden md:block px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:opacity-90 font-medium"
            >
              Sign In
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t py-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg"
                >
                  {item.name}
                </button>
              ))}
              
              {/* Mobile-only actions */}
              <div className="pt-4 border-t">
                <button 
                  onClick={() => {
                    navigate('/profile');
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg"
                >
                  <User size={20} />
                  <span>Profile</span>
                </button>
                
                <button 
                  onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }}
                  className="w-full mt-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;