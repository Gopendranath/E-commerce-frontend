import React, { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart, AiFillStar } from 'react-icons/ai';
import { BsCart3 } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from "../redux/slices/cartSlice";
import { toggleWishList } from '../redux/slices/wishListSlice';

const ProductCard = ({ item }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const wishList = JSON.parse(localStorage.getItem("wishList")) || [];
    setIsWishlisted(wishList.some((product) => product.id === item.id));
  }, [item.id]);

  const handleWishList = () => {
    dispatch(toggleWishList(item));
    setIsWishlisted((prev) => !prev);
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col border border-gray-100">
        {/* Product Image */}
        <div className="relative group">
          <Link to={`/product/${item.id}`}>
            <img
              src={item.image}
              alt={item.title.substring(0, 15)}
              className="w-full h-40 sm:h-48 md:h-56 object-contain object-center transition-transform duration-300 group-hover:scale-110 bg-gray-50 p-4"
            />
          </Link>
          <button
            onClick={handleWishList}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 shadow-md hover:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-300"
          >
            {isWishlisted ? (
              <AiFillHeart className="w-5 h-5 text-red-500" />
            ) : (
              <AiOutlineHeart className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4 sm:p-5 flex flex-col flex-grow">
          <div className="flex items-center gap-2 mb-2">
            {Number(item.rating.count) < 150 && (
              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                New
              </span>
            )}
            <div className="flex items-center text-yellow-500">
              <AiFillStar className="w-4 h-4" />
              <span className="ml-1 text-sm text-gray-700">
                {item.rating.rate} ({item.rating.count})
              </span>
            </div>
          </div>
          <Link to={`/product/${item.id}`}>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 hover:text-violet-600 transition-colors duration-200">
              {item.title.substring(0, 25) + (item.title.length > 25 ? '...' : '')}
            </h3>
          </Link>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {item.description.slice(0, 50) + (item.description.length > 50 ? '...' : '')}
          </p>

          <div className="flex items-center justify-between mb-4 mt-auto">
            <div className="flex items-baseline gap-2">
              <span className="text-lg sm:text-xl font-bold text-gray-900">
                ${(item.price * 0.8).toFixed(2)}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ${item.price.toFixed(2)}
              </span>
            </div>
            <span className="text-sm font-medium text-green-700">In Stock</span>
          </div>

          <button
            onClick={() => dispatch(addToCart(item))}
            className="w-full bg-violet-600 text-white py-2.5 px-4 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-violet-700 focus:ring-2 focus:ring-violet-300 focus:outline-none transition-all duration-200"
          >
            <BsCart3 className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;