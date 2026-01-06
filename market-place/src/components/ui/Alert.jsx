import React from 'react';

const Alert = ({ type = 'info', message, onClose, children }) => {
  const alertTypes = {
    success: { class: 'alert-success', icon: '✅' },
    error: { class: 'alert-error', icon: '❌' },
    warning: { class: 'alert-warning', icon: '⚠️' },
    info: { class: 'alert-info', icon: 'ℹ️' },
  };

  const alertConfig = alertTypes[type] || alertTypes.info;

  return (
    <div className={`alert ${alertConfig.class}`}>
      <div className="alert-content">
        <span className="alert-icon">{alertConfig.icon}</span>
        <div className="alert-message">
          {message || children}
        </div>
      </div>
      {onClose && (
        <button className="alert-close" onClick={onClose}>
          ✕
        </button>
      )}
    </div>
  );
};

export default Alert;