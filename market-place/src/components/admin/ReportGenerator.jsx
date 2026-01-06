import React, { useState } from 'react';

const ReportGenerator = () => {
  const [reportType, setReportType] = useState('sales');
  const [dateRange, setDateRange] = useState('week');
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTypes = [
    { id: 'sales', label: 'Sales Report', icon: '💰' },
    { id: 'products', label: 'Product Performance', icon: '📦' },
    { id: 'users', label: 'User Analytics', icon: '👥' },
    { id: 'revenue', label: 'Revenue Analysis', icon: '📊' },
  ];

  const dateRanges = [
    { id: 'day', label: 'Today' },
    { id: 'week', label: 'This Week' },
    { id: 'month', label: 'This Month' },
    { id: 'quarter', label: 'This Quarter' },
    { id: 'year', label: 'This Year' },
    { id: 'custom', label: 'Custom Range' },
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert(`Report generated: ${reportType} for ${dateRange}`);
    }, 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Generate Reports</h3>
      
      <div className="space-y-6">
        {/* Report Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Report Type
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {reportTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setReportType(type.id)}
                className={`p-4 rounded-lg border flex flex-col items-center justify-center transition-colors ${
                  reportType === type.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <span className="text-2xl mb-2">{type.icon}</span>
                <span className="text-sm font-medium">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Date Range Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Date Range
          </label>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {dateRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => setDateRange(range.id)}
                className={`py-2 px-3 rounded-md text-sm font-medium ${
                  dateRange === range.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Date Range (if selected) */}
        {dateRange === 'custom' && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        )}

        {/* Format Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Export Format
          </label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input type="radio" name="format" defaultChecked className="text-blue-600" />
              <span className="ml-2">PDF</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="format" className="text-blue-600" />
              <span className="ml-2">Excel</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="format" className="text-blue-600" />
              <span className="ml-2">CSV</span>
            </label>
          </div>
        </div>

        {/* Generate Button */}
        <div className="pt-4">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isGenerating ? 'Generating Report...' : 'Generate Report'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;