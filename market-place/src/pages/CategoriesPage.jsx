// src/pages/CategoriesPage.jsx
import React, { useEffect, useState } from 'react';
import CategoryGrid from '../components/home/CategoryGrid';
// Helmet import removed – SEO handled elsewhere or package can be added later

/**
 * CategoriesPage – a premium landing page that showcases all product categories.
 * It pulls category data from the backend (if available) and falls back to the
 * default list defined in CategoryGrid when the request fails.
 */
const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Attempt to fetch categories from the API. The endpoint is a placeholder –
        // replace with the real one when the backend is ready.
        fetch('/api/categories')
            .then((res) => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then((data) => {
                setCategories(data);
                setLoading(false);
            })
            .catch(() => {
                // If the API call fails, we simply keep the grid empty – CategoryGrid
                // will render its built‑in default categories.
                setLoading(false);
            });
    }, []);

    return (
        <>
            {/* SEO block removed – add Helmet package if needed */}

            {/* Page container – premium background & animation */}
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-12 relative overflow-hidden">
                {/* Animated blobs for visual flair */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
                    <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    {/* Hero section */}
                    <div className="text-center mb-12">
                        <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                            Browse All Categories
                        </h1>
                        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                            Find exactly what you need – from the latest gadgets to timeless fashion. Dive in and start shopping!
                        </p>
                    </div>

                    {/* Category grid – shows a loading spinner while data loads */}
                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
                        </div>
                    ) : (
                        <CategoryGrid categories={categories} />
                    )}
                </div>
            </div>
        </>
    );
};

export default CategoriesPage;
