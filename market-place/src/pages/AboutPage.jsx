import React from 'react';
import { Users, Target, Rocket, Award, Heart, Globe, ShieldCheck, Zap } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { label: 'Founded', value: '2023', icon: <Rocket size={20} /> },
    { label: 'Active Sellers', value: '10K+', icon: <Users size={20} /> },
    { label: 'Products', value: '500K+', icon: <Award size={20} /> },
    { label: 'Countries', value: '50+', icon: <Globe size={20} /> },
  ];

  const values = [
    {
      title: 'Customer First',
      desc: 'We prioritize our customers experience above all else, ensuring every interaction is seamless and rewarding.',
      icon: <Heart className="text-pink-500" />
    },
    {
      title: 'Global Trust',
      desc: 'Building a secure platform where buyers and sellers can connect with absolute confidence and transparency.',
      icon: <ShieldCheck className="text-blue-500" />
    },
    {
      title: 'Innovation',
      desc: 'Constantly pushing the boundaries of e-commerce with cutting-edge technology and smart solutions.',
      icon: <Zap className="text-yellow-500" />
    },
    {
      title: 'Our Mission',
      desc: 'To empower small businesses and individuals to reach a global market with ease and efficiency.',
      icon: <Target className="text-indigo-500" />
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-900 to-indigo-900 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Revolutionizing the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Digital Market</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed opacity-90">
            MarketPlace is more than just a store. We are a global community of creators,
            entrepreneurs, and shoppers dedicated to quality and trust.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white -mt-10 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            {stats.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-black text-gray-900">{stat.value}</h3>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-3xl overflow-hidden shadow-2xl relative group">
                  <div className="absolute inset-0 flex items-center justify-center text-8xl grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                    🤝
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-white p-4 rounded-2xl shadow-xl hidden md:block">
                  <div className="w-full h-full bg-blue-600 rounded-xl flex flex-col items-center justify-center text-white text-center">
                    <span className="text-3xl font-bold">100%</span>
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Verified Sellers</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story & Vision</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Founded in 2023, MarketPlace emerged from a simple idea: that commerce should be
                accessible, safe, and community-driven. We noticed that many platforms lost the
                personal touch that makes shopping special.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Today, we serve millions of customers across the globe, providing a platform
                where quality meets convenience. Every product on our site is vetted, and every
                seller is verified to ensure you get only the best.
              </p>
              <div className="space-y-4">
                {['Verified Quality', 'Secure Global Shipping', '24/7 Premium Support'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                      <Zap size={14} />
                    </div>
                    <span className="font-bold text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Core Values</h2>
            <p className="text-gray-500 max-w-xl mx-auto">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {v.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{v.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-blue-600 rounded-[3rem] p-12 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-200">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-50"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black mb-6 italic">Ready to start your journey?</h2>
              <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg">
                Join our community today and experience the future of online shopping.
                Whether you're looking to buy or sell, we've got you covered.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="px-10 py-4 bg-white text-blue-600 rounded-2xl font-black hover:bg-blue-50 transition-all shadow-xl shadow-blue-900/20">
                  Get Started
                </button>
                <button className="px-10 py-4 bg-blue-500 text-white rounded-2xl font-black border-2 border-blue-400 hover:bg-blue-400 transition-all">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;