import React from 'react';
import PropTypes from 'prop-types';

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* AdminLayout just wraps the AdminPage which has its own sidebar */}
      {children}
    </div>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default AdminLayout;