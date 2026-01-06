// src/pages/HomePage.jsx
import React from 'react';
import HeroSection from '../components/home/HeroSection';
import CategorySection from '../components/home/CategorySection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import SellerSection from '../components/home/SellerSection';
import Testimonials from '../components/home/Testimonials';

const HomePage = () => {
  return (
    <div className="w-full">
      {/* Hero Section - Full width */}
      <HeroSection />
      
      {/* Content Container */}
      <div className="container mx-auto px-4">
        {/* Category Section */}
        <section className="my-12">
          <CategorySection />
        </section>
        
        {/* Featured Products */}
        <section className="my-16">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 text-center">Featured Products</h2>
            <p className="text-gray-600 text-center mt-2">Discover our most popular items</p>
          </div>
          <FeaturedProducts />
        </section>
        
        {/* Seller Section */}
        <section className="my-16">
          <SellerSection />
        </section>
        
        {/* Testimonials */}
        <section className="my-16">
          <Testimonials />
        </section>
      </div>
    </div>
  );
};

export default HomePage;