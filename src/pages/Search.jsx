import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';

const SearchResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items);
    // console.log(products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Extract search query from URL parameters
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('q') || '';
        setSearchQuery(query);

        // Simulate search filtering (replace with API call)
        const results = products.filter((product) =>
            product.title.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );
        
        setSearchResults(results);
    }, [location.search]);

    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-pink-100 via-white to-pink-100 py-12 md:py-16 lg:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button and Search Query Display */}
                <div className="flex items-center mb-8">
                    <button
                        onClick={handleBack}
                        className="flex items-center text-gray-700 hover:text-purple-600 transition-colors duration-300 mr-4"
                        aria-label="Go back"
                    >
                        <FiArrowLeft className="w-6 h-6 mr-2" />
                        Back
                    </button>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        Search Results for "{searchQuery}"
                    </h1>
                </div>

                {/* Search Results */}
                {searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {searchResults.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-4 hover:shadow-lg transition-all duration-300"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                                <h3 className="text-lg font-medium text-gray-700">{product.name}</h3>
                                <p className="text-sm text-gray-500">{product.category}</p>
                                <p className="text-base font-semibold text-gray-900 mt-2">{product.price}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 text-center text-lg">
                        No results found for "{searchQuery}". Please try a different search term.
                    </p>
                )}
            </div>
        </div>
    );
};

export default SearchResultsPage;