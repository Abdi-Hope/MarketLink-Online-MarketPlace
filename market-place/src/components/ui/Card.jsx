import React from 'react';

const Card = ({ 
  children, 
  title,
  subtitle,
  header,
  footer,
  className = '',
  hoverable = false,
  ...props
}) => {
  return (
    <div className={`card ${hoverable ? 'card-hover' : ''} ${className}`} {...props}>
      {(title || header) && (
        <div className="card-header">
          {header || (
            <>
              {title && <h3 className="card-title">{title}</h3>}
              {subtitle && <p className="card-subtitle">{subtitle}</p>}
            </>
          )}
        </div>
      )}
      
      <div className="card-body">
        {children}
      </div>
      
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;