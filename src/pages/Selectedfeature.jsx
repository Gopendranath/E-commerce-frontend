import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import ProductCard from '../components/Productcard';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-[50vh] w-full">
    <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-b-4 border-indigo-500"></div>
  </div>
);

// Selectedfeature component
const Selectedfeature = () => {
  const { id } = useParams();
  const [currentProducts, setCurrentProducts] = useState([]);
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filter products based on category
  useEffect(() => {
    if (items && items.length > 0 && id) {
      if (id === 'electronics') {
        setCurrentProducts(items.filter((product) => product.category === 'electronics'));
      } else if (id === 'jewelery') {
        setCurrentProducts(items.filter((product) => product.category === 'jewelery'));
      } else if (id === 'clothing') {
        setCurrentProducts([
          ...items.filter((product) => product.category === "men's clothing"),
          ...items.filter((product) => product.category === "women's clothing"),
        ]);
      }
    } else {
      setCurrentProducts([]);
    }
  }, [items, id]);

  // Render loading spinner or error message
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
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-6 sm:mb-8 capitalize">
        Category: {id}
      </h2>
      {/* // Render products */}
      {currentProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} item={product} />
          ))}
        </div>
      ) : (
        status !== 'loading' && (
          <div className="text-center text-gray-500 text-base sm:text-lg mt-8 sm:mt-12">
            No products found for this category.
          </div>
        )
      )}
    </section>
  );
};

export default Selectedfeature;