import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../assets/ULtrastore.svg';

const Footer = () => {
  const [email, setEmail] = React.useState('');

  const handleEmailInputChange = (e) => {
    setEmail(e.target.value);
  };

  // Handles the form submission for the newsletter
  const handleSubscribeSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission (page reload)
    if (email.trim() === '') {
        alert('Please enter a valid email address.'); // Basic validation
        return;
    }
    console.log('Subscribing with email:', email);
    // alert(`Thank you for subscribing with ${email}!`);
    setEmail('');
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Grid layout for footer sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Section 1: Logo and Description */}
          <div className="md:col-span-2 lg:col-span-1">
            <Link to="/" aria-label="Go to Homepage">
              {/* Changed h-15 to h-12 (adjust as needed) and removed aria-hidden */}
              <img src={Icon} className="h-12 w-auto text-purple-600 mb-4" alt="ULtrastore Logo" />
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Your one-stop shop for amazing products. Quality guaranteed.
            </p>
          </div>

          {/* Section 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-gray-600 hover:text-purple-600 transition-colors duration-200">Home</Link></li>
              <li><Link to="/category/all" className="text-sm text-gray-600 hover:text-purple-600 transition-colors duration-200">Shop All</Link></li>
              <li><Link to="/about" className="text-sm text-gray-600 hover:text-purple-600 transition-colors duration-200">About Us</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-600 hover:text-purple-600 transition-colors duration-200">Contact</Link></li>
            </ul>
          </div>

          {/* Section 3: Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-sm text-gray-600 hover:text-purple-600 transition-colors duration-200">FAQ</Link></li>
              <li><Link to="/shipping" className="text-sm text-gray-600 hover:text-purple-600 transition-colors duration-200">Shipping & Returns</Link></li>
              <li><Link to="/privacy" className="text-sm text-gray-600 hover:text-purple-600 transition-colors duration-200">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-gray-600 hover:text-purple-600 transition-colors duration-200">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Section 4: Stay Connected */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
              Stay Connected
            </h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-purple-600 transition-colors duration-200">
                 <img src='https://img.icons8.com/color/48/000000/facebook-new.png' alt="" className="w-6 h-6 hover:scale-110" />
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-purple-600 transition-colors duration-200">
                 <img src='https://img.icons8.com/color/48/000000/twitterx.png' alt="" className="w-6 h-6 hover:scale-110" />
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-purple-600 transition-colors duration-200">
                 <img src='https://img.icons8.com/color/48/000000/instagram-new.png' alt="" className="w-6 h-6 hover:scale-110" />
              </a>
            </div>

             {/* Optional: Newsletter Signup */}
             <div className="mt-6">
                <p className="text-sm text-gray-600 mb-2">Subscribe to our newsletter:</p>
                 {/* Assign handleSubscribeSubmit to onSubmit */}
                <form className="flex" onSubmit={handleSubscribeSubmit}>
                    <input
                        type="email"
                        placeholder="Your email"
                        className="px-3 py-2 border border-gray-300 rounded-l-md text-sm focus:ring-purple-500 focus:border-purple-500 flex-grow"
                        aria-label="Email for newsletter"
                        value={email}
                        onChange={handleEmailInputChange}
                        required
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-r-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200 hover:cursor-pointer"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="mt-10 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-500">
            © {currentYear} ULtrastore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;