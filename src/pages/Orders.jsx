// src/pages/OrdersPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // For linking to order details
import clsx from 'clsx'; // Optional: for cleaner conditional classes (npm install clsx)

// --- Mock Data Fetching (Replace with your actual API call) ---
const mockOrders = [
  {
    id: 'ORD78A2BC',
    date: '2024-03-15',
    total: 125.80,
    status: 'Delivered',
    items: [
      { id: 1, name: 'Premium Wireless Headphones', qty: 1, image: 'https://via.placeholder.com/64x64.png?text=Item1' },
      { id: 2, name: 'Ergonomic Mousepad', qty: 1, image: 'https://via.placeholder.com/64x64.png?text=Item2' },
    ],
  },
  {
    id: 'ORD55CDE1',
    date: '2024-03-28',
    total: 44.60,
    status: 'Shipped',
    items: [
      { id: 3, name: 'Casual Slim Fit T-Shirt (Blue)', qty: 2, image: 'https://via.placeholder.com/64x64.png?text=Item3' },
    ],
  },
   {
    id: 'ORD91FGH3',
    date: '2024-04-02',
    total: 695.00,
    status: 'Processing',
    items: [
      { id: 4, name: 'Silver Dragon Bracelet', qty: 1, image: 'https://via.placeholder.com/64x64.png?text=Item4' },
    ],
  },
   {
    id: 'ORD34IJK0',
    date: '2024-02-10',
    total: 89.99,
    status: 'Delivered',
    items: [
      { id: 5, name: 'Smartwatch Charger Stand', qty: 1, image: 'https://via.placeholder.com/64x64.png?text=Item5' },
      { id: 6, name: 'Screen Protector Pack (3)', qty: 1, image: 'https://via.placeholder.com/64x64.png?text=Item6' },
       { id: 7, name: 'Extra USB-C Cable', qty: 2, image: 'https://via.placeholder.com/64x64.png?text=Item7' },
    ],
  },
   {
    id: 'ORD11LMN5',
    date: '2024-01-25',
    total: 35.00,
    status: 'Cancelled',
    items: [
      { id: 8, name: 'Funny Coffee Mug', qty: 1, image: 'https://via.placeholder.com/64x64.png?text=Item8' },
    ],
  },
];

const fetchOrders = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockOrders);
    }, 1500); // Simulate network delay
  });
};
// --- End Mock Data ---


// --- Helper: Order Card Component ---
const OrderCard = ({ order }) => {
  const maxVisibleItems = 3; // Show max 3 item previews

  const statusClasses = {
    'Delivered': 'bg-green-100 text-green-800',
    'Shipped': 'bg-blue-100 text-blue-800',
    'Processing': 'bg-yellow-100 text-yellow-800',
    'Cancelled': 'bg-red-100 text-red-800',
    'Pending': 'bg-gray-100 text-gray-800', // Example additional status
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
      {/* Card Header */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex flex-wrap justify-between items-center gap-2 text-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <div>
                <span className="font-medium text-gray-500 mr-1">ORDER PLACED:</span>
                <span className="text-gray-700">{order.date}</span>
            </div>
             <div>
                <span className="font-medium text-gray-500 mr-1">TOTAL:</span>
                <span className="font-semibold text-gray-800">${order.total.toFixed(2)}</span>
            </div>
        </div>
         <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-right sm:text-left">
            <span className="font-medium text-gray-500 mr-1 sm:mr-0">ORDER # {order.id}</span>
              {/* Link to Order Details */}
              <Link
                to={`/orders/${order.id}`} // Adjust route as needed
                className="text-indigo-600 hover:text-indigo-800 hover:underline font-medium"
              >
                View Order Details
              </Link>
         </div>
      </div>

      {/* Card Body - Items Preview */}
      <div className="p-4">
         {/* Status Display */}
          <div className="mb-4">
             <span className={clsx(
                'px-2.5 py-0.5 rounded text-xs font-bold inline-block uppercase tracking-wide',
                statusClasses[order.status] || statusClasses['Pending'] // Default style
             )}>
                 {order.status}
             </span>
              {/* Add expected delivery date if status is Shipped/Processing */}
              {/* { (order.status === 'Shipped' || order.status === 'Processing') && <p className="text-sm text-gray-600 mt-1">Expected delivery: ... </p> } */}
         </div>

         {/* Items List */}
         <div className="space-y-3">
            {order.items.slice(0, maxVisibleItems).map(item => (
                 <div key={item.id} className="flex items-center gap-3 text-sm">
                     <img
                         src={item.image}
                         alt={item.name}
                         className="w-12 h-12 object-contain rounded border border-gray-100 flex-shrink-0"
                     />
                     <div className="flex-grow">
                         <p className="font-medium text-gray-800 line-clamp-1">{item.name}</p>
                         {item.qty > 1 && <p className="text-xs text-gray-500">Quantity: {item.qty}</p>}
                     </div>
                     {/* Optional: Link to product or add to cart again */}
                     {/* <button className="text-indigo-600 text-xs">Buy Again</button> */}
                 </div>
             ))}
             {order.items.length > maxVisibleItems && (
                <p className="text-xs text-gray-500 mt-2 pl-[60px]"> {/* Align with item text */}
                    + {order.items.length - maxVisibleItems} more item(s)
                </p>
             )}
         </div>

        {/* Optional: Actions like Track Package, Return Items */}
        {/* <div className="mt-4 pt-4 border-t border-gray-100 space-x-3">
            <button className="...">Track Package</button>
            <button className="...">Return Items</button>
        </div> */}
      </div>
    </div>
  );
};


// --- Main Orders Page Component ---
const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetchOrders()
      .then(data => {
        setOrders(data);
      })
      .catch(err => {
        console.error("Failed to fetch orders:", err);
        setError("Could not load your orders. Please try again later.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []); // Empty dependency array means this runs once on mount

  // --- Render Logic ---

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">Loading your orders...</p>
        {/* Optional: Add a spinner here */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
       <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Your Orders</h1>
        <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
        <Link
          to="/products" // Link to your main products page
          className="inline-block bg-indigo-600 text-white font-medium py-2 px-6 rounded-md hover:bg-indigo-700 transition duration-200"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className=" min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Orders</h1>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>

        {/* Optional: Pagination if there are many orders */}
        {/* <div className="mt-8 text-center"> ... Pagination controls ... </div> */}
      </div>
    </div>
  );
};

export default OrdersPage;