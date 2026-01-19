import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  UserCircle,
  Settings,
  LogOut,
  Store,
  Bell,
  Tag
} from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import { toast } from 'react-hot-toast';

const SellerLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    // Aggressive Logout for maximum reliability
    try {
      // 1. Clear Context State
      logout();

      // 2. Direct LocalStorage Clearing (redundancy)
      localStorage.removeItem('marketplace_token');
      localStorage.removeItem('marketplace_user');
      localStorage.clear();

      // 3. Force Global Redirect (Reliable for clearing React State)
      window.location.href = '/login';

      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout script error:', error);
      window.location.href = '/login';
    }
  };

  const menuItems = [
    { name: 'Dashboard', path: '/seller', icon: <LayoutDashboard size={20} /> },
    { name: 'Products', path: '/seller/products', icon: <Package size={20} /> },
    { name: 'Orders', path: '/seller/orders', icon: <ShoppingCart size={20} /> },
    { name: 'Categories', path: '/seller/categories', icon: <Tag size={20} /> },
    { name: 'Analytics', path: '/seller/analytics', icon: <BarChart3 size={20} /> },
  ];

  const accountItems = [
    { name: 'Shop Profile', path: '/seller/profile', icon: <UserCircle size={20} /> },
    { name: 'Settings', path: '/seller/settings', icon: <Settings size={20} /> },
  ];

  const isActive = (path) => location.pathname === path;

  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const profileRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fbff] flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-blue-50 flex flex-col sticky top-0 h-screen z-40">
        <div className="p-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:rotate-6 transition-transform">
              <Store className="text-white" size={24} />
            </div>
            <span className="font-black text-xl text-gray-900 tracking-tight">Seller Hub</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-8 overflow-y-auto">
          <div>
            <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Main Menu</p>
            <div className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 font-bold text-sm cursor-pointer ${isActive(item.path)
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-100 translate-x-1'
                    : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4">Business</p>
            <div className="space-y-1">
              {accountItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 font-bold text-sm cursor-pointer ${isActive(item.path)
                    ? 'bg-blue-600 text-white shadow-xl shadow-blue-100 translate-x-1'
                    : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="p-6 mt-auto border-t border-gray-50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 font-bold text-sm rounded-2xl hover:bg-red-50 transition-all font-sans cursor-pointer group"
          >
            <LogOut size={20} className="group-hover:scale-110 transition-transform" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-blue-50 sticky top-0 z-30 px-8 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-gray-900">
              {menuItems.concat(accountItems).find(i => isActive(i.path))?.name || 'Overview'}
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <Link
              to={`/store/${user?.name?.toLowerCase() || 'seller'}`}
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl font-bold text-xs hover:bg-blue-100 transition-all border border-blue-100"
            >
              <Store size={16} />
              <span className="hidden md:block">Public Store</span>
            </Link>

            <button className="relative p-2 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer">
              <Bell size={22} />
              <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-red-500 text-white text-[10px] font-black rounded-full border-2 border-white flex items-center justify-center">3</span>
            </button>

            <div className="h-8 w-[1px] bg-gray-100"></div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 group px-2 py-1.5 rounded-2xl hover:bg-gray-50 transition-all cursor-pointer"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl overflow-hidden border border-blue-50">
                    <img
                      src={`https://ui-avatars.com/api/?name=${user?.name || 'S'}&background=random`}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></span>
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-black text-gray-900 flex items-center gap-2">
                    {user?.name || 'Seller'}
                    <Settings size={14} className={`text-gray-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </p>
                  <p className="text-[10px] font-bold text-gray-400 capitalize">{user?.role || 'Seller'}</p>
                </div>
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-3xl shadow-2xl shadow-blue-200 border border-blue-50 pb-2 overflow-hidden animate-in fade-in zoom-in duration-300 origin-top-right z-[100]">
                  <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Signed in as</p>
                    <p className="text-sm font-black text-gray-900 truncate">{user?.email || 'seller@zaxip.com'}</p>
                  </div>

                  <div className="p-2">
                    <Link
                      to="/seller/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-600 hover:bg-blue-50 hover:text-blue-600 rounded-2xl transition-all cursor-pointer"
                    >
                      <Settings size={18} />
                      Account Settings
                    </Link>

                    <div className="h-[1px] bg-gray-50 my-2 mx-2"></div>

                    <button
                      onClick={() => {
                        handleLogout();
                        setIsProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-black text-red-500 hover:bg-red-50 rounded-2xl transition-all cursor-pointer"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

SellerLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default SellerLayout;