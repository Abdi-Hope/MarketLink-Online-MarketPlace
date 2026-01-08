import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  LogOut, Bell, Search, ChevronRight, User as UserIcon,
  Settings, HelpCircle, Moon, Sun, MessageSquare,
  CreditCard, Shield, Globe, Camera
} from 'lucide-react';

const UserPanel = ({ user = {}, onLogout, onSearch, notifications = 0 }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Create refs for dropdowns
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSearchQuery('');
    }
  };

  const profileMenuItems = [
    { id: 'profile', label: 'My Profile', icon: <UserIcon size={18} />, action: () => console.log('Profile') },
    { id: 'settings', label: 'Account Settings', icon: <Settings size={18} />, action: () => console.log('Settings') },
    { id: 'billing', label: 'Billing & Payments', icon: <CreditCard size={18} />, action: () => console.log('Billing') },
    { id: 'security', label: 'Privacy & Security', icon: <Shield size={18} />, action: () => console.log('Security') },
    { id: 'language', label: 'Language & Region', icon: <Globe size={18} />, action: () => console.log('Language') },
    { id: 'help', label: 'Help & Support', icon: <HelpCircle size={18} />, action: () => console.log('Help') },
  ];

  return (
    <div className="flex items-center space-x-4">
      {/* Search Bar - Desktop */}
      <div className="hidden md:flex flex-1 max-w-md">
        <form onSubmit={handleSearch} className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search dashboards, reports, and more..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:bg-white transition"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </form>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="hidden md:flex items-center justify-center p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
        aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      >
        {isDarkMode ? (
          <Sun size={20} className="text-gray-600" />
        ) : (
          <Moon size={20} className="text-gray-600" />
        )}
      </button>

      {/* Notifications */}
      <div className="relative" ref={notificationsRef}>
        <button
          onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
          className="relative p-2.5 rounded-xl hover:bg-gray-100 transition group"
          aria-label={`Notifications ${notifications > 0 ? `(${notifications} unread)` : ''}`}
        >
          <Bell size={20} className="text-gray-600 group-hover:text-blue-600 transition-colors" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse shadow">
              {notifications > 99 ? '99+' : notifications}
            </span>
          )}
        </button>
        
        {/* Notification Dropdown */}
        {isNotificationsOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="font-medium text-gray-900">Notifications</p>
              <p className="text-xs text-gray-500">{notifications} unread</p>
            </div>
            <div className="max-h-48 overflow-y-auto">
              {notifications > 0 ? (
                [1, 2, 3].slice(0, Math.min(notifications, 3)).map((i) => (
                  <div 
                    key={`notification-${i}`} 
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      console.log(`Notification ${i} clicked`);
                      setIsNotificationsOpen(false);
                    }}
                  >
                    <p className="text-sm font-medium text-gray-900">New order received</p>
                    <p className="text-xs text-gray-500 mt-1">Order #ORD-{1000 + i}</p>
                  </div>
                ))
              ) : (
                <div className="px-4 py-4 text-center">
                  <p className="text-sm text-gray-500">No notifications</p>
                </div>
              )}
            </div>
            {notifications > 3 && (
              <div className="px-4 py-2 border-t border-gray-100">
                <button 
                  className="text-sm text-blue-600 hover:text-blue-800 w-full text-center"
                  onClick={() => {
                    console.log('View all notifications');
                    setIsNotificationsOpen(false);
                  }}
                >
                  View all notifications
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Messages/Support */}
      <button
        className="hidden md:flex items-center justify-center p-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 transition"
        aria-label="Messages"
      >
        <MessageSquare size={20} className="text-blue-600" />
      </button>

      {/* User Profile */}
      <div className="relative" ref={profileRef}>
        <button
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          className="flex items-center group"
          aria-label="User menu"
          aria-expanded={isProfileMenuOpen}
        >
          <div className="relative">
            <img 
              src={user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'} 
              alt={user.name || 'User'}
              className="w-10 h-10 rounded-full border-2 border-white shadow-lg group-hover:scale-105 transition-transform"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" aria-label="Online"></div>
          </div>
          <div className="ml-3 hidden lg:block">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                {user.name || 'User'}
              </p>
              <ChevronRight size={14} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full capitalize">
                {user.role || 'user'}
              </span>
              <span className="text-xs text-gray-500"> Online</span>
            </div>
          </div>
        </button>

        {/* Profile Dropdown Menu */}
        {isProfileMenuOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
            {/* User Info */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img 
                    src={user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=default'} 
                    alt={user.name || 'User'}
                    className="w-12 h-12 rounded-full border-2 border-white shadow"
                  />
                  <button 
                    className="absolute -bottom-1 -right-1 p-1.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                    aria-label="Change profile picture"
                  >
                    <Camera size={12} />
                  </button>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{user.name || 'User'}</p>
                  <p className="text-sm text-gray-500">{user.email || 'user@example.com'}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {profileMenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    item.action();
                    setIsProfileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-gray-50 transition"
                >
                  <div className="text-gray-500">{item.icon}</div>
                  <span className="text-sm text-gray-700">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 my-2"></div>

            {/* Actions */}
            <div className="px-4 py-2">
              <button
                onClick={() => {
                  onLogout();
                  setIsProfileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

UserPanel.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string
  }),
  onLogout: PropTypes.func.isRequired,
  onSearch: PropTypes.func,
  notifications: PropTypes.number
};

UserPanel.defaultProps = {
  user: {},
  notifications: 0
};

export default UserPanel;git a