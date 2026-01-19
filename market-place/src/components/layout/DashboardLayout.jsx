import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  ShoppingBag,
  Heart,
  Settings,
  User,
  BarChart3,
  FileText
} from 'lucide-react';
import PropTypes from 'prop-types';
import { useAuth } from '../../context/useAuth';
import UserPanel from '../dashboard/UserPanel';
import { toast } from 'react-hot-toast';

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    try {
      logout();
      localStorage.clear();
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
      window.location.href = '/login';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Hidden on mobile, visible on desktop */}
      <aside className="hidden lg:block w-70 bg-white shadow-lg border-r relative z-20">
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
              flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
              ${isActive('/dashboard')
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 translate-x-1'
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }
            `}
          >
            <Home size={20} />
            <span className="font-medium">Overview</span>
          </Link>

          <Link
            to="/dashboard/analytics"
            className={`
              flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
              ${isActive('/dashboard/analytics')
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 translate-x-1'
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }
            `}
          >
            <BarChart3 size={20} />
            <span className="font-medium">Analytics</span>
          </Link>

          <Link
            to="/dashboard/reports"
            className={`
              flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
              ${isActive('/dashboard/reports')
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 translate-x-1'
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }
            `}
          >
            <FileText size={20} />
            <span className="font-medium">Reports</span>
          </Link>

          <Link
            to="/dashboard/orders"
            className={`
              flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
              ${isActive('/dashboard/orders')
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 translate-x-1'
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }
            `}
          >
            <ShoppingBag size={20} />
            <span className="font-medium">My Orders</span>
          </Link>

          <Link
            to="/dashboard/wishlist"
            className={`
              flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
              ${isActive('/dashboard/wishlist')
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 translate-x-1'
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }
            `}
          >
            <Heart size={20} />
            <span className="font-medium">Wishlist</span>
          </Link>

          <div className="pt-4 pb-2">
            <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Account</p>
          </div>

          <Link
            to="/dashboard/profile"
            className={`
              flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
              ${isActive('/dashboard/profile')
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 translate-x-1'
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }
            `}
          >
            <User size={20} />
            <span className="font-medium">My Profile</span>
          </Link>

          <Link
            to="/dashboard/settings"
            className={`
              flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
              ${isActive('/dashboard/settings')
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 translate-x-1'
                : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }
            `}
          >
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </Link>
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-4 text-white shadow-lg">
            <p className="text-xs font-bold uppercase tracking-wider mb-1 opacity-80">MarketPlace Pro</p>
            <p className="text-sm">Enjoy premium features and support.</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar - PERSISTENT across all dashboard pages */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 relative z-10 shadow-sm">
          <div className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">MP</span>
            </div>
            <h2 className="font-bold text-gray-800">MarketPlace</h2>
          </div>
          <div className="hidden lg:block">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              {location.pathname.replace('/dashboard', '').replace('/', '') || 'Overview'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <UserPanel
              user={user}
              onLogout={handleLogout}
              notifications={3}
            />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50/50">
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