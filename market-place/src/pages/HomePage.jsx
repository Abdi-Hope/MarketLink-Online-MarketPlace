// src/pages/HomePage.jsx
import React from 'react';
import HeroSection from '../components/home/HeroSection';
import CategoryGrid from '../components/home/CategoryGrid';
import CategorySection from '../components/home/CategorySection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import SellerSection from '../components/home/SellerSection';
import Testimonials from '../components/home/Testimonials';
import PremiumFeatures from '../components/home/PremiumFeatures';

const HomePage = () => {
  return (
    <div className="w-full">
      {/* Hero Section - Full width */}
      <HeroSection />

      {/* Content Container */}
      <div className="container mx-auto px-4">
        {/* Shop by Category - Interactive Grid */}
        <section className="my-12">
          <CategoryGrid />
        </section>

        {/* Featured Categories */}
        <section className="my-16">
          <CategorySection />
        </section>

        {/* Premium Features Section - Clean White Style */}
        <div className="w-full bg-white -mx-4 md:-mx-8 lg:-mx-12 xl:-mx-[calc((100vw-100%)/2)]">
          <PremiumFeatures />
        </div>

        {/* Featured Products */}
        <section className="py-12 bg-white rounded-[3rem] shadow-sm shadow-blue-50/50 border border-blue-50/30 my-16">
          <div className="mb-12">
            <h2 className="text-3xl font-black text-gray-900 text-center tracking-tight capitalize">Featured Collections</h2>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto mt-4 rounded-full"></div>
            <p className="text-gray-500 text-center mt-6 font-medium max-w-xl mx-auto italic">"Our curated selection of high-performance products and unique finds from top-rated sellers."</p>
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