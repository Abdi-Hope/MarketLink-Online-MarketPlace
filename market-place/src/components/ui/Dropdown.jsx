import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({ 
  trigger,
  children,
  position = 'bottom-left',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const positions = {
    'bottom-left': 'dropdown-bottom-left',
    'bottom-right': 'dropdown-bottom-right',
    'top-left': 'dropdown-top-left',
    'top-right': 'dropdown-top-right'
  };

  return (
    <div className={`dropdown ${className}`} ref={dropdownRef}>
      <div className="dropdown-trigger" onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>
      
      {isOpen && (
        <div className={`dropdown-menu ${positions[position]}`}>
          {children}
        </div>
      )}
    </div>
  );
};

const DropdownItem = ({ children, onClick, className = '', ...props }) => {
  return (
    <div 
      className={`dropdown-item ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

const DropdownDivider = () => {
  return <div className="dropdown-divider"></div>;
};

Dropdown.Item = DropdownItem;
Dropdown.Divider = DropdownDivider;

export default Dropdown;