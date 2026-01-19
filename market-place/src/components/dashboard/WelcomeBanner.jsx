import React from 'react';
import { Download, Filter, Calendar, TrendingUp } from 'lucide-react';

const WelcomeBanner = ({ 
  userName = 'User', 
  userRole = 'user',
  showActions = true,
  onExport,
  onFilter 
}) => {
  const currentDate = new Date();
  
  return (
    <div className="mb-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome back, {userName}! 
          </h2>
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full animate-pulse">
            {currentDate.toLocaleDateString('en-US', { weekday: 'long' })}
          </span>
        </div>
        <p className="text-gray-600">
          Here's what's happening with your {userRole} account today. 
          <span className="text-blue-600 font-medium ml-2">
            Last updated: {currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </p>
        
        {/* Quick Stats */}
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
            <Calendar size={16} className="text-gray-500" />
            <span className="text-sm text-gray-700">
              {currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg">
            <TrendingUp size={16} className="text-green-600" />
            <span className="text-sm text-green-700">Growth: +12%</span>
          </div>
        </div>
      </div>
      
      {showActions && (
        <div className="flex gap-3">
          <button 
            onClick={onExport}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:shadow-md transition"
          >
            <Download size={18} />
            <span className="hidden sm:inline">Export</span>
          </button>
          <button 
            onClick={onFilter}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hover:shadow-md transition"
          >
            <Filter size={18} />
            <span className="hidden sm:inline">Filter</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default WelcomeBanner;
