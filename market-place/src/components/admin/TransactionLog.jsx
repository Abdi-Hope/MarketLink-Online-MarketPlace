import React from 'react';

const TransactionLog = () => {
  const transactions = [
    { id: 'TX001', user: 'john@email.com', type: 'Purchase', amount: 89.99, status: 'Completed', date: '2024-01-15 14:30' },
    { id: 'TX002', user: 'sarah@email.com', type: 'Refund', amount: -45.50, status: 'Processed', date: '2024-01-15 11:15' },
    { id: 'TX003', user: 'mike@email.com', type: 'Purchase', amount: 129.99, status: 'Completed', date: '2024-01-14 16:45' },
    { id: 'TX004', user: 'emma@email.com', type: 'Withdrawal', amount: -200.00, status: 'Pending', date: '2024-01-14 09:20' },
    { id: 'TX005', user: 'david@email.com', type: 'Purchase', amount: 34.99, status: 'Failed', date: '2024-01-13 19:10' },
    { id: 'TX006', user: 'lisa@email.com', type: 'Subscription', amount: 9.99, status: 'Completed', date: '2024-01-13 08:45' },
    { id: 'TX007', user: 'alex@email.com', type: 'Purchase', amount: 199.99, status: 'Completed', date: '2024-01-12 22:30' },
    { id: 'TX008', user: 'tina@email.com', type: 'Refund', amount: -79.99, status: 'Processed', date: '2024-01-12 15:40' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Processed': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAmountColor = (amount) => {
    return amount >= 0 ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">Transaction Log</h3>
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
              Export
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Filter
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4 font-mono text-sm text-gray-900">{tx.id}</td>
                <td className="py-4 px-4 text-gray-600">{tx.user}</td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    tx.type === 'Purchase' ? 'bg-purple-100 text-purple-800' :
                    tx.type === 'Refund' ? 'bg-pink-100 text-pink-800' :
                    tx.type === 'Withdrawal' ? 'bg-orange-100 text-orange-800' :
                    'bg-indigo-100 text-indigo-800'
                  }`}>
                    {tx.type}
                  </span>
                </td>
                <td className={`py-4 px-4 font-medium ${getAmountColor(tx.amount)}`}>
                  ${Math.abs(tx.amount).toFixed(2)}
                  {tx.amount < 0 && <span className="ml-1 text-xs">(deducted)</span>}
                </td>
                <td className="py-4 px-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(tx.status)}`}>
                    {tx.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-500 text-sm">{tx.date}</td>
                <td className="py-4 px-4">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of{' '}
            <span className="font-medium">256</span> transactions
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
              1
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionLog;