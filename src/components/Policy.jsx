import React from 'react';
import { FaShippingFast, FaUndoAlt, FaTags, FaHeadset } from 'react-icons/fa';

const Policy = () => {
  const services = [
    {
      icon: <FaShippingFast />,
      text: 'Free Shipping',
      description: 'On orders over $50',
    },
    {
      icon: <FaUndoAlt />,
      text: 'Free Returns',
      description: 'Within 30 days',
    },
    {
      icon: <FaTags />,
      text: 'Get 20% Off',
      description: 'On your first order',
    },
    {
      icon: <FaHeadset />,
      text: '24/7 Support',
      description: 'Dedicated help center',
    },
  ];

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-8 text-center">Our Services</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="group flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="mb-2">
              <div className="text-3xl text-purple-600 transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">{service.text}</h3>
            {service.description && (
              <p className="text-sm text-gray-600">{service.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Policy;