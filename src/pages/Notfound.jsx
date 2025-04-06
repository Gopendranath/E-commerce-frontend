import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-full px-4 py-16 sm:py-24">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-8xl sm:text-9xl font-extrabold tracking-tight bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-md">
          404
        </h1>

        <div className="mt-6 mb-8">
          <svg
            className="w-16 h-16 mx-auto text-purple-400 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>

        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3">
          Oops! Page Lost in Space
        </h2>
        <p className="text-base text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
          The page you tried to reach seems to be missing or was moved. Don't worry,
          you can easily find your way back.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-base font-medium rounded-lg shadow-md
                       hover:from-purple-600 hover:to-indigo-700 hover:shadow-lg
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                       transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
          >
            Go Back Home
          </Link>

          <Link
            to="/category/all"
            className="px-6 py-3 border border-purple-500 text-purple-600 text-base font-medium rounded-lg
                       hover:bg-purple-50 hover:text-purple-700 hover:border-purple-600
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
                       transition-colors duration-300 ease-in-out"
          >
            Browse Collections
          </Link>
        </div>
         {/* ... (end of your enhanced NotFound content) ... */}
      </div>
    </div>
  );
};

export default NotFound;