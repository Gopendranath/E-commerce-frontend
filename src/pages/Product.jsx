import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import { toggleWishList } from '../redux/slices/wishListSlice';
import { addToCart } from '../redux/slices/cartSlice';
import Productcard from '../components/Productcard';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import clsx from 'clsx';

const Rating = ({ rate, count }) => {
  const fullStars = Math.floor(rate);
  const halfStar = rate % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  return (
    <div className="flex items-center mb-3 text-lg">
      {[...Array(fullStars)].map((_, i) => <span key={i} className="text-yellow-400">⭐</span>)}
      {halfStar && <span className="text-yellow-400">🌟</span>}
      {[...Array(emptyStars)].map((_, i) => <span key={i} className="text-gray-300">☆</span>)}
      <span className="ml-2 text-sm text-gray-600">({count} reviews)</span>
    </div>
  );
};

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const productId = parseInt(id);
  const product = items.find((item) => item.id === productId);

  const similarProducts = product
    ? items.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4)
    : [];

  useEffect(() => {
    if (product) {
      const wishList = JSON.parse(localStorage.getItem('wishList')) || [];
      setIsWishlisted(wishList.some((p) => p.id === product.id));
    }
  }, [product]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = () => {
    if (product) dispatch(addToCart(product));
  };

  const handleAddToWishlist = () => {
    if (product) {
      dispatch(toggleWishList(product));
      setIsWishlisted((prev) => !prev);
    }
  };

  if (status === 'loading' || !items || items.length === 0) {
    return <div className="text-center py-10 text-gray-500">Loading product details...</div>;
  }

  if (!product) {
    return <div className="text-center py-10 text-red-600">Product not found!</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Product Info */}
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <div className="md:w-2/5 relative border border-gray-200 rounded-lg flex items-center justify-center p-4">
          <img src={product.image} alt={product.title} className="max-h-[400px] object-contain" />
          <button
            onClick={handleAddToWishlist}
            className="absolute top-2 right-2 p-1.5 sm:p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors duration-200 cursor-pointer"
          >
            {isWishlisted ? <AiFillHeart className="w-5 h-5 text-red-500" /> : <AiOutlineHeart className="w-5 h-5 text-gray-600" />}
          </button>
        </div>

        <div className="md:w-3/5 flex flex-col">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 leading-tight">{product.title}</h1>
          <Rating rate={product.rating.rate} count={product.rating.count} />
          <p className="text-3xl font-bold text-[#B12704] mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">{product.description.split('.')[0]}.</p>
          <button
            onClick={handleAddToCart}
            className="w-full md:max-w-xs px-6 py-2.5 bg-[#FF9900] text-gray-900 font-semibold rounded-md border border-[#a88734] hover:bg-[#f3a847] transition duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-gray-200 pt-6">
        <nav className="border-b border-gray-300 mb-6 flex space-x-6 overflow-x-auto">
          {['description', 'additionalInfo', 'shipping', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                'py-3 px-1 whitespace-nowrap border-b-2 font-medium text-sm',
                activeTab === tab ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              {tab === 'description' && 'Description'}
              {tab === 'additionalInfo' && 'Additional Information'}
              {tab === 'shipping' && 'Shipping & Returns'}
              {tab === 'reviews' && `Reviews (${product.rating.count})`}
            </button>
          ))}
        </nav>

        <div className="prose max-w-none">
          {activeTab === 'description' && <p>{product.description}</p>}
          {activeTab === 'additionalInfo' && (
            <ul className="list-none p-0">
              <li><strong>Category:</strong> {product.category}</li>
              <li><strong>Item ID:</strong> {product.id}</li>
            </ul>
          )}
          {activeTab === 'shipping' && (
            <p>Standard shipping: 3-5 business days. Express shipping available at checkout.</p>
          )}
          {activeTab === 'reviews' && (
            <div>
              <Rating rate={product.rating.rate} count={product.rating.count} />
              <p>Average rating: {product.rating.rate} out of 5</p>
              <p><em>No user reviews yet.</em></p>
            </div>
          )}
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">Similar Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map(item => <Productcard key={item.id} item={item} />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
