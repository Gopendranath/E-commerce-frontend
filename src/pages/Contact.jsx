// src/pages/ContactPage.js
import React, { useState } from 'react';

const ContactPage = () => {
  // State to manage form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission (replace console.log with actual submission logic)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you shortly.');
    // Optionally clear the form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-gradient-to-r from-purple-100 to-orange-50 min-h-screen">
      <div className="container mx-auto px-4 py-12 md:py-20">

        {/* --- Header --- */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-3">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions or need assistance? Reach out to us! We're here to help.
          </p>
        </div>

        {/* --- Main Content Grid (Info + Form) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">

          {/* --- Contact Information Section --- */}
          <div className="space-y-8 bg-white p-6 md:p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-6">
              Our Contact Details
            </h2>

            {/* Address */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 pt-1">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                 </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">Address</h3>
                <p className="text-gray-600 mt-1">
                  123 Ultrastore Ave<br />
                  Suite 456<br />
                  Online City, OS 78900
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 pt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">Phone</h3>
                <a href="tel:+1234567890" className="text-indigo-600 hover:text-indigo-800 transition duration-200 mt-1 block">
                  +1 (234) 567-8900
                </a>
                <p className="text-sm text-gray-500 mt-1">Mon-Fri, 9am - 5pm PST</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4">
               <div className="flex-shrink-0 pt-1">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                   <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                 </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">Email</h3>
                <a href="mailto:support@yourstore.com" className="text-indigo-600 hover:text-indigo-800 transition duration-200 mt-1 block">
                  support@yourstore.com
                </a>
                <p className="text-sm text-gray-500 mt-1">We typically respond within 24 hours</p>
              </div>
            </div>

             {/* Optional: Map Placeholder/Embed Area */}
             {/* <div className="pt-4">
               <h3 className="text-lg font-medium text-gray-700 mb-2">Find Us Here</h3>
               <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
                 Replace with your map embed iframe or a static map image
                 <img src="https://via.placeholder.com/600x400.png?text=Map+Placeholder" alt="Map placeholder" className="object-cover"/>
               </div>
             </div> */}

          </div>

          {/* --- Contact Form Section --- */}
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-6">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                  placeholder="John Doe"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                  placeholder="you@example.com"
                />
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                  placeholder="Question about an order"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                  placeholder="Please enter your message here..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;