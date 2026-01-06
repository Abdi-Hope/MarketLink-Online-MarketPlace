import React from 'react';
import { Link } from 'react-router-dom';

const SellerSection = () => {
  const topSellers = [
    {
      id: 1,
      name: 'TechGadgets Pro',
      category: 'Electronics',
      rating: 4.9,
      totalSales: 1245,
      joinDate: '2022',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      verified: true
    },
    {
      id: 2,
      name: 'Fashion Hub',
      category: 'Clothing',
      rating: 4.8,
      totalSales: 892,
      joinDate: '2021',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      verified: true
    },
    {
      id: 3,
      name: 'Home Essentials',
      category: 'Home & Garden',
      rating: 4.7,
      totalSales: 567,
      joinDate: '2023',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      verified: false
    },
    {
      id: 4,
      name: 'Book Paradise',
      category: 'Books & Media',
      rating: 4.9,
      totalSales: 423,
      joinDate: '2020',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      verified: true
    }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Top Sellers
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Shop from our most trusted and verified sellers
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {topSellers.map((seller) => (
            <div key={seller.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-blue-500">
                      <img
                        src={seller.image}
                        alt={seller.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/400x400?text=Seller';
                        }}
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="flex items-center">
                      <h3 className="text-lg font-bold text-gray-900">{seller.name}</h3>
                      {seller.verified && (
                        <span className="ml-2">
                          <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{seller.category}</p>
                    
                    <div className="mt-2 flex items-center">
                      <div className="flex text-yellow-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">{seller.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">{seller.totalSales}</p>
                    <p className="text-gray-500">Sales</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-gray-900">{seller.joinDate}</p>
                    <p className="text-gray-500">Since</p>
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    to={`/seller/${seller.id}`}
                    className="block w-full text-center px-4 py-2 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Visit Store
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-blue-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900">Become a Seller</h3>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
              Join thousands of sellers who are growing their business on MarketLink.
            </p>
            <div className="mt-6">
              <Link
                to="/sell"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Start Selling Today
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">0%</div>
                <div className="text-gray-600">Commission Fee</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">24/7</div>
                <div className="text-gray-600">Seller Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">Secure</div>
                <div className="text-gray-600">Payments</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerSection;