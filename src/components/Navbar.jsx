import React, { useState, useEffect, useRef } from 'react';
import Icon from '../assets/ULtrastore.svg';
import { Link, NavLink } from 'react-router-dom';
import { LuSearch } from "react-icons/lu";
import { FaCartArrowDown } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TbMenu2 } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [profilemenu, setProfilemenu] = useState(false);
  const [cartcount, setCartcount] = useState(0);
  const profileMenuRef = useRef(null);

  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const getCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      setCartcount(cart.length);
    } else {
      setCartcount(0);
    }
  };

  useEffect(() => {
    getCartCount();
  }, []);

  // Check screen size on mount and when window resizes
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfilemenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileMenuRef]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setProfilemenu(!profilemenu);
  };

  // NavLink active style function
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "cursor-pointer text-purple-600 font-semibold transition-colors duration-300"
      : "cursor-pointer hover:text-purple-600 transition-colors duration-300 font-medium";

  return (
    <div className="shadow-md w-full">
      <nav className="bg-white py-4 px-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="w-32">
              <img src={Icon} alt="UltraStore Logo" className="mx-auto" />
            </Link>

            {/* Desktop Navigation Links */}
            <div className={`hidden md:flex space-x-8`}>
              <NavLink to="/" className={navLinkClass} end>
                <p>Home</p>
              </NavLink>
              <NavLink to="/category/all" className={navLinkClass}>
                Collections
              </NavLink>
              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>
              <NavLink to="/contact" className={navLinkClass}>
                Contact
              </NavLink>
            </div>

            {/* Icons */}
            <div className="flex items-center">
              <div className="flex space-x-6 items-center">
                <div className="cursor-pointer hover:text-purple-500 transition-colors duration-300">
                  <LuSearch size={20} />
                </div>
                <NavLink to="/cart" className={({ isActive }) =>
                  isActive
                    ? "cursor-pointer text-purple-600 transition-colors duration-300"
                    : "cursor-pointer hover:text-purple-500 transition-colors duration-300"
                }>
                  <FaCartArrowDown size={20} />
                  <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{cartcount}</p>
                </NavLink>
                {token ? (
                  <div className="cursor-pointer transition-colors duration-300 relative" ref={profileMenuRef}>
                    <CgProfile 
                      size={20} 
                      className='hover:text-purple-500' 
                      onClick={toggleProfileMenu} 
                    />
                    {profilemenu && (
                      <div className="absolute top-8 right-0 bg-white border border-gray-300 rounded-lg shadow-md p-2 z-50">
                        <div className="flex flex-col w-48 py-2 bg-white text-gray-700 rounded">
                          <div className="border-b border-gray-200 pb-2 mb-1">
                            <p className="px-4 py-2 font-medium text-purple-900">John Doe</p>
                          </div>
                          <Link to="/orders" onClick={toggleProfileMenu} className="px-4 py-2 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200 cursor-pointer">
                            Your Orders
                          </Link>
                          <Link to="/wishlist" onClick={toggleProfileMenu} className="px-4 py-2 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200 cursor-pointer">
                            Your Wishlist
                          </Link>
                          <Link to="/profile"  onClick={toggleProfileMenu} className="px-4 py-2 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200 cursor-pointer">
                            Your Profile
                          </Link>
                          <div className="border-t border-gray-200 mt-1 pt-1">
                            <p onClick={handleLogout} className="px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200 cursor-pointer">
                              Logout
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to="/login">
                    <div className="border-2 px-4 py-1.5 border-purple-500 bg-purple-100 text-sm font-semibold text-purple-800 rounded-full cursor-pointer hover:bg-purple-200 transition-colors duration-300">
                      Login
                    </div>
                  </Link>
                )}
              </div>

              {/* Mobile Menu Button */}
              {isSmallScreen && (
                <div
                  className="ml-6 cursor-pointer md:hidden"
                  onClick={toggleMobileMenu}
                >
                  <TbMenu2 size={24} />
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {isSmallScreen && isMobileMenuOpen && (
            <div className="md:hidden mt-4 bg-gray-50 p-4 rounded-lg">
              <div className="flex flex-col space-y-3">
                <NavLink to="/" className={navLinkClass} end>
                  Home
                </NavLink>
                <NavLink to="/category/all" className={navLinkClass}>
                  Collections
                </NavLink>
                <NavLink to="/about" className={navLinkClass}>
                  About
                </NavLink>
                <NavLink to="/contact" className={navLinkClass}>
                  Contact
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;