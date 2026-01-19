import React from 'react';
import { FileText, Download, Filter, Search, Calendar, ChevronRight, FileSpreadsheet, FilePlus } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ReportsPage = () => {
    const reports = [
        { name: 'Monthly Spending Summary', date: 'Jan 2024', size: '2.4 MB', type: 'PDF' },
        { name: 'Annual Order History', date: '2023 Full Year', size: '5.1 MB', type: 'CSV' },
        { name: 'Tax Invoice Collection', date: 'Q4 2023', size: '1.8 MB', type: 'ZIP' },
        { name: 'Seller Interaction Report', date: 'Dec 2023', size: '0.9 MB', type: 'PDF' },
    ];

    const handleDownload = (name) => {
        toast.success(`Downloading ${name}...`);
    };

    const generateNew = () => {
        toast.loading('Generating custom report...');
        setTimeout(() => {
            toast.dismiss();
            toast.success('Your custom report is ready!');
        }, 2500);
    };

    return (
        <div className="min-h-screen p-4 md:p-6 lg:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Reports</h1>
                    <p className="text-gray-600 mt-1">Manage and download your transaction documents</p>
                </div>
                <button
                    onClick={generateNew}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                >
                    <FilePlus size={20} />
                    <span>Generate New Report</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="md:col-span-1 space-y-4">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Quick Filters</h3>
                        <div className="space-y-2">
                            {['All Reports', 'Invoices', 'Spending', 'Analytics', 'Custom'].map((filter, idx) => (
                                <button
                                    key={idx}
                                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${idx === 0 ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-50'
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl text-white shadow-xl">
                        <FileSpreadsheet className="text-blue-400 mb-4" size={32} />
                        <h4 className="font-bold text-lg mb-2">Automated Invoices</h4>
                        <p className="text-gray-400 text-xs leading-relaxed mb-4">
                            Send monthly spending reports directly to your email at the end of each month.
                        </p>
                        <button className="w-full py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                            Configure
                        </button>
                    </div>
                </div>

                <div className="md:col-span-3">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-4 sm:p-6 border-b border-gray-50 flex flex-col sm:flex-row gap-4 justify-between items-center text-center sm:text-left">
                            <div className="relative w-full sm:w-72">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search reports..."
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2.5 bg-gray-50 text-gray-500 rounded-xl hover:bg-gray-100 transition-all">
                                    <Filter size={18} />
                                </button>
                                <button className="p-2.5 bg-gray-50 text-gray-500 rounded-xl hover:bg-gray-100 transition-all">
                                    <Calendar size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="divide-y divide-gray-50">
                            {reports.map((report, idx) => (
                                <div key={idx} className="p-6 flex items-center justify-between group hover:bg-gray-50/50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-xl flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                                            <FileText size={24} />
                                        </div>
                                        <div>
                                            <h4 className="text-sm sm:text-base font-bold text-gray-800">{report.name}</h4>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-xs text-gray-400 font-medium">{report.date}</span>
                                                <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                                                <span className="text-xs text-gray-400 font-medium">{report.size}</span>
                                                <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                                                <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-md">{report.type}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleDownload(report.name)}
                                        className="p-3 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-sm transition-all"
                                    >
                                        <Download size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="p-6 bg-gray-50/50 text-center">
                            <button className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-2 mx-auto transition-all group">
                                <span>View Archived Reports</span>
                                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportsPage;
