import React, { useState } from 'react';

const Rating = ({
  value = 0,
  max = 5,
  size = 'md',
  readOnly = false,
  onChange,
  className = ''
}) => {
  const [hoverValue, setHoverValue] = useState(0);

  const sizes = {
    sm: 'rating-sm',
    md: 'rating-md',
    lg: 'rating-lg'
  };

  const handleClick = (newValue) => {
    if (!readOnly && onChange) {
      onChange(newValue);
    }
  };

  const handleMouseEnter = (newValue) => {
    if (!readOnly) {
      setHoverValue(newValue);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverValue(0);
    }
  };

  const displayValue = hoverValue || value;

  return (
    <div 
      className={`rating ${sizes[size]} ${readOnly ? 'rating-readonly' : ''} ${className}`}
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: max }, (_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            className={`rating-star ${starValue <= displayValue ? 'rating-star-filled' : 'rating-star-empty'}`}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            style={{ cursor: readOnly ? 'default' : 'pointer' }}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default Rating;