// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import  CartProvider  from './context/CartProvider';
import { ThemeProvider } from './context/ThemeContext';
import MainLayout from './components/layout/MainLayout'; // MainLayout wraps everything
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            {/* ONLY ONE MainLayout wrapping AppRoutes */}
            <MainLayout>
              <AppRoutes />
            </MainLayout>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;