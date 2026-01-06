// src/components/common/Footer.jsx
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom'; // Add this

const Footer = () => {
  const footerLinks = {
    'Quick Links': [
      { name: 'Home', path: '/' },
      { name: 'Products', path: '/products' },
      { name: 'Categories', path: '/categories' },
      { name: 'Sellers', path: '/sellers' },
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
    ],
    'Support': [
      { name: 'Help Center', path: '/help' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Shipping Info', path: '/shipping' },
      { name: 'Returns', path: '/returns' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
    ],
    'Account': [
      { name: 'My Account', path: '/profile' },
      { name: 'Order History', path: '/orders' },
      { name: 'Wishlist', path: '/wishlist' },
      { name: 'Newsletter', path: '/newsletter' },
      { name: 'Seller Portal', path: '/seller' },
      { name: 'Affiliate Program', path: '/affiliate' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        {/* ... other footer content ... */}
        
        {/* Updated links section */}
        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold mb-4">{category}</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        
        {/* ... rest of footer ... */}
      </div>
    </footer>
  );
};

export default Footer;