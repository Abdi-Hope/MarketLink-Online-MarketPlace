import React from 'react';

const AdminStats = () => {
  const stats = [
    { label: 'Total Users', value: '1,234', change: '+12%', icon: '👥' },
    { label: 'Total Products', value: '5,678', change: '+8%', icon: '📦' },
    { label: 'Today\'s Orders', value: '89', change: '+23%', icon: '🛒' },
    { label: 'Revenue', value: '$12,345', change: '+15%', icon: '💰' },
    { label: 'Pending Reviews', value: '45', change: '-5%', icon: '⭐' },
    { label: 'New Sellers', value: '23', change: '+18%', icon: '🏪' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
              <p className={`text-sm mt-1 ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change} from last week
              </p>
            </div>
            <div className="text-3xl">{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;