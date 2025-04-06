// src/components/ProfileSection.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../redux/slices/authSlice";
import clsx from 'clsx'; // Optional: for cleaner conditional classes (npm install clsx)

// --- Placeholder Data (Replace with actual data from state/context/API) ---
const placeholderUser = {
  name: 'Alex Thompson',
  email: 'alex.thompson@example.com',
  joinDate: '2023-05-15',
};

const placeholderOrders = [
  { id: 'ORD123', date: '2024-03-10', total: 75.50, status: 'Delivered' },
  { id: 'ORD456', date: '2024-03-22', total: 120.00, status: 'Processing' },
];

const placeholderAddresses = [
  { id: 1, type: 'Home', line1: '123 Main St', city: 'Anytown', state: 'CA', zip: '90210', default: true },
  { id: 2, type: 'Work', line1: '456 Business Ave', city: 'Metropolis', state: 'NY', zip: '10001', default: false },
];

const OrderRow = ({ order }) => (
  <div className="flex flex-wrap justify-between items-center border-b border-gray-200 py-3 text-sm">
    <span className="w-full sm:w-auto font-medium text-indigo-600 mb-1 sm:mb-0">#{order.id}</span>
    <span className="w-1/2 sm:w-auto text-gray-600">{order.date}</span>
    <span className="w-1/2 sm:w-auto text-right sm:text-left font-semibold">${order.total.toFixed(2)}</span>
    <span className={`w-full sm:w-auto text-right sm:text-left mt-1 sm:mt-0 px-2 py-0.5 rounded text-xs font-medium inline-block ${
        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
        'bg-gray-100 text-gray-800' // Add more statuses as needed
    }`}>
      {order.status}
    </span>
  </div>
);

// Simple Address Card (Example)
const AddressCard = ({ address }) => (
  <div className="border border-gray-200 rounded-md p-4 relative">
     {address.default && (
       <span className="absolute top-2 right-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
         Default
       </span>
     )}
    <p className="font-semibold text-gray-800 mb-1">{address.type}</p>
    <p className="text-sm text-gray-600">{address.line1}</p>
    {address.line2 && <p className="text-sm text-gray-600">{address.line2}</p>}
    <p className="text-sm text-gray-600">{address.city}, {address.state} {address.zip}</p>
  </div>
);

// --- Main Profile Component ---
const ProfileSection = ({ user = placeholderUser, orders = placeholderOrders, addresses = placeholderAddresses }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const dispatch = useDispatch();

  // Placeholder action handlers (replace with actual logic)
  const handleLogout = () => {
    dispatch(logout());
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'orders':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order History</h2>
            {orders.length > 0 ? (
              <div className="space-y-2">
                {orders.map(order => <OrderRow key={order.id} order={order} />)}
              </div>
            ) : (
              <p className="text-gray-500">You haven't placed any orders yet.</p>
            )}
          </div>
        );

      case 'addresses':
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Manage Addresses</h2>
              <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition duration-150">
                Add New Address
              </button>
            </div>
            {addresses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map(addr => <AddressCard key={addr.id} address={addr} />)}
              </div>
            ) : (
              <p className="text-gray-500">You haven't saved any addresses yet.</p>
            )}
          </div>
        );

      case 'settings':
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Account Settings</h2>
            <div className="space-y-4">
                {/* Placeholder links/buttons */}
                <button className="text-indigo-600 hover:text-indigo-800 block">Change Password</button>
                <button className="text-indigo-600 hover:text-indigo-800 block">Notification Preferences</button>
                <button className="text-red-600 hover:text-red-800 block mt-4">Delete Account</button>
            </div>
          </div>
        );

      case 'overview': // Default section
      default:
        return (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile Overview</h2>
            <p className="text-gray-600 mb-6">Welcome back, {user.name}!</p>
            <div className="bg-gray-100 p-4 rounded-md space-y-3">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Member Since:</strong> {user.joinDate}</p>
               {/* Add more fields like Phone Number if available */}
            </div>
            <button className="mt-4 text-indigo-600 hover:text-indigo-800 text-sm">
              Edit Profile
            </button>
             {/* Optional: Summary boxes */}
             <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-md text-center">
                    <p className="text-3xl font-bold text-blue-700">{orders.length}</p>
                    <p className="text-sm text-blue-600 mt-1">Total Orders</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-md text-center">
                    <p className="text-3xl font-bold text-purple-700">{addresses.length}</p>
                    <p className="text-sm text-purple-600 mt-1">Saved Addresses</p>
                </div>
             </div>
          </div>
        );
    }
  };

  // Navigation Items Data
  const navItems = [
    { id: 'overview', label: 'Overview', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> },
    { id: 'orders', label: 'Orders', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /> },
    { id: 'addresses', label: 'Addresses', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" /> },
    { id: 'settings', label: 'Settings', icon: <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" /> },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
       <h1 className="text-3xl font-bold text-gray-800 mb-8">My Account</h1>
      <div className="flex flex-col md:flex-row md:space-x-8">

        {/* --- Sidebar Navigation --- */}
        <aside className="w-full md:w-1/4 lg:w-1/5 mb-8 md:mb-0">
          <nav className="space-y-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={clsx(
                  'w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition duration-150 ease-in-out',
                  activeSection === item.id
                    ? 'bg-indigo-100 text-indigo-700' // Active state
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900' // Inactive state
                )}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  {item.icon}
                </svg>
                <span>{item.label}</span>
              </button>
            ))}
            {/* Logout Button */}
             <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-md text-gray-600 hover:bg-red-50 hover:text-red-700 transition duration-150 ease-in-out mt-4"
              >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
               </svg>
               <span>Logout</span>
            </button>
          </nav>
        </aside>

        {/* --- Main Content Area --- */}
        <main className="w-full md:w-3/4 lg:w-4/5 bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-200">
          {renderSectionContent()}
        </main>

      </div>
    </div>
  );
};

export default ProfileSection;