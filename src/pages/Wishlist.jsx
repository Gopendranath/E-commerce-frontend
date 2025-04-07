import React from 'react';
import { useDispatch } from 'react-redux';
import { removeOne as removeFromWishlist, clearWishList } from '../redux/slices/wishListSlice';
import { addToCart, addMultipleToCart } from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';

function WishListPage() {
  const [wishlistItems, setWishlistItems] = React.useState([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    // Function to update state from localStorage
    const loadWishlist = () => {
      const wishlist = JSON.parse(localStorage.getItem('wishList')) || [];
      setWishlistItems(wishlist);
    };

    // Load initial wishlist
    loadWishlist();

    // Listen for changes in localStorage (e.g., from other tabs)
    const handleStorageChange = (event) => {
      // Check if the key changed is 'wishList'
      if (event.key === 'wishList') {
        loadWishlist();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount


  const handleRemoveItem = (item) => {
    dispatch(removeFromWishlist({ id: item.id }));
    setWishlistItems(prevItems => prevItems.filter(i => i.id !== item.id));
  };

  const handleAddItemToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleAddAllToCart = () => {
    const currentWishlist = JSON.parse(localStorage.getItem('wishList')) || []; // Read fresh data
    if (currentWishlist.length > 0) {
      dispatch(addMultipleToCart(currentWishlist));
      dispatch(clearWishList()); // This should also update localStorage via the slice/middleware
      setWishlistItems([]); // Update local state
    } else {
      alert("Your wishlist is empty.");
    }
  };

  const handleClearWishlist = () => {
    const currentWishlist = JSON.parse(localStorage.getItem('wishList')) || []; // Read fresh data
    if (currentWishlist.length > 0 && window.confirm("Are you sure you want to clear your entire wishlist?")) {
      dispatch(clearWishList()); // This should also update localStorage via the slice/middleware
      setWishlistItems([]); // Update local state
    } else if (currentWishlist.length === 0) {
      alert("Your wishlist is already empty.");
    }
  };

  // Get current count directly from state for display consistency
  const currentItemCount = wishlistItems.length;

  return (
    // Adjusted padding for smaller screens
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      {currentItemCount > 0 && (
        // Adjusted title size for smaller screens
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-900">
          My Wishlist
        </h1>
      )}

      {currentItemCount === 0 ? (
        <div className="container mx-auto px-4 py-12 text-center">
          {/* Adjusted title size for smaller screens */}
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
            Your Wishlist is Empty
          </h1>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added anything to your wishlist yet.
          </p>
          <Link
            to="/"
            className="inline-block bg-purple-600 text-white font-medium py-2 px-5 sm:px-6 rounded-md hover:bg-purple-700 transition duration-200 text-sm sm:text-base"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          {/* Responsive action buttons container */}
          <div className="flex flex-row justify-between gap-9 mb-4 sm:mb-6">
            {/* Stack buttons vertically on small screens, row on sm and up */}
            {/* Make buttons full width on small screens, auto width on sm and up */}
            <button
              onClick={handleAddAllToCart}
              className="w-full sm:w-auto cursor-pointer bg-purple-700 text-white px-4 py-2 rounded-md shadow hover:bg-purple-800 transition-colors duration-200 text-sm sm:text-base"
            >
              Move All to Cart ({currentItemCount})
            </button>
            <button
              onClick={handleClearWishlist}
              className="w-full sm:w-auto cursor-pointer bg-rose-700 text-white px-4 py-2 rounded-md shadow hover:bg-rose-800 transition-colors duration-200 text-sm sm:text-base"
            >
              Clear Wishlist
            </button>
          </div>

          {/* Grid layout: 1 column default, 2 columns on md and up. Adjusted gap. */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                // Adjusted padding and item alignment for smaller screens
                className="border border-gray-200 rounded-lg p-3 sm:p-4 shadow-sm flex items-center space-x-3 sm:space-x-4 bg-white"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  // Slightly smaller image on small screens
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded flex-shrink-0" // Added flex-shrink-0
                />
                <div className="flex-1 min-w-0"> {/* Added min-w-0 to prevent text overflow issues */}
                  {/* Adjusted text size for smaller screens */}
                  <Link to={`/product/${item.id}`}>
                    <h2 className="font-semibold text-base sm:text-lg text-gray-800 truncate"> {/* Added truncate */}
                      {item.title}
                    </h2>
                  </Link>
                  <p className="text-sm sm:text-base text-gray-600">${item.price.toFixed(2)}</p>
                </div>
                {/* Buttons stack vertically which is good for mobile. Adjusted size/padding */}
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => handleAddItemToCart(item)}
                    // Adjusted padding and text size
                    className="bg-emerald-600 cursor-pointer text-white px-2 py-1 sm:px-3 rounded-md hover:bg-emerald-700 transition-colors duration-200 text-xs sm:text-sm"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item)}
                    // Adjusted padding and text size
                    className="bg-gray-500 cursor-pointer text-white px-2 py-1 sm:px-3 rounded-md hover:bg-gray-600 transition-colors duration-200 text-xs sm:text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default WishListPage;