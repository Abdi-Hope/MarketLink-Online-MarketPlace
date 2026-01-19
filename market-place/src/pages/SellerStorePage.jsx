import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Store,
    Search,
    Filter,
    Star,
    MapPin,
    Phone,
    Mail,
    ShoppingCart,
    ChevronRight,
    Package,
    ArrowLeft
} from 'lucide-react';
import { useCart } from '../context/useCart';
import { toast } from 'react-hot-toast';
import productService from '../services/productService';
import LoadingSpinner from '../components/common/LoadingSpinner';

const SellerStorePage = () => {
    const { sellerId } = useParams();
    const { addToCart } = useCart();
    const [loading, setLoading] = useState(true);
    const [seller, setSeller] = useState(null);
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchStoreData = async () => {
            setLoading(true);
            try {
                // Simulate fetching seller specific data
                // In a real app, you'd have getSellerById and getProductsBySeller
                const allProducts = await productService.getProducts();

                // Mock Seller Info
                const mockSeller = {
                    id: sellerId,
                    name: sellerId.charAt(0).toUpperCase() + sellerId.slice(1) + " Official",
                    logo: `https://ui-avatars.com/api/?name=${sellerId}&background=random&size=128`,
                    banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80",
                    description: "Premium curator of high-quality goods. We take pride in our selection and customer service.",
                    rating: 4.9,
                    reviews: 1250,
                    location: "New York, USA",
                    joined: "March 2023",
                    verified: true
                };

                setSeller(mockSeller);
                // For demonstration, use all products as if they belong to this seller
                setProducts(allProducts);
            } catch (err) {
                console.error("Error fetching store data:", err);
                toast.error("Failed to load store");
            } finally {
                setLoading(false);
            }
        };

        fetchStoreData();
    }, [sellerId]);

    const categories = ['All', ...new Set(products.map(p => p.category_name || p.category || 'General'))];

    const filteredProducts = products.filter(p => {
        const categoryMatch = activeCategory === 'All' || (p.category_name === activeCategory || p.category === activeCategory);
        const searchMatch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        return categoryMatch && searchMatch;
    });

    const handleAddToCart = (product) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image_url || product.image,
            quantity: 1
        });
        toast.success(`Added ${product.name} to cart!`);
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>;

    if (!seller) return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <Store size={64} className="text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800">Store Not Found</h2>
            <Link to="/" className="mt-4 text-blue-600 font-bold hover:underline">Back to Home</Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#f8fbff]">
            {/* Store Hero/Banner */}
            <div className="relative h-64 md:h-80 w-full overflow-hidden">
                <img
                    src={seller.banner}
                    alt="Store Banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent h-32"></div>
            </div>

            {/* Store Header Info */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-12">
                <div className="bg-white rounded-3xl shadow-xl border border-blue-50 p-6 md:p-10">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="relative">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-white p-2 shadow-2xl border border-blue-50 overflow-hidden">
                                <img src={seller.logo} alt={seller.name} className="w-full h-full object-cover rounded-2xl" />
                            </div>
                            {seller.verified && (
                                <div className="absolute -top-3 -right-3 w-10 h-10 bg-blue-600 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                                    <Star size={18} className="text-white fill-white" />
                                </div>
                            )}
                        </div>

                        <div className="flex-1 space-y-4">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-black text-gray-900">{seller.name}</h1>
                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 font-bold">
                                        <div className="flex items-center gap-1">
                                            <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                            <span>{seller.rating} ({seller.reviews} reviews)</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin size={16} className="text-blue-500" />
                                            <span>{seller.location}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Package size={16} className="text-purple-500" />
                                            <span>Joined {seller.joined}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 font-black rounded-2xl hover:bg-blue-50 transition-all">
                                        Follow
                                    </button>
                                    <button className="px-6 py-3 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-100 transition-all">
                                        Chat Seller
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-600 text-base leading-relaxed max-w-3xl font-medium">
                                {seller.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Shop Interface */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-12">
                    {/* Sidebar Filters */}
                    <aside className="lg:col-span-1 space-y-8">
                        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-blue-50">
                            <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center gap-2">
                                <Filter size={20} className="text-blue-600" />
                                Shop Departments
                            </h3>
                            <div className="space-y-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeCategory === cat
                                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                                                : 'text-gray-500 hover:bg-blue-50 hover:text-blue-600'
                                            }`}
                                    >
                                        <span>{cat}</span>
                                        <ChevronRight size={14} className={activeCategory === cat ? 'opacity-100' : 'opacity-0'} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
                            <div className="relative z-10">
                                <h4 className="font-black text-xl mb-2">Member Perk!</h4>
                                <p className="text-blue-100 text-sm font-medium mb-6">Following this store gives you exclusive early access to deals.</p>
                                <button className="w-full py-3 bg-white text-blue-700 font-black rounded-xl text-sm">Join Rewards</button>
                            </div>
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                        </div>
                    </aside>

                    {/* Product Feed */}
                    <main className="lg:col-span-3 space-y-8">
                        {/* Search & Sort Bar */}
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-blue-50 flex flex-col md:flex-row gap-4 items-center">
                            <div className="relative flex-1 w-full">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder={`Search in ${seller.name}...`}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium"
                                />
                            </div>
                            <div className="flex items-center gap-2 w-full md:w-auto">
                                <select className="w-full md:w-auto px-4 py-3 bg-gray-50 rounded-xl font-bold text-sm border-none outline-none focus:ring-2 focus:ring-blue-500">
                                    <option>Newest Arrivals</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Best Selling</option>
                                </select>
                            </div>
                        </div>

                        {/* Store Products Grid */}
                        {filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredProducts.map(product => (
                                    <div key={product.id} className="group bg-white rounded-[2rem] border border-blue-50 overflow-hidden hover:shadow-2xl hover:shadow-blue-100/50 transition-all duration-500 flex flex-col">
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={product.image_url || product.image || 'https://via.placeholder.com/300x300?text=Product'}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black uppercase text-blue-600 tracking-widest shadow-sm">
                                                    {product.category_name || product.category || 'General'}
                                                </span>
                                            </div>
                                            <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:scale-110 transition-all shadow-sm">
                                                <Star size={18} />
                                            </button>
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="mb-4">
                                                <h3 className="font-black text-gray-900 text-lg mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                                                    {product.name}
                                                </h3>
                                                <div className="flex items-center gap-1">
                                                    {[1, 2, 3, 4, 5].map(i => (
                                                        <Star key={i} size={12} className={i <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-200"} />
                                                    ))}
                                                    <span className="text-[10px] text-gray-400 font-bold ml-1">(4.8)</span>
                                                </div>
                                            </div>

                                            <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                                                <div>
                                                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Our Price</p>
                                                    <p className="text-2xl font-black text-gray-900">${parseFloat(product.price).toFixed(2)}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleAddToCart(product)}
                                                    className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white hover:bg-blue-700 shadow-lg shadow-blue-100 hover:scale-110 active:scale-95 transition-all"
                                                >
                                                    <ShoppingCart size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white p-20 rounded-[3rem] text-center border border-dashed border-blue-200">
                                <div className="w-24 h-24 bg-blue-50 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Package size={48} />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-2">No Matching Products</h3>
                                <p className="text-gray-500 font-medium">We couldn't find any products in this specific department or matching your search.</p>
                                <button
                                    onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                                    className="mt-6 px-8 py-3 bg-blue-600 text-white font-black rounded-xl hover:bg-blue-700 transition-all"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Sticky Footer CTA */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-lg">
                <div className="bg-gray-900/90 backdrop-blur-xl border border-white/10 p-2 rounded-2xl shadow-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3 pl-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                            <ArrowLeft size={20} className="text-white" />
                        </div>
                        <span className="text-white text-sm font-bold">Shopping at {sellerId}'s Store</span>
                    </div>
                    <Link
                        to="/categories"
                        className="bg-white text-gray-900 px-6 py-2.5 rounded-xl font-black text-xs hover:bg-gray-100 transition-all"
                    >
                        View All Categories
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SellerStorePage;
