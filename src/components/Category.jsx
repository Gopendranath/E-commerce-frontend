import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlinePhoneAndroid, MdOutlineGridView } from "react-icons/md";
import { IoDiamondOutline, IoShirtOutline } from "react-icons/io5";

const categories = [
  { name: 'Electronics', path: '/category/electronics', IconComponent: MdOutlinePhoneAndroid },
  { name: 'Jewelry', path: '/category/jewelry', IconComponent: IoDiamondOutline },
  { name: 'Clothing', path: '/category/clothing', IconComponent: IoShirtOutline },
  { name: 'Shop All', path: '/category/all', IconComponent: MdOutlineGridView },
];

// Carousel items with text and background colors
const carouselItems = [
  { text: 'Discover the Latest Gadgets', bgColor: 'bg-blue-500' },
  { text: 'Elegant Jewelry Collections', bgColor: 'bg-purple-500' },
  { text: 'Trendy Clothing Styles', bgColor: 'bg-green-500' },
  { text: 'Explore All Categories', bgColor: 'bg-gray-500' },
];

const CategorySection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === carouselItems.length - 1 ? 0 : prevSlide + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <section className="">
      {/* Category Grid */}
      <h1 className="text-center mb-8 md:mb-10">
        <span className="text-3xl md:text-4xl font-semibold text-gray-800">Shop by Category</span>
      </h1>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="group flex flex-col items-center space-y-3 text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md hover:bg-white/70 transition-all duration-300 ease-in-out"
              aria-label={`Shop ${category.name}`}
            >
              <div className="flex-shrink-0">
                <category.IconComponent
                  className="w-8 h-8 text-purple-600 group-hover:text-purple-700 transition-colors duration-300"
                  aria-hidden="true"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-base font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Auto Carousel */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="relative w-full h-32 md:h-40 lg:h-48 overflow-hidden rounded-xl shadow-md">
          {carouselItems.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 flex items-center justify-center text-white text-lg md:text-xl lg:text-2xl font-semibold transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              } ${item.bgColor}`}
            >
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;