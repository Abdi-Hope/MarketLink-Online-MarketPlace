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
    { id: 'profile', label: 'Profile Settings' },
    { id: 'security', label: 'Security' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'privacy', label: 'Privacy' },
    { id: 'payment', label: 'Payment Methods' },
    { id: 'preferences', label: 'Preferences' }
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

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Account Settings</h1>
        <p>Manage your account preferences and settings</p>
      </div>

      <div className="settings-container">
        <div className="settings-sidebar">
          <div className="user-profile-summary">
            <div className="user-avatar">👤</div>
            <div className="user-info">
              <h3>{userData.name}</h3>
              <p>{userData.email}</p>
            </div>
          </div>

          <nav className="settings-nav">
            {sections.map(section => (
              <button
                key={section.id}
                className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="settings-content">
          {activeSection === 'profile' && (
            <div className="settings-section">
              <h2>Profile Information</h2>
              <form className="profile-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={userData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    value={userData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows="3"
                  />
                </div>
                <button type="submit" className="save-btn">Save Changes</button>
              </form>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="settings-section">
              <h2>Notification Preferences</h2>
              <div className="notification-settings">
                <div className="notification-item">
                  <div>
                    <h4>Email Notifications</h4>
                    <p>Receive order updates and promotions via email</p>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={userData.notifications.email}
                      onChange={(e) => handleNotificationChange('email', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="notification-item">
                  <div>
                    <h4>Push Notifications</h4>
                    <p>Receive real-time updates on your device</p>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={userData.notifications.push}
                      onChange={(e) => handleNotificationChange('push', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="notification-item">
                  <div>
                    <h4>SMS Notifications</h4>
                    <p>Receive text messages for important updates</p>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={userData.notifications.sms}
                      onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'privacy' && (
            <div className="settings-section">
              <h2>Privacy Settings</h2>
              <div className="privacy-settings">
                <div className="privacy-item">
                  <div>
                    <h4>Profile Visibility</h4>
                    <p>Control who can see your profile</p>
                  </div>
                  <select className="privacy-select">
                    <option value="public">Public</option>
                    <option value="friends">Friends Only</option>
                    <option value="private">Private</option>
                  </select>
                </div>
                <div className="privacy-item">
                  <div>
                    <h4>Show Email Address</h4>
                    <p>Allow others to see your email address</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="privacy-item">
                  <div>
                    <h4>Show Phone Number</h4>
                    <p>Allow others to see your phone number</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="settings-actions">
            <button className="btn btn-primary">Save All Changes</button>
            <button className="btn btn-outline">Reset to Default</button>
            <button className="btn btn-danger">Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;