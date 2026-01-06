import React, { useState } from 'react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Frequent Shopper',
      content: 'MarketLink has completely changed how I shop online. The variety is amazing and delivery is always on time. Highly recommended!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Business Owner',
      content: 'As a seller, I\'ve seen my sales grow by 300% since joining MarketLink. The platform is easy to use and customer support is excellent.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 3,
      name: 'Emma Wilson',
      role: 'Home Decor Enthusiast',
      content: 'Found unique home decor items that I couldn\'t find anywhere else. Quality is top-notch and sellers are very professional.',
      rating: 4,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 4,
      name: 'David Rodriguez',
      role: 'Tech Reviewer',
      content: 'Great prices on electronics and gadgets. The buyer protection gives me confidence when making big purchases.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Join thousands of satisfied customers and sellers
          </p>
        </div>

        <div className="mt-12">
          <div className="relative">
            {/* Testimonial Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.slice(activeIndex, activeIndex + 2).map((testimonial) => (
                <div key={testimonial.id} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-16 w-16 rounded-full overflow-hidden">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/400x400?text=User';
                          }}
                        />
                      </div>
                    </div>
                    <div className="ml-6">
                      <h4 className="text-lg font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-gray-600">{testimonial.role}</p>
                      <div className="mt-1 flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            className={`w-5 h-5 ${star <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  </div>
                  <blockquote className="mt-6">
                    <p className="text-lg text-gray-700 italic">"{testimonial.content}"</p>
                  </blockquote>
                </div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 space-x-2">
              {[0, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full ${activeIndex === index ? 'bg-blue-600' : 'bg-gray-300'}`}
                  aria-label={`Go to testimonial ${index / 2 + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow">
              <div className="text-4xl font-bold text-blue-600">10K+</div>
              <div className="mt-2 text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow">
              <div className="text-4xl font-bold text-blue-600">5K+</div>
              <div className="mt-2 text-gray-600">Verified Sellers</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow">
              <div className="text-4xl font-bold text-blue-600">50K+</div>
              <div className="mt-2 text-gray-600">Products</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow">
              <div className="text-4xl font-bold text-blue-600">98%</div>
              <div className="mt-2 text-gray-600">Positive Reviews</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;