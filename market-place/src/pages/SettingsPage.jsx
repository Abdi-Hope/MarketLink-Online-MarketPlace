import React, { useState } from 'react';

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, City, Country',
    notifications: {
      email: true,
      push: true,
      sms: false
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false
    }
  });

  const sections = [
    { id: 'profile', label: 'Profile Settings', icon: '👤' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
    { id: 'privacy', label: 'Privacy', icon: '👁️' },
    { id: 'payment', label: 'Payment', icon: '💳' },
    { id: 'preferences', label: 'Preferences', icon: '⚙️' }
  ];

  const handleInputChange = (field, value) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (type, checked) => {
    setUserData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: checked
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Account Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account preferences and settings</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar - Mobile: Horizontal scroll, Desktop: Vertical */}
        <div className="lg:w-1/4">
          {/* User Profile Summary - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:block bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl">
                👤
              </div>
              <div>
                <h3 className="font-bold text-gray-800 text-lg">{userData.name}</h3>
                <p className="text-gray-600 text-sm truncate max-w-[180px]">{userData.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation - Mobile scrollable tabs */}
          <div className="lg:bg-white lg:rounded-xl lg:shadow-sm lg:overflow-hidden">
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible scrollbar-hide pb-2 lg:pb-0">
              {sections.map(section => (
                <button
                  key={section.id}
                  className={`flex-shrink-0 flex items-center space-x-2 px-4 py-3 lg:py-4 lg:px-6 transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-50 lg:bg-blue-50 text-blue-600 lg:border-l-4 lg:border-l-blue-500'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveSection(section.id)}
                >
                  <span className="text-lg lg:text-base">{section.icon}</span>
                  <span className="text-sm lg:text-base font-medium whitespace-nowrap">
                    {section.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 lg:p-8">
            {/* Mobile User Profile - Only shows on mobile */}
            <div className="lg:hidden mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl">
                  👤
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{userData.name}</h3>
                  <p className="text-gray-600 text-sm truncate max-w-[200px]">{userData.email}</p>
                </div>
              </div>
            </div>

            {/* Section Content */}
            {activeSection === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800">Profile Information</h2>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={userData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={userData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter your email"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={userData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <textarea
                        value={userData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                        placeholder="Enter your address"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Save Profile Changes
                  </button>
                </form>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    {
                      id: 'email',
                      title: 'Email Notifications',
                      description: 'Receive order updates and promotions via email',
                      checked: userData.notifications.email
                    },
                    {
                      id: 'push',
                      title: 'Push Notifications',
                      description: 'Receive real-time updates on your device',
                      checked: userData.notifications.push
                    },
                    {
                      id: 'sms',
                      title: 'SMS Notifications',
                      description: 'Receive text messages for important updates',
                      checked: userData.notifications.sms
                    }
                  ].map(notification => (
                    <div
                      key={notification.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{notification.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{notification.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={notification.checked}
                          onChange={(e) => handleNotificationChange(notification.id, e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'privacy' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800">Privacy Settings</h2>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">Profile Visibility</h4>
                        <p className="text-sm text-gray-600 mt-1">Control who can see your profile</p>
                      </div>
                      <select className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                        <option value="public">Public</option>
                        <option value="friends">Friends Only</option>
                        <option value="private">Private</option>
                      </select>
                    </div>
                  </div>

                  {[
                    {
                      id: 'showEmail',
                      title: 'Show Email Address',
                      description: 'Allow others to see your email address',
                      checked: userData.privacy.showEmail
                    },
                    {
                      id: 'showPhone',
                      title: 'Show Phone Number',
                      description: 'Allow others to see your phone number',
                      checked: userData.privacy.showPhone
                    }
                  ].map(setting => (
                    <div
                      key={setting.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{setting.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{setting.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={setting.checked}
                          onChange={() => {}}
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other Sections Placeholder */}
            {!['profile', 'notifications', 'privacy'].includes(activeSection) && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-800">
                  {sections.find(s => s.id === activeSection)?.label}
                </h2>
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">{sections.find(s => s.id === activeSection)?.icon}</div>
                  <p className="text-gray-600">
                    {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} settings will be available soon.
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons - Bottom of content */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row gap-3">
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex-1 md:flex-none"
              >
                Save All Changes
              </button>
              <button
                onClick={() => globalThis.location.reload()}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex-1 md:flex-none"
              >
                Reset to Default
              </button>
              <button
                onClick={() => {
                  if (globalThis.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                    alert('Account deletion requested. This feature is under development.');
                  }
                }}
                className="px-6 py-3 bg-red-50 text-red-600 border border-red-200 font-medium rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors flex-1 md:flex-none"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation (Alternative to scrollable tabs) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 shadow-lg z-10">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setActiveSection('profile')}
            className={`flex flex-col items-center p-2 ${
              activeSection === 'profile' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <span className="text-lg">👤</span>
            <span className="text-xs mt-1">Profile</span>
          </button>
          <button
            onClick={() => setActiveSection('notifications')}
            className={`flex flex-col items-center p-2 ${
              activeSection === 'notifications' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <span className="text-lg">🔔</span>
            <span className="text-xs mt-1">Notifications</span>
          </button>
          <button
            onClick={() => setActiveSection('privacy')}
            className={`flex flex-col items-center p-2 ${
              activeSection === 'privacy' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <span className="text-lg">👁️</span>
            <span className="text-xs mt-1">Privacy</span>
          </button>
          <button
            onClick={() => setActiveSection('preferences')}
            className={`flex flex-col items-center p-2 ${
              activeSection === 'preferences' ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <span className="text-lg">⚙️</span>
            <span className="text-xs mt-1">More</span>
          </button>
        </div>
      </div>

      {/* Add some padding at bottom for mobile navigation */}
      <div className="h-16 lg:h-0"></div>
    </div>
  );
};

export default SettingsPage;