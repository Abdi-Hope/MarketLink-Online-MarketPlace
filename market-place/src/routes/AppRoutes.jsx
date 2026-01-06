// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Import ONLY pages that exist
import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import CartPage from '../pages/CartPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import DashboardPage from '../pages/DashboardPage';
import AdminPage from '../pages/AdminPage';
import SellerDashboardPage from '../pages/SellerDashboardPage';
import ProfilePage from '../pages/ProfilePage';
import OrdersPage from '../pages/OrdersPage';
import CategoriesPage from '../pages/CategoriesPage';
import SettingsPage from '../pages/SettingsPage';
import WishlistPage from '../pages/WishlistPage';
import NotFoundPage from '../pages/NotFoundPage';

// Simple placeholder pages for missing routes
const HelpPage = () => <div className="p-8"><h1>Help</h1><p>Help page</p></div>;
const CategoryPage = () => {
  const params = new URLSearchParams(window.location.search);
  const category = params.get('category') || 'all';
  return <div className="p-8"><h1>Category: {category}</h1></div>;
};
const SearchPage = () => {
  const params = new URLSearchParams(window.location.search);
  const query = params.get('q') || '';
  return <div className="p-8"><h1>Search: {query}</h1></div>;
};
const TermsPage = () => <div className="p-8"><h1>Terms</h1></div>;
const PrivacyPage = () => <div className="p-8"><h1>Privacy</h1></div>;
const SellerRegisterPage = () => <div className="p-8"><h1>Become a Seller</h1></div>;

// Layouts
import MainLayout from '../components/layout/MainLayout';
import DashboardLayout from '../components/layout/DashboardLayout';
import AdminLayout from '../components/layout/AdminLayout';
import SellerLayout from '../components/layout/SellerLayout';
import ProtectedRoute from '../components/common/ProtectedRoute';

const AppRoutes = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes - NO MainLayout wrapper here */}
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/category" element={<CategoryPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/seller/register" element={<SellerRegisterPage />} />
      <Route path="/help" element={<HelpPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />

      {/* Protected Routes - NO MainLayout wrapper */}
      <Route path="/cart" element={
        <ProtectedRoute>
          <CartPage />
        </ProtectedRoute>
      } />
      
      <Route path="/profile" element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      } />
      
      <Route path="/orders" element={
        <ProtectedRoute>
          <OrdersPage />
        </ProtectedRoute>
      } />
      
      <Route path="/settings" element={
        <ProtectedRoute>
          <SettingsPage />
        </ProtectedRoute>
      } />
      
      <Route path="/wishlist" element={
        <ProtectedRoute>
          <WishlistPage />
        </ProtectedRoute>
      } />

      {/* Dashboard - Uses different layout */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <DashboardLayout>
            <DashboardPage />
          </DashboardLayout>
        </ProtectedRoute>
      } />

      {/* Admin - Uses different layout */}
      <Route path="/admin/*" element={
        <ProtectedRoute requireAdmin>
          <AdminLayout>
            <Routes>
              <Route path="/" element={<AdminPage />} />
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
          </AdminLayout>
        </ProtectedRoute>
      } />

      {/* Seller - Uses different layout */}
      <Route path="/seller/*" element={
        <ProtectedRoute requireSeller>
          <SellerLayout>
            <Routes>
              <Route path="/" element={<SellerDashboardPage />} />
              <Route path="*" element={<Navigate to="/seller" replace />} />
            </Routes>
          </SellerLayout>
        </ProtectedRoute>
      } />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;