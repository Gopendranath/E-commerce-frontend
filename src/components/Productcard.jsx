import React, { useState } from 'react';
import { AiFillHeart, AiOutlineHeart, AiFillStar } from 'react-icons/ai';
import { BsCart3 } from 'react-icons/bs';

const ProductCard = ({ item }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        {/* Product Image */}
        <div className="relative">
          <img
            src={item.image}
            alt={(item.title).substring(0, 10)}
            className="w-full h-40 sm:h-48 md:h-64 object-cover object-center"
          />
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="absolute top-2 right-2 p-1.5 sm:p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors duration-200 cursor-pointer"
          >
            {isWishlisted ? (
              <AiFillHeart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
            ) : (
              <AiOutlineHeart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            )}
          </button>
        </div>

        {/* Product Info */}
        <div className="p-3 sm:p-4 md:p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2 flex-wrap">
            {Number(item.rating.count) < 150 ? <span className="px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
              New
            </span> : null}
            <div className="flex items-center text-amber-400">
              <AiFillStar className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="ml-1 text-xs sm:text-sm text-gray-600">{item.rating.rate} ({item.rating.count})</span>
            </div>
          </div>

          <h3 className="text-sm sm:text-base md:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
            {(item.title).substring(0, 15) + (item.title.length > 15 ? '...' : '')}
          </h3>

          <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4 line-clamp-2">
            {(item.description).slice(0, 40) + (item.description.length > 40 ? '...' : '')}
          </p>

          <div className="flex items-center justify-between mb-3 sm:mb-4 mt-auto">
            <div className="flex items-baseline gap-1 sm:gap-2">
              <span className="text-base sm:text-lg md:text-2xl font-bold text-gray-900">${(item.price * 0.8).toFixed(2)}</span>
              <span className="text-xs sm:text-sm text-gray-500 line-through">${(item.price).toFixed(2)}</span>
            </div>
            <span className="text-xs sm:text-sm font-medium text-green-600 hidden sm:block">In Stock</span>
          </div>

          <button className="w-full bg-blue-600 text-white py-2 sm:py-3 px-2 sm:px-4 rounded-lg text-xs sm:text-sm font-medium flex items-center justify-center gap-1 sm:gap-2 hover:bg-blue-700 transition-colors duration-200">
            <BsCart3 className="w-4 h-4 sm:w-5 sm:h-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard