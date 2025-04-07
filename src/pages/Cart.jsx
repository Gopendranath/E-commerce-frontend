import React, { useState, useEffect } from 'react'; // Add useEffect import
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from '../redux/slices/cartSlice';
import { toast } from 'react-hot-toast';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // --- Pagination Calculations ---
  const totalPages = Math.ceil(cartItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = cartItems.slice(startIndex, endIndex);

  // --- Sync currentPage with totalPages ---
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages); // Reset to last valid page
    } else if (totalPages === 0 && cartItems.length === 0) {
      setCurrentPage(1); // Reset to page 1 when cart is empty
    }
  }, [cartItems.length, currentPage, totalPages]); // Depend on cartItems.length

  // --- Cart Calculations ---
  const calculateItemSubtotal = (item) => {
    return item.price * item.quantity;
  };

  const calculateCartSubtotal = () => {
    return cartItems.reduce((total, item) => total + calculateItemSubtotal(item), 0);
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Cart cleared!");
  }

  const cartSubtotal = calculateCartSubtotal();
  const shippingEstimate = cartSubtotal > 50 || cartItems.length === 0 ? 0 : 7.99;
  const taxEstimate = cartSubtotal * 0.08;
  const orderTotal = cartSubtotal + shippingEstimate + taxEstimate;

  // Empty Cart View
  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-18 text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Your Shopping Cart is Empty</h1>
        <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link
          to="/"
          className="inline-block bg-purple-600 text-white font-medium py-2 px-6 rounded-md hover:bg-purple-700 transition duration-200"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  // Cart View with Items (unchanged below this point)
  return (
    <div className="bg-gradient-to-tl from-violet-50 to-fuchsia-100 min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center md:text-left">
          Your Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {currentItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 sm:grid-cols-3 items-center p-4 border-b border-gray-200 last:border-b-0"
                >
                  {/* Product Info */}
                  <div className="grid grid-cols-2 items-center gap-4 sm:col-span-1">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-scale-down rounded border border-gray-100"
                    />
                    <div>
                      <Link
                        to={`/product/${item.id}`}
                        className="text-sm font-medium text-gray-800 hover:text-indigo-600 line-clamp-2"
                      >
                        {item.title}
                      </Link>
                      <p className="text-xs text-gray-500 mt-1">${item.price.toFixed(2)} each</p>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-red-500 hover:text-red-700 text-xs font-medium mt-1 transition duration-150 cursor-pointer"
                        aria-label={`Remove ${item.title}`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center justify-center sm:col-span">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      disabled={item.quantity <= 1}
                      className="px-2 py-1 border border-gray-300 rounded-l text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:text-gray-400"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      readOnly
                      className="w-12 text-center border-t border-b border-gray-300 text-sm py-1 focus:outline-none"
                      aria-label="Item quantity"
                    />
                    <button
                      onClick={() => dispatch(increaseQuantity(item.id))}
                      className="px-2 py-1 border border-gray-300 rounded-r text-gray-600 hover:bg-gray-100"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Item Total Price */}
                  <div className="text-right sm:col-span-1 font-semibold text-gray-800">
                    ${calculateItemSubtotal(item).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination and Clear Cart Controls */}
            <div className="flex justify-between items-center mt-4">
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-gray-900 rounded-md disabled:opacity-50 disabled:cursor-not-allowed underline font-semibold"
                >
                  Prev
                </button>
                <span className="self-center text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-gray-900 rounded-md disabled:opacity-50 disabled:cursor-not-allowed underline font-semibold"
                >
                  Next
                </button>
              </div>
              <button
                onClick={handleClearCart}
                className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition duration-200 font-semibold"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">
                Order Summary
              </h2>
              <div className="space-y-3 mb-6 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-800">${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping estimate</span>
                  <span className="font-medium text-gray-800">
                    {shippingEstimate === 0 ? 'Free' : `$${shippingEstimate.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tax estimate</span>
                  <span className="font-medium text-gray-800">${taxEstimate.toFixed(2)}</span>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-semibold text-gray-800 mb-6">
                  <span>Order total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
                <Link
                  to="/checkout"
                  className="block w-full text-center bg-purple-600 text-white font-medium py-3 rounded-md shadow-sm hover:bg-purple-700 transition duration-200"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  to="/"
                  className="block w-full text-center text-purple-600 font-medium py-2 mt-3 text-sm hover:text-purple-800 transition"
                >
                  or Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;