import React, { useState } from 'react';
import { useAuth } from '../../context/useAuth';
import { toast } from 'react-hot-toast';
import { Lock, Bell, Shield, Eye, EyeOff } from 'lucide-react';

const SellerSettings = () => {
    const { user } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            return toast.error("Passwords do not match");
        }
        setLoading(true);
        // Simulation of password update
        setTimeout(() => {
            toast.success("Password updated successfully");
            setPasswords({ current: '', new: '', confirm: '' });
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-transparent p-4 md:p-6 lg:p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Account Settings</h1>
                <p className="text-gray-600 mt-1">Manage your security and notification preferences</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Side Labels */}
                <div className="md:col-span-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Security</h3>
                    <p className="text-sm text-gray-500">Update your password and secure your account.</p>
                </div>

                {/* Password Form */}
                <div className="md:col-span-2">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <form onSubmit={handlePasswordChange} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={passwords.current}
                                        onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3.5 text-gray-400"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                    <input
                                        type="password"
                                        value={passwords.new}
                                        onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                                    <input
                                        type="password"
                                        value={passwords.confirm}
                                        onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:opacity-50"
                                >
                                    {loading ? "Updating..." : "Update Password"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="md:col-span-1 border-t border-gray-100 pt-8 mt-4 md:mt-0 md:border-t-0">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Notification Preferences</h3>
                    <p className="text-sm text-gray-500">How would you like to be notified about orders?</p>
                </div>

                <div className="md:col-span-2 border-t border-gray-100 pt-8 mt-4 md:mt-0 md:border-t-0">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
                        <label className="flex items-center justify-between cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                    <Bell size={20} />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800">Email Notifications</p>
                                    <p className="text-sm text-gray-500">Get updates on every new order</p>
                                </div>
                            </div>
                            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        </label>

                        <label className="flex items-center justify-between cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                                    <Shield size={20} />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-800">Security Alerts</p>
                                    <p className="text-sm text-gray-500">Account login and security notices</p>
                                </div>
                            </div>
                            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerSettings;
