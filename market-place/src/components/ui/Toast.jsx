import React, { useEffect } from 'react';

const Toast = ({ 
  message, 
  type = 'info',
  duration = 5000,
  onClose,
  className = ''
}) => {
  useEffect(() => {
    if (duration && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const types = {
    success: { class: 'toast-success', icon: '✅' },
    error: { class: 'toast-error', icon: '❌' },
    warning: { class: 'toast-warning', icon: '⚠️' },
    info: { class: 'toast-info', icon: 'ℹ️' },
  };

  const toastConfig = types[type] || types.info;

  return (
    <div className={`toast ${toastConfig.class} ${className}`}>
      <div className="toast-content">
        <span className="toast-icon">{toastConfig.icon}</span>
        <span className="toast-message">{message}</span>
      </div>
      {onClose && (
        <button className="toast-close" onClick={onClose}>
          ✕
        </button>
      )}
    </div>
  );
};

export default Toast;