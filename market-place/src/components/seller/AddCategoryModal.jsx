import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle, AlertCircle, Tag, Upload, Image as ImageIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import productService from '../../services/productService';

const AddCategoryModal = ({ isOpen, onClose, onCategoryAdded, categoryToEdit }) => {
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (categoryToEdit) {
            setName(categoryToEdit.name);
            setImageUrl(categoryToEdit.image_url || '');
        } else {
            setName('');
            setImageUrl('');
        }
    }, [categoryToEdit, isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const categoryData = {
                name: name.trim(),
                image_url: imageUrl.trim() || 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800'
            };

            if (categoryToEdit) {
                await productService.updateCategory(categoryToEdit.id, categoryData);
                toast.success('Category updated successfully');
            } else {
                await productService.createCategory(categoryData);
                toast.success('Category created successfully');
            }

            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                onCategoryAdded();
                onClose();
                setName('');
                setImageUrl('');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save category');
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        setUploading(true);
        setError(null);

        try {
            const result = await productService.uploadImage(formData);
            setImageUrl(`http://localhost:5000${result.image}`);
            toast.success('Image uploaded successfully');
        } catch (err) {
            setError('Failed to upload image');
            toast.error('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="flex items-center justify-between px-6 py-5 border-b border-blue-50 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
                            <Tag size={20} className="text-white" />
                        </div>
                        <h2 className="text-xl font-black text-gray-900 tracking-tight">
                            {categoryToEdit ? 'Edit Category' : 'New Category'}
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white hover:text-red-500 rounded-xl transition-all cursor-pointer">
                        <X size={20} className="text-gray-400" />
                    </button>
                </div>

                {success ? (
                    <div className="p-12 text-center bg-white">
                        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-[2rem] flex items-center justify-center mx-auto mb-6 animate-bounce">
                            <CheckCircle size={40} />
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2">
                            {categoryToEdit ? 'Updated!' : 'Created!'}
                        </h3>
                        <p className="text-gray-500 font-medium">
                            The department is now live in your store.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-8 bg-white">
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center text-red-600 text-sm font-bold animate-shake">
                                <AlertCircle size={18} className="mr-3 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        <div className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">
                                    Category Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-gray-700 transition-all placeholder:text-gray-300"
                                    placeholder="e.g. Luxury Footwear"
                                    autoFocus
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">
                                    Category Image
                                </label>
                                <div className="space-y-4">
                                    <div className="flex gap-2">
                                        <input
                                            type="url"
                                            value={imageUrl}
                                            onChange={(e) => setImageUrl(e.target.value)}
                                            className="flex-1 px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none font-bold text-gray-700 transition-all placeholder:text-gray-300"
                                            placeholder="Paste Image URL..."
                                        />
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={uploading}
                                            className="px-5 py-4 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-100 transition-all transition-all cursor-pointer flex items-center gap-2 font-black text-[10px] uppercase tracking-wider"
                                        >
                                            {uploading ? '...' : <Upload size={18} />}
                                            Upload
                                        </button>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            onChange={handleFileUpload}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                    </div>

                                    {/* Image Preview */}
                                    <div className="relative group overflow-hidden rounded-2xl h-40 bg-gray-50 border-2 border-dashed border-gray-100 flex items-center justify-center transition-all hover:border-blue-200">
                                        {imageUrl ? (
                                            <div className="relative w-full h-full">
                                                <img
                                                    src={imageUrl}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    onError={(e) => {
                                                        e.target.src = 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800';
                                                    }}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setImageUrl('')}
                                                    className="absolute top-2 right-2 p-1.5 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-center">
                                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-gray-300">
                                                    <ImageIcon size={24} />
                                                </div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Image Preview</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-10">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 py-4 px-6 rounded-2xl border-none text-gray-500 font-black text-xs uppercase tracking-widest hover:bg-gray-100 bg-gray-50 transition-all cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading || !name.trim()}
                                className={`flex-[2] py-4 px-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-white transition-all flex items-center justify-center cursor-pointer shadow-xl ${loading ? 'bg-blue-400 cursor-wait' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-100 hover:shadow-blue-200 hover:-translate-y-1'
                                    }`}
                            >
                                {loading ? (categoryToEdit ? 'Updating...' : 'Creating...') : (categoryToEdit ? 'Save Changes' : 'Create Department')}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AddCategoryModal;
