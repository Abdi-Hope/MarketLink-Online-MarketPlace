import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { path: '/dashboard/products', label: 'My Products', icon: '📦' },
    { path: '/dashboard/orders', label: 'Orders', icon: '📋' },
    { path: '/dashboard/sales', label: 'Sales', icon: '💰' },
    { path: '/dashboard/messages', label: 'Messages', icon: '✉️' },
    { path: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
    { path: '/dashboard/help', label: 'Help & Support', icon: '❓' },
  ];

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Dashboard Menu</h3>
          <button className="sidebar-close" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `sidebar-link ${isActive ? 'active' : ''}`
                  }
                  onClick={onClose}
                >
                  <span className="sidebar-icon">{item.icon}</span>
                  <span className="sidebar-label">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">👤</div>
            <div className="user-details">
              <p className="user-name">John Doe</p>
              <p className="user-email">john@example.com</p>
            </div>
          </div>
          <button className="logout-btn">
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;