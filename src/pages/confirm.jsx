import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function OrderConfirmationPage() {
  const location = useLocation();

  // Extract order ID from location state
  const orderId = location.state?.orderId;

  // Render confirmation content
  const confirmationContent = orderId ? (
    <>
      <p className="text-lg text-gray-700 mb-2">
        Your order has been placed successfully!
      </p>
      <p className="text-md text-gray-600 mb-6">
        Your Order ID is: <span className="font-semibold text-gray-900">{orderId}</span>
      </p>
      <p className="text-sm text-gray-500 mb-8">
        You will receive an email confirmation shortly with your order details and tracking information (if applicable).
      </p>
    </>
  ) : (
    <>
      <p className="text-lg text-gray-700 mb-6">
        Thank you for your purchase!
      </p>
      <p className="text-sm text-gray-500 mb-8">
        If you have an account, you can view your order details in your order history. You should also receive an email confirmation soon.
      </p>
    </>
  );

  return (
    <div className="container mx-auto px-4 py-12 sm:py-16 text-center max-w-2xl">
      <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-md mb-8 inline-flex items-center justify-center">
         {/* Simple Checkmark Icon */}
         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
           <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
         </svg>
        <h1 className="text-2xl sm:text-3xl font-bold text-green-800">
          Thank You!
        </h1>
      </div>

      {confirmationContent}

      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
        <Link
          to="/"
          className="inline-block bg-purple-600 text-white font-medium py-2 px-6 rounded-md hover:bg-purple-700 transition duration-200"
        >
          Continue Shopping
        </Link>
        <Link
            to="/orders"
            className="inline-block bg-white border border-purple-400 hover:border-purple-500 text-gray-700 font-medium py-2 px-6 rounded-md hover:bg-gray-300 transition duration-200"
          >
            View Orders
        </Link>
      </div>
    </div>
  );
}

export default OrderConfirmationPage;