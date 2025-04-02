// src/components/CategorySection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlinePhoneAndroid, MdOutlineGridView } from "react-icons/md";
import { IoDiamondOutline, IoShirtOutline } from "react-icons/io5";

const categories = [
  { name: 'Electronics', path: '/category/electronics', IconComponent: MdOutlinePhoneAndroid },
  { name: 'Jewelry', path: '/category/jewelry', IconComponent: IoDiamondOutline },
  { name: 'Clothing', path: '/category/clothing', IconComponent: IoShirtOutline },
  { name: 'Shop All', path: '/category/all', IconComponent: MdOutlineGridView },
];

const CategorySection = () => {
  return (
    <section style={{ backgroundColor: 'rgba(249, 249, 249, 0.5)', backdropFilter: 'blur(10px)' }} className="pb-12 md:pb-16 lg:pb-20 pt-6 md:pt-8">
      <h1 className="text-center mb-6 md:mb-8">
        <span className="text-3xl md:text-4xl font-semibold text-gray-800">Shop by Category</span>
      </h1>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- GRID CHANGE HERE --- */}
        {/* Starts as 2 columns, becomes 4 on large screens */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"> {/* Adjusted gap */}
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.path}
              className="group flex flex-col items-center space-y-2 text-center p-5 border border-transparent rounded-lg hover:shadow-sm hover:border-gray-200 hover:backdrop-blur-md hover:bg-white/30 transition-all duration-200 ease-in-out"
              aria-label={`Shop ${category.name}`}
            >
              {/* Icon Area */}
              <div className="flex-shrink-0"> {/* Keeps icon from shrinking */}
                <category.IconComponent
                   // Slightly larger icon might look better when centered
                   className="w-7 h-7 text-purple-600 group-hover:text-purple-700 transition-colors duration-200"
                   aria-hidden="true"
                />
              </div>
              {/* Text Area */}
              <div className="flex-grow"> {/* Allows text container to take space */}
                 {/* text-center added here too for robustness */}
                <h3 className="text-sm font-medium text-center text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;