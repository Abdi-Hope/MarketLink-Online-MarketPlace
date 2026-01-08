import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  ShoppingBag, 
  Heart, 
  Settings, 
  User 
} from 'lucide-react';
import PropTypes from 'prop-types';

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <aside className="hidden lg:block w-64 bg-white shadow-lg border-r">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">MP</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
              <p className="text-gray-500 text-sm mt-1">MarketPlace Panel</p>
            </div>
          </div>
        </div>
        
        <nav className="p-4 space-y-1">
          <Link 
            to="/dashboard" 
            className={`
              flex items-center space-x-3 px-4 py-3 rounded-lg transition
              ${isActive('/dashboard') 
                ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500' 
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }
            `}
          >
            <Home size={20} />
            <span>Overview</span>
          </Link>
          
          <Link 
            to="/dashboard/orders" 
            className={`
              flex items-center space-x-3 px-4 py-3 rounded-lg transition
              ${isActive('/dashboard/orders') 
                ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500' 
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }
            `}
          >
            <ShoppingBag size={20} />
            <span>My Orders</span>
          </Link>
          
          <Link 
            to="/dashboard/wishlist" 
            className={`
              flex items-center space-x-3 px-4 py-3 rounded-lg transition
              ${isActive('/dashboard/wishlist') 
                ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500' 
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }
            `}
          >
            <Heart size={20} />
            <span>Wishlist</span>
          </Link>
          
          <Link 
            to="/dashboard/profile" 
            className={`
              flex items-center space-x-3 px-4 py-3 rounded-lg transition
              ${isActive('/dashboard/profile') 
                ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500' 
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }
            `}
          >
            <User size={20} />
            <span>Profile</span>
          </Link>
          
          <Link 
            to="/dashboard/settings" 
            className={`
              flex items-center space-x-3 px-4 py-3 rounded-lg transition
              ${isActive('/dashboard/settings') 
                ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500' 
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }
            `}
          >
            <Settings size={20} />
            <span>Settings</span>
          </Link>
        </nav>
        
        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
          <div className="text-center">
            <p className="text-xs text-gray-500">MarketPlace v1.0</p>
          </div>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* DashboardPage will render its own header here */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default DashboardLayout;