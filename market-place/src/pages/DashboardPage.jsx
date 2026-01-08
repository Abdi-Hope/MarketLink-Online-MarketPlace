import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';

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
  Users, BarChart, Activity
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
    // Implement search functionality
  };

  const handleExport = () => {
    console.log('Exporting data...');
    // Implement export functionality
  };

  const handleFilter = () => {
    console.log('Opening filters...');
    // Implement filter functionality
  };

  // Dashboard cards based on user role
  const getDashboardCards = () => {
    const commonCards = [
      { 
        id: 'profile',
        icon: User, 
        title: 'Profile', 
        description: 'View and edit your profile', 
        bgColor: 'bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 border border-blue-200/50',
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
        bgColor: 'bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 border border-gray-200/50',
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
          bgColor: 'bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-50 border border-emerald-200/50',
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
          bgColor: 'bg-gradient-to-br from-rose-50 via-rose-100 to-rose-50 border border-rose-200/50',
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
          bgColor: 'bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-50 border border-emerald-200/50',
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
          bgColor: 'bg-gradient-to-br from-amber-50 via-amber-100 to-amber-50 border border-amber-200/50',
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
          bgColor: 'bg-gradient-to-br from-red-50 via-red-100 to-red-50 border border-red-200/50',
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
          bgColor: 'bg-gradient-to-br from-violet-50 via-violet-100 to-violet-50 border border-violet-200/50',
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
    // Navigate based on card ID
    switch(cardId) {
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
      {/* Dashboard Header */}
      <DashboardHeader
        title="Dashboard"
        subtitle="MarketPlace Analytics"
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSearch={handleSearch}
      >
        <UserPanel
          user={user}
          onLogout={handleLogout}
          onSearch={handleSearch}
          notifications={3}
        />
      </DashboardHeader>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <WelcomeBanner
          userName={user?.name || 'User'}
          userRole={user?.role || 'user'}
          onExport={handleExport}
          onFilter={handleFilter}
        />

        {/* Dashboard Stats */}
        <DashboardStats userRole={user?.role} />

        {/* Stats Grid */}
        <StatsGrid
          cards={getDashboardCards()}
          onCardClick={handleCardClick}
        />

        {/* Charts and Recent Data Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales Chart */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
                <p className="text-sm text-gray-600 mt-1">Monthly revenue trends</p>
              </div>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <button className="px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition">
                  Monthly
                </button>
                <button className="px-3 py-1.5 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition">
                  Quarterly
                </button>
              </div>
            </div>
            <SalesChart />
          </div>
          
          {/* Top Products */}
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
                <p className="text-sm text-gray-600 mt-1">Best performing items</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-700 mt-2 sm:mt-0">
                View All
              </button>
            </div>
            <TopProducts />
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
              <p className="text-sm text-gray-600 mt-1">Latest customer activities</p>
            </div>
            <div className="flex gap-3 mt-2 sm:mt-0">
              <button className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                New Order
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition">
                Export
              </button>
            </div>
          </div>
          <RecentOrders />
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;