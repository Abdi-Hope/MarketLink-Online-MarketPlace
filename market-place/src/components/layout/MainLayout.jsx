// src/components/layout/MainLayout.jsx
import React from 'react';
import Header from '../common/Header';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header and Navbar at top */}
      <Header />
      <Navbar />
      
      {/* Main content area */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer at bottom */}
      <Footer />
    </div>
  );
};

export default MainLayout;