import React from 'react';

const Avatar = ({ 
  src, 
  alt = 'Avatar', 
  size = 'md', 
  shape = 'circle',
  fallback = '👤',
  className = ''
}) => {
  const sizes = {
    sm: 'avatar-sm',
    md: 'avatar-md',
    lg: 'avatar-lg',
    xl: 'avatar-xl'
  };

  const shapes = {
    circle: 'avatar-circle',
    square: 'avatar-square',
    rounded: 'avatar-rounded'
  };

  return (
    <div className={`avatar ${sizes[size]} ${shapes[shape]} ${className}`}>
      {src ? (
        <img src={src} alt={alt} className="avatar-image" />
      ) : (
        <div className="avatar-fallback">{fallback}</div>
      )}
    </div>
  );
};

export default Avatar;