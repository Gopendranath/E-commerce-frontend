import React, { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart, AiFillStar } from 'react-icons/ai';
import { BsCart3 } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { toggleWishList } from '../redux/slices/wishListSlice';

const ProductCard = ({ item }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const dispatch = useDispatch();

  // Check if the product is wishlisted
  useEffect(() => {
    const wishList = JSON.parse(localStorage.getItem('wishList')) || [];
    setIsWishlisted(wishList.some((product) => product.id === item.id));
  }, [item.id]);

  // Toggle wishlist
  const handleWishList = () => {
    dispatch(toggleWishList(item));
    setIsWishlisted((prev) => !prev);
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-200 relative group">
        {/* Product Image */}
        <div className="relative overflow-hidden">
          <Link to={`/product/${item.id}`}>
            <div className="bg-gray-50 h-40 sm:h-48 md:h-56 flex items-center justify-center p-6">
              <img
                src={item.image}
                alt={item.title}
                className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </Link>
          <button
            onClick={handleWishList}
            className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-violet-400"
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isWishlisted ? (
              <AiFillHeart className="w-6 h-6 text-red-500" />
            ) : (
              <AiOutlineHeart className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4 sm:p-5 flex flex-col flex-grow space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex items-center text-yellow-500 bg-yellow-50 px-2 py-1 rounded-lg">
              <AiFillStar className="w-4 h-4" />
              <span className="ml-1 text-sm font-medium text-gray-800">
                {item.rating.rate}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              ({item.rating.count} reviews)
            </span>
            {Number(item.rating.count) < 150 && (
              <span className="ml-auto px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-lg">
                New Arrival
              </span>
            )}
          </div>
          {/* // Product Title */}
          <Link to={`/product/${item.id}`} className="group">
            <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 group-hover:text-violet-600 transition-colors duration-200 line-clamp-1">
              {item.title}
            </h3>
          </Link>

          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 flex-grow">
            {item.description}
          </p>

          <div className="pt-2">
            <div className="flex flex-col 2xl:flex-row 2xl:items-center 2xl:justify-between">
              <div className="flex flex-col mb-2 2xl:mb-0">
                <span className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
                  ${(item.price * 0.8).toFixed(2)}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm text-gray-400 line-through">
                    ${item.price.toFixed(2)}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-green-600">
                    In Stock
                  </span>
                </div>
              </div>
              {/* // Add to Cart Button */}
              <button
                onClick={() => dispatch(addToCart(item))}
                className="w-full sm:w-auto cursor-pointer bg-violet-600 text-white py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-violet-700 focus:ring-2 focus:ring-violet-300 focus:outline-none transition-all duration-200"
                aria-label="Add to cart"
              >
                <BsCart3 className="w-5 h-5" />
                <span className="hidden lg:inline">Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;