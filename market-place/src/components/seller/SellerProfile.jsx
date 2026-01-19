import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { toast } from "react-hot-toast";
import { Store, Mail, Phone, MapPin, Camera, Save, RefreshCcw } from "lucide-react";

const SellerProfile = () => {
  const { user, updateProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    storeName: user?.storeName || "My Awesome Store",
    description: user?.description || "Providing the best products for our customers.",
    category: user?.category || "Electronics",
    email: user?.email || "seller@example.com",
    phone: user?.phone || "+1 (555) 000-0000",
    address: user?.address || "123 Business Way, Tech City"
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (updateProfile) {
        await updateProfile(profileData);
      }
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent p-4 md:p-6 lg:p-8 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 text-center md:text-left">Store Profile</h1>
          <p className="text-gray-600 mt-1 text-center md:text-left">Configure how customers see your business</p>
        </div>
        <div className="flex justify-center md:justify-end gap-3">
          <Link
            to={`/store/${user?.name?.toLowerCase() || 'seller'}`}
            target="_blank"
            className="flex items-center gap-2 px-6 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-bold hover:bg-indigo-100 transition-all border border-indigo-100"
          >
            <Store size={20} />
            <span>View My Store</span>
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="p-3 bg-white border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-all"
          >
            <RefreshCcw size={20} />
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:opacity-50"
          >
            <Save size={20} />
            <span>{loading ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Forms */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-50 pb-4">
              <Store className="text-blue-600" size={24} />
              <h3 className="text-lg font-bold text-gray-800">Business Identity</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Store Name</label>
                <input
                  type="text"
                  value={profileData.storeName}
                  onChange={(e) => setProfileData({ ...profileData, storeName: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Detailed Description</label>
                <textarea
                  rows="4"
                  value={profileData.description}
                  onChange={(e) => setProfileData({ ...profileData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Primary Category</label>
                <select
                  value={profileData.category}
                  onChange={(e) => setProfileData({ ...profileData, category: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
                >
                  <option>Electronics</option>
                  <option>Fashion</option>
                  <option>Home & Garden</option>
                  <option>Books & Games</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-50 pb-4">
              <Mail className="text-blue-600" size={24} />
              <h3 className="text-lg font-bold text-gray-800">Public Contact</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sales Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  disabled
                  className="w-full px-4 py-3 bg-gray-100 border border-transparent rounded-xl text-gray-500 opacity-70 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Support Phone</label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Warehouse Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input
                  type="text"
                  value={profileData.address}
                  onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Visuals & Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
            <div className="relative inline-block mx-auto mb-4 group">
              <div className="w-32 h-32 rounded-full bg-blue-100 border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt="logo" className="w-full h-full object-cover" />
                ) : (
                  <Store size={48} className="text-blue-500" />
                )}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                <Camera size={16} />
              </button>
            </div>
            <h4 className="text-lg font-bold text-gray-800">{profileData.storeName}</h4>
            <p className="text-sm text-gray-500 italic">Established 2024</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Store Reputation</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                <span className="text-sm text-gray-600 font-medium">Global Rating</span>
                <span className="font-bold text-blue-600">4.9/5.0</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                <span className="text-sm text-gray-600 font-medium">Fulfillment Rate</span>
                <span className="font-bold text-green-600">98%</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl">
                <span className="text-sm text-gray-600 font-medium">Customer Returns</span>
                <span className="font-bold text-red-500">2.1%</span>
              </div>
            </div>
          </div>

          <div className="bg-indigo-600 rounded-2xl shadow-lg p-6 text-white overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2">Seller Pro Tips</h3>
              <p className="text-indigo-100 text-sm leading-relaxed mb-4">
                Stores with detailed descriptions and professional logos see 40% more conversion.
              </p>
              <button className="text-xs font-bold uppercase tracking-wider bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-all">
                Learn More
              </button>
            </div>
            <div className="absolute top-0 right-0 -translate-y-4 translate-x-4 opacity-10">
              <Store size={120} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
