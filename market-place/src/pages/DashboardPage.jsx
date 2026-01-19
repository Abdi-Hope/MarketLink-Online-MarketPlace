import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

// Import components
import DashboardHeader from '../components/dashboard/DashboardHeader';
import UserPanel from '../components/dashboard/UserPanel';
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import StatsGrid from '../components/dashboard/StatsGrid';
import DashboardStats from '../components/dashboard/DashboardStats';
import RecentOrders from '../components/dashboard/RecentOrders';
import SalesChart from '../components/dashboard/SalesChart';
import TopProducts from '../components/dashboard/TopProducts';

// Icons for cards
import {
  User, Settings, ShoppingBag, Heart, Package,
  Users, BarChart, Activity, ChevronRight
} from 'lucide-react';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = (query) => {
    console.log('Searching for:', query);
    toast.success(`Search results for "${query}"`);
  };

  const handleExport = () => {
    toast.loading('Preparing export...', { duration: 1500 });
    setTimeout(() => {
      toast.success('Data exported successfully!');
    }, 1500);
  };

  const handleFilter = () => {
    toast.success('Filter options opened');
  };

  // Dashboard cards based on user role
  const getDashboardCards = () => {
    const commonCards = [
      {
        id: 'profile',
        icon: User,
        title: 'Profile',
        description: 'View and edit your profile',
        bgColor: 'bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50',
        borderColor: 'border-blue-200/50',
        textColor: 'text-blue-600',
        iconBgColor: 'bg-blue-100/80',
        value: user?.name ? 'Active' : 'Setup',
        change: 0,
        progress: user?.avatar ? 100 : 60,
        trend: 'stable'
      },
      {
        id: 'settings',
        icon: Settings,
        title: 'Settings',
        description: 'Account settings',
        bgColor: 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50',
        borderColor: 'border-gray-200/50',
        textColor: 'text-gray-600',
        iconBgColor: 'bg-gray-100/80',
        value: 'Updated',
        change: 0,
        progress: 75,
        trend: 'stable'
      },
    ];

    if (user?.role === 'user') {
      return [
        ...commonCards,
        {
          id: 'orders',
          icon: ShoppingBag,
          title: 'My Orders',
          description: 'Track your orders',
          bgColor: 'bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-50',
          borderColor: 'border-emerald-200/50',
          textColor: 'text-emerald-600',
          iconBgColor: 'bg-emerald-100/80',
          value: '12',
          change: 8,
          progress: 65,
          trend: 'up'
        },
        {
          id: 'wishlist',
          icon: Heart,
          title: 'Wishlist',
          description: 'View saved items',
          bgColor: 'bg-gradient-to-br from-rose-50 via-rose-100 to-rose-50',
          borderColor: 'border-rose-200/50',
          textColor: 'text-rose-600',
          iconBgColor: 'bg-rose-100/80',
          value: '24',
          change: 12,
          progress: 80,
          trend: 'up'
        },
      ];
    }

    if (user?.role === 'seller') {
      return [
        ...commonCards,
        {
          id: 'products',
          icon: Package,
          title: 'Products',
          description: 'Manage your products',
          bgColor: 'bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-50',
          borderColor: 'border-emerald-200/50',
          textColor: 'text-emerald-600',
          iconBgColor: 'bg-emerald-100/80',
          value: '42',
          change: 15,
          progress: 85,
          trend: 'up'
        },
        {
          id: 'analytics',
          icon: Activity,
          title: 'Analytics',
          description: 'View sales analytics',
          bgColor: 'bg-gradient-to-br from-amber-50 via-amber-100 to-amber-50',
          borderColor: 'border-amber-200/50',
          textColor: 'text-amber-600',
          iconBgColor: 'bg-amber-100/80',
          value: '98%',
          change: 5,
          progress: 98,
          trend: 'up'
        },
      ];
    }

    if (user?.role === 'admin') {
      return [
        ...commonCards,
        {
          id: 'users',
          icon: Users,
          title: 'Users',
          description: 'Manage all users',
          bgColor: 'bg-gradient-to-br from-red-50 via-red-100 to-red-50',
          borderColor: 'border-red-200/50',
          textColor: 'text-red-600',
          iconBgColor: 'bg-red-100/80',
          value: '1.2K',
          change: 8,
          progress: 90,
          trend: 'up'
        },
        {
          id: 'admin-analytics',
          icon: BarChart,
          title: 'System Analytics',
          description: 'Complete system overview',
          bgColor: 'bg-gradient-to-br from-violet-50 via-violet-100 to-violet-50',
          borderColor: 'border-violet-200/50',
          textColor: 'text-violet-600',
          iconBgColor: 'bg-violet-100/80',
          value: '99.9%',
          change: 0.1,
          progress: 99,
          trend: 'stable'
        },
      ];
    }

    return commonCards;
  };

  const handleCardClick = (cardId) => {
    console.log(`Clicked ${cardId}`);
    switch (cardId) {
      case 'profile':
        navigate('/dashboard/profile');
        break;
      case 'settings':
        navigate('/dashboard/settings');
        break;
      case 'orders':
        navigate('/dashboard/orders');
        break;
      case 'wishlist':
        navigate('/dashboard/wishlist');
        break;
      case 'products':
        navigate('/seller/products');
        break;
      case 'analytics':
        navigate('/seller/analytics');
        break;
      case 'users':
        navigate('/admin/users');
        break;
      case 'admin-analytics':
        navigate('/admin/analytics');
        break;
      default:
        console.log(`No route for ${cardId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Dashboard Header - Fixed positioning with proper z-index */}
      <div className="relative z-30">
        <DashboardHeader
          title="Overview"
          subtitle="Welcome back to your marketplace"
          activeTab={activeTab}
          onTabChange={(tabId) => {
            setActiveTab(tabId);
            if (tabId === 'overview') navigate('/dashboard');
            else navigate(`/dashboard/${tabId}`);
          }}
          onSearch={handleSearch}
        />
      </div>

      {/* Main content with proper spacing */}
      <main className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-20 sm:pt-24 pb-4 sm:pb-6 md:pb-8">

        {/* Welcome Banner */}
        <div className="mb-6 sm:mb-8 relative">
          <WelcomeBanner
            userName={user?.name || 'User'}
            userRole={user?.role || 'user'}
            onExport={handleExport}
            onFilter={handleFilter}
          />
        </div>

        {/* Dashboard Stats */}
        <div className="mb-6 sm:mb-8 relative">
          <DashboardStats userRole={user?.role} />
        </div>

        {/* Stats Grid */}
        <div className="mb-6 sm:mb-8 relative">
          <StatsGrid
            cards={getDashboardCards()}
            onCardClick={handleCardClick}
          />
        </div>

        {/* Charts and Data Grid - FIXED: Removed extra container for SalesChart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">

          {/* Sales Chart - Uses its own container */}
          <SalesChart />

          {/* Top Products Card */}
          <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-sm sm:shadow-lg p-4 sm:p-6 hover:shadow-md sm:hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Top Products</h3>
                <p className="text-xs sm:text-sm text-gray-600">Best performing items</p>
              </div>
              <button className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-blue-600 hover:text-blue-700 mt-1 sm:mt-0 transition">
                View All
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
            <div className="max-h-48 sm:max-h-64 overflow-y-auto pr-1">
              <TopProducts />
            </div>
          </div>
        </div>

        {/* Recent Orders Card */}
        <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-sm sm:shadow-lg p-4 sm:p-6 hover:shadow-md sm:hover:shadow-xl transition-shadow duration-300 border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Recent Orders</h3>
              <p className="text-xs sm:text-sm text-gray-600">Latest customer activities</p>
            </div>
            <div className="flex gap-2 sm:gap-3 mt-2 sm:mt-0">
              <button
                onClick={() => navigate('/dashboard/orders')}
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                New Order
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition border border-gray-200"
              >
                Export
              </button>
            </div>
          </div>
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-full">
              <RecentOrders />
            </div>
          </div>
        </div>

        {/* Quick Actions for Mobile */}
        <div className="lg:hidden mt-6 relative">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-3">
              {getDashboardCards().slice(0, 4).map(card => (
                <button
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`${card.bgColor} border ${card.borderColor} rounded-lg p-3 text-center hover:shadow-md transition-all duration-200`}
                >
                  <div className="flex justify-center mb-2">
                    <div className={`p-2 rounded-lg ${card.iconBgColor}`}>
                      <card.icon className={`w-5 h-5 ${card.textColor}`} />
                    </div>
                  </div>
                  <span className={`text-xs font-medium ${card.textColor}`}>{card.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom spacing for mobile */}
        <div className="h-4 sm:h-6 lg:h-8"></div>
      </main>
    </div>
  );
};

export default DashboardPage;