import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/Productcard';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-[50vh] w-full">
    <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-b-4 border-indigo-500"></div>
  </div>
);

const Collection = () => {
  const { collection } = useParams(); // Get collection name from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);

  const [currentProducts, setCurrentProducts] = useState([]);
  const [sortOption, setSortOption] = useState('default');
  const [clothingFilter, setClothingFilter] = useState('all');

  // Fetch products on mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filter and sort products based on collection and options
  useEffect(() => {
    if (items && items.length > 0 && collection) {
      let filteredProducts = [];

      // Filter by collection
      if (collection === 'electronics') {
        filteredProducts = items.filter((product) => product.category === 'electronics');
      } else if (collection === 'jewelry') {
        filteredProducts = items.filter((product) => product.category === 'jewelery');
      } else if (collection === 'clothing') {
        filteredProducts = items.filter((product) =>
          product.category === "men's clothing" || product.category === "women's clothing"
        );
        // Apply subcategory filter for clothing
        if (clothingFilter === 'men') {
          filteredProducts = filteredProducts.filter((product) => product.category === "men's clothing");
        } else if (clothingFilter === 'women') {
          filteredProducts = filteredProducts.filter((product) => product.category === "women's clothing");
        }
      } else if (collection === 'all') {
        filteredProducts = items;
      }

      // Sort products
      const sortedProducts = [...filteredProducts];
      if (sortOption === 'price-asc') {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (sortOption === 'price-desc') {
        sortedProducts.sort((a, b) => b.price - a.price);
      } else if (sortOption === 'rating-asc') {
        sortedProducts.sort((a, b) => (a.rating?.rate || 0) - (b.rating?.rate || 0));
      } else if (sortOption === 'rating-desc') {
        sortedProducts.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
      }

      setCurrentProducts(sortedProducts);
    } else {
      setCurrentProducts([]);
    }
  }, [items, collection, sortOption, clothingFilter]);

  // Handle collection change
  const handleCollectionChange = (e) => {
    const newCollection = e.target.value;
    navigate(`/category/${newCollection}`);
    setClothingFilter('all'); // Reset clothing filter when changing collection
  };

  // Handle sorting change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Handle clothing subcategory change
  const handleClothingFilterChange = (e) => {
    setClothingFilter(e.target.value);
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'failed') {
    return (
      <div className="text-center text-red-600 text-lg sm:text-xl font-medium py-10">
        Error loading products. Please try again later.
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-6 sm:mb-8">
        Product Collections
      </h1>

      {/* Filters and Sorting */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        {/* Collection Selector */}
        <div className="w-full sm:w-auto">
          <label htmlFor="collection" className="block text-sm font-medium text-gray-700 mb-1 ">
            Select Collection
          </label>
          <select
            id="collection"
            value={collection || 'all'}
            onChange={handleCollectionChange}
            className="w-full sm:w-48 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
          >
            <option value="all">All Collections</option>
            <option value="electronics">Electronics</option>
            <option value="jewelry">Jewelry</option>
            <option value="clothing">Clothing</option>
          </select>
        </div>

        {/* Clothing Subcategory Filter (visible only for clothing) */}
        {collection === 'clothing' && (
          <div className="w-full sm:w-auto">
            <label htmlFor="clothingFilter" className="block text-sm font-medium text-gray-700 mb-1">
              Filter Clothing
            </label>
            <select
              id="clothingFilter"
              value={clothingFilter}
              onChange={handleClothingFilterChange}
              className="w-full sm:w-48 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
            >
              <option value="all">All Clothing</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
            </select>
          </div>
        )}

        {/* Sort Selector */}
        <div className="w-full sm:w-auto">
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={handleSortChange}
            className="w-full sm:w-48 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 cursor-pointer"
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-asc">Rating: Low to High</option>
            <option value="rating-desc">Rating: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Display */}
      {currentProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} item={product} />
          ))}
        </div>
      ) : (
        status !== 'loading' && (
          <div className="text-center text-gray-500 text-base sm:text-lg mt-8 sm:mt-12">
            No products found for this collection.
          </div>
        )
      )}
    </section>
  );
};

export default Collection;