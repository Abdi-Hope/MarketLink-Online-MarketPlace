import React from 'react';

const Badge = ({ 
  children, 
  variant = 'default',
  size = 'md',
  pill = false,
  className = ''
}) => {
  const variants = {
    default: 'badge-default',
    primary: 'badge-primary',
    secondary: 'badge-secondary',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
    info: 'badge-info'
  };

  const sizes = {
    sm: 'badge-sm',
    md: 'badge-md',
    lg: 'badge-lg'
  };

  return (
    <span className={`badge ${variants[variant]} ${sizes[size]} ${pill ? 'badge-pill' : ''} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;