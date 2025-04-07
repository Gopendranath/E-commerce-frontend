import React, { useState, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Function to handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      onClose();
    }
  };

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl p-6 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
          aria-label="Close modal"
        >
          <FiX className="w-6 h-6" />
        </button>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mt-2">
          <div className="relative flex items-center border-b-2 border-gray-300 focus-within:border-blue-500 transition-colors duration-200">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full py-4 pl-3 pr-12 text-lg text-gray-700 bg-transparent outline-none"
              autoFocus
              aria-label="Search products"
            />
            {/* // Submit Button */}
            <button
              type="submit"
              className="absolute right-0 p-3 text-gray-500 hover:text-blue-500 transition-colors duration-200"
              aria-label="Submit search"
            >
              <FiSearch className="w-6 h-6" />
            </button>
          </div>
        </form>
        

        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-2">Try searching for products, categories, or brands</p>
          <div className="flex flex-wrap gap-2">
            {/* // Suggestion Buttons */}
            {['Jewelery', 'Electronics', 'Clothing'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setSearchQuery(suggestion);
                  navigate(`/search?q=${encodeURIComponent(suggestion)}`);
                  onClose();
                }}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


export default SearchModal;