import React, { useState, useEffect } from 'react';
import { Tag, Plus, Search, Trash2, Edit2, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import productService from '../../services/productService';
import AddCategoryModal from './AddCategoryModal';
import { toast } from 'react-hot-toast';

const SellerCategories = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const data = await productService.getCategories();
            setCategories(data);
        } catch (err) {
            console.error("Failed to fetch categories:", err);
            toast.error("Failed to load categories");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await productService.deleteCategory(id);
                toast.success('Category deleted successfully');
                fetchCategories();
            } catch (err) {
                toast.error(err.response?.data?.message || 'Failed to delete category');
            }
        }
    };

    const handleEdit = (category) => {
        setSelectedCategory(category);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedCategory(null);
    };

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-transparent p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">Department Management</h1>
                    <p className="text-gray-500 font-medium">Create and organize categories for your products</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                >
                    <Plus size={20} />
                    <span>Create New Category</span>
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-3xl border border-blue-50 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                        <Tag size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Categories</p>
                        <p className="text-2xl font-black text-gray-900">{categories.length}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-emerald-50 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                        <Layers size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Active Departments</p>
                        <p className="text-2xl font-black text-gray-900">{categories.length > 0 ? categories.length : 0}</p>
                    </div>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-4 mb-8">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-gray-700"
                    />
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center p-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : filteredCategories.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredCategories.map(cat => (
                        <div key={cat.id} className="group bg-white rounded-3xl border border-blue-50 hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-500 overflow-hidden flex flex-col">
                            {/* Category Image Header */}
                            <div className="h-40 relative overflow-hidden bg-gray-100">
                                <img
                                    src={cat.image_url || 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800'}
                                    alt={cat.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                    <div className="flex gap-2 w-full justify-center">
                                        <button
                                            onClick={() => handleEdit(cat)}
                                            className="p-2 bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-blue-600 rounded-xl transition-all"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(cat.id)}
                                            className="p-2 bg-white/20 backdrop-blur-md text-white hover:bg-white hover:text-red-500 rounded-xl transition-all"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-black text-gray-900 mb-1 leading-tight">{cat.name}</h3>
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">SLUG: {cat.slug}</p>

                                <div className="mt-6 pt-6 border-t border-gray-50 flex items-center justify-between">
                                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl">Active</span>
                                    <button
                                        onClick={() => navigate(`/category/${cat.id}`)}
                                        className="text-xs font-black text-blue-600 hover:underline cursor-pointer"
                                    >
                                        View Items
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-gray-100">
                    <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Tag size={40} />
                    </div>
                    <h2 className="text-2xl font-black text-gray-900 mb-2">No Categories Found</h2>
                    <p className="text-gray-500 font-medium max-w-sm mx-auto mb-8">
                        Organize your shop by creating custom categories. Products listed in these categories will be easier for customers to find.
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all"
                    >
                        Create Your First Category
                    </button>
                </div>
            )}

            <AddCategoryModal
                isOpen={isModalOpen}
                onClose={handleModalClose}
                onCategoryAdded={fetchCategories}
                categoryToEdit={selectedCategory}
            />
        </div>
    );
};

export default SellerCategories;
