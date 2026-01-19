import React from 'react';
import { BarChart3, TrendingUp, Users, ShoppingCart, ArrowUpRight, ArrowDownRight, Calendar, Download } from 'lucide-react';
import { toast } from 'react-hot-toast';

const AnalyticsPage = () => {
    const stats = [
        { label: 'Total Spending', value: '$4,250.00', change: '+12.5%', icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-50', trend: 'up' },
        { label: 'Orders Placed', value: '24', change: '+18.2%', icon: BarChart3, color: 'text-purple-600', bg: 'bg-purple-50', trend: 'up' },
        { label: 'Unique Sellers', value: '12', change: '-2.4%', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50', trend: 'down' },
        { label: 'Category Diversity', value: '8', change: '0%', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-50', trend: 'neutral' },
    ];

    const handleExport = () => {
        toast.loading('Generating analytics report...');
        setTimeout(() => {
            toast.dismiss();
            toast.success('Report downloaded successfully!');
        }, 2000);
    };

    return (
        <div className="min-h-screen p-4 md:p-6 lg:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Analytics</h1>
                    <p className="text-gray-600 mt-1">Deep dive into your shopping habits and spending</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
                        <Calendar size={18} />
                        <span>Last 30 Days</span>
                    </button>
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                    >
                        <Download size={18} />
                        <span>Export Data</span>
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                            <h3 className="text-2xl font-black text-gray-900">{stat.value}</h3>
                            <div className="flex items-center gap-1 mt-2">
                                {stat.trend === 'up' && <ArrowUpRight size={14} className="text-green-500" />}
                                {stat.trend === 'down' && <ArrowDownRight size={14} className="text-red-500" />}
                                <span className={`text-xs font-bold ${stat.trend === 'up' ? 'text-green-500' : stat.trend === 'down' ? 'text-red-500' : 'text-gray-400'}`}>
                                    {stat.change}
                                </span>
                                <span className="text-[10px] text-gray-400 uppercase font-medium">vs last month</span>
                            </div>
                        </div>
                        <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Spending Chart Placeholder */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-lg font-bold text-gray-800">Spending Overview</h3>
                        <select className="bg-gray-50 border-none text-xs font-bold rounded-lg px-3 py-1.5 focus:ring-0">
                            <option>Weekly</option>
                            <option>Monthly</option>
                            <option>Yearly</option>
                        </select>
                    </div>
                    <div className="h-64 flex items-end justify-between gap-2 px-2">
                        {[40, 65, 45, 90, 55, 75, 50, 85, 60, 95, 70, 80].map((height, i) => (
                            <div key={i} className="flex-1 group relative">
                                <div
                                    className="w-full bg-blue-100 rounded-t-lg group-hover:bg-blue-600 transition-all duration-300"
                                    style={{ height: `${height}%` }}
                                ></div>
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                    ${(height * 10).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                        <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                    </div>
                </div>

                {/* Category Breakdown */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">Top Categories</h3>
                    <div className="space-y-6">
                        {[
                            { name: 'Electronics', percent: 45, color: 'bg-blue-500' },
                            { name: 'Fashion', percent: 25, color: 'bg-purple-500' },
                            { name: 'Home & Living', percent: 15, color: 'bg-emerald-500' },
                            { name: 'Others', percent: 15, color: 'bg-orange-500' },
                        ].map((cat, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-center text-sm font-bold mb-2">
                                    <span className="text-gray-700">{cat.name}</span>
                                    <span className="text-gray-400">{cat.percent}%</span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.percent}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-50">
                        <button className="w-full py-3 bg-gray-50 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all">
                            View Full Breakdown
                        </button>
                    </div>
                </div>
            </div>

            {/* Recent Activity Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-50">
                    <h3 className="text-lg font-bold text-gray-800">Recent Insights</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                <th className="px-6 py-4">Insight</th>
                                <th className="px-6 py-4">Impact</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {[
                                { tip: 'Unused subscription detected in electronics', impact: 'Save $15/mo', status: 'High', color: 'text-red-600' },
                                { tip: '3 items in your wishlist have a price drop', impact: 'Save $45.00', status: 'Medium', color: 'text-blue-600' },
                                { tip: 'Bulk purchase available for recurring items', impact: 'Save 10%', status: 'Low', color: 'text-emerald-600' },
                            ].map((item, i) => (
                                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{item.tip}</td>
                                    <td className="px-6 py-4 text-sm font-black text-gray-900">{item.impact}</td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg bg-gray-100 ${item.color}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-blue-600 hover:text-blue-800 font-bold text-sm">View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
