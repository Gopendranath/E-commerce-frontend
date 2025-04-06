import React, { useState, useEffect, useRef } from 'react';
import Icon from '../assets/ULtrastore.svg';
import { Link, NavLink } from 'react-router-dom';
import { LuSearch } from "react-icons/lu";
import { FaCartArrowDown } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TbMenu2 } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import SearchModal from './Seachmodal'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [profilemenu, setProfilemenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);

  const { token } = useSelector((state) => state.auth);

  const totalCartCount = useSelector((state) =>
    state.cart.reduce((sum, item) => sum + item.quantity, 0)
  );

  const totalWishListCount = useSelector((state) => state.wishlist.length);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setIsMobileMenuOpen(false);
    setProfilemenu(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const smallScreen = window.innerWidth < 768;
      setIsSmallScreen(smallScreen);
      if (!smallScreen) {
        setIsMobileMenuOpen(false); // Close mobile menu if screen becomes large
      }
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        const profileIcon = document.querySelector('.profile-icon-class');
        if (profileIcon && !profileIcon.contains(event.target)) {
          setProfilemenu(false);
        }
      }

      if (isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        mobileMenuButtonRef.current &&
        !mobileMenuButtonRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileMenuRef, mobileMenuRef, mobileMenuButtonRef, isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  }

  const toggleProfileMenu = () => {
    setProfilemenu(!profilemenu);
  };

  // NavLink active style function
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "block px-4 py-2 cursor-pointer text-purple-600 font-semibold transition-colors duration-300 bg-purple-50 rounded"
      : "block px-4 py-2 cursor-pointer hover:text-purple-600 transition-colors duration-300 font-medium hover:bg-purple-50 rounded";

  // Desktop NavLink style function (original)
  const desktopNavLinkClass = ({ isActive }) =>
    isActive
      ? "cursor-pointer text-purple-600 font-semibold transition-colors duration-300"
      : "cursor-pointer hover:text-purple-600 transition-colors duration-300 font-medium";

  return (
    // Add relative positioning to the main wrapper
    <div className="shadow-md w-full sticky top-0 z-50 bg-white">
      {/* Add relative positioning here */}
      <nav className="relative bg-white py-4 px-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="w-32 flex-shrink-0">
              <img src={Icon} alt="UltraStore Logo" className="mx-auto" />
            </Link>

            {/* Desktop Navigation Links */}
            <div className={`hidden md:flex space-x-8`}>
              <NavLink to="/" className={desktopNavLinkClass} end>
                Home
              </NavLink>
              <NavLink to="/category/all" className={desktopNavLinkClass}>
                Collections
              </NavLink>
              <NavLink to="/about" className={desktopNavLinkClass}>
                About
              </NavLink>
              <NavLink to="/contact" className={desktopNavLinkClass}>
                Contact
              </NavLink>
            </div>

            {/* Icons */}
            <div className="flex items-center">
              <div className={`flex ${isSmallScreen ? 'space-x-4' : 'space-x-6'} items-center`}>

                <button
                  onClick={handleOpenModal}
                  className="text-gray-600 hover:text-purple-600 transition-colors duration-300"
                  aria-label="Open search modal"
                >
                  <LuSearch className="w-6 h-6" />
                </button>

                <SearchModal isOpen={isModalOpen} onClose={handleCloseModal}/>

                <NavLink to="/cart" className={({ isActive }) =>
                  isActive
                    ? `cursor-pointer text-purple-600 transition-colors duration-300 relative`
                    : `cursor-pointer hover:text-purple-500 transition-colors duration-300 relative`
                }>
                  <FaCartArrowDown size={20} />
                  <p className={`absolute inset-3 right-[-5px] top-[-5px] w-4 h-4 flex items-center justify-center bg-purple-600 text-white rounded-full text-[8px] ${totalCartCount === 0 ? "hidden" : "flex"}`}> {/* Hide badge on small screens */}
                    {totalCartCount}
                  </p>
                </NavLink>

                {/* Profile/Login Icon or Button */}
                {token ? (
                  <div className={`cursor-pointer transition-colors duration-300 relative hidden md:block`} ref={profileMenuRef}>
                    <CgProfile
                      size={20}
                      className='hover:text-purple-500 profile-icon-class'
                      onClick={toggleProfileMenu}
                    />
                    {profilemenu && (
                      <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-40 w-48">
                        <div className="flex flex-col bg-white text-gray-700 rounded">
                          <div className="border-b border-gray-200 pb-2 mb-1 px-4 py-2">
                            <p className="font-medium text-purple-900 truncate">John Doe</p> {/* Added truncate */}
                          </div>
                          <Link to="/orders" onClick={() => { toggleProfileMenu(); closeMobileMenu(); }} className="px-4 py-2 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200 cursor-pointer">
                            Your Orders
                          </Link>
                          <Link to="/wishlist" onClick={() => { toggleProfileMenu(); closeMobileMenu(); }} className="px-4 py-2 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200 cursor-pointer">
                            Your Wishlist {totalWishListCount === 0 ? "" : `(${totalWishListCount})`}
                          </Link>
                          <Link to="/profile" onClick={() => { toggleProfileMenu(); closeMobileMenu(); }} className="px-4 py-2 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200 cursor-pointer">
                            Your Profile
                          </Link>
                          <div className="border-t border-gray-200 mt-1 pt-1">
                            <p onClick={handleLogout} className="px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200 cursor-pointer font-medium">
                              Logout
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link to="/login" className={`hidden md:block`}>
                    <div className="border-2 px-4 py-1.5 border-purple-500 bg-purple-100 text-sm font-semibold text-purple-800 rounded-full cursor-pointer hover:bg-purple-200 transition-colors duration-300">
                      Login
                    </div>
                  </Link>
                )}
              </div>

              {/* Mobile Menu Button - Conditionally rendered */}
              {isSmallScreen && (
                <div
                  ref={mobileMenuButtonRef}
                  className="ml-4 cursor-pointer md:hidden"
                  onClick={toggleMobileMenu}
                >
                  <TbMenu2 size={24} />
                </div>
              )}
            </div>
          </div>
          {isSmallScreen && isMobileMenuOpen && (
            <div
              ref={mobileMenuRef}
              className="absolute top-full left-0 right-0 md:hidden bg-gray-50 p-4 shadow-lg rounded-b-lg z-40 border-t border-gray-200"
            >
              <div className="flex flex-col space-y-1"> {/* Reduced space-y */}
                <NavLink to="/" className={navLinkClass} onClick={closeMobileMenu} end>
                  Home
                </NavLink>
                <NavLink to="/category/all" className={navLinkClass} onClick={closeMobileMenu}>
                  Collections
                </NavLink>
                <NavLink to="/about" className={navLinkClass} onClick={closeMobileMenu}>
                  About
                </NavLink>
                <NavLink to="/contact" className={navLinkClass} onClick={closeMobileMenu}>
                  Contact
                </NavLink>
                {/* Separator */}
                {token && <div className="border-t border-gray-200 my-2"></div>}

                {/* Links visible only when logged in (in mobile menu) */}
                {token && (
                  <>
                    <NavLink to="/wishlist" className={navLinkClass} onClick={closeMobileMenu}>
                      Wishlist {totalWishListCount > 0 && `(${totalWishListCount})`}
                    </NavLink>
                    <NavLink to="/orders" className={navLinkClass} onClick={closeMobileMenu}>
                      Your Orders
                    </NavLink>
                    <NavLink to="/profile" className={navLinkClass} onClick={closeMobileMenu}>
                      Your Profile
                    </NavLink>
                  </>
                )}

                {/* Login/Logout Button */}
                <div className="border-t border-gray-200 mt-2 pt-2">
                  {token ? (
                    <p onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-200 cursor-pointer font-medium rounded">
                      Logout
                    </p>
                  ) : (
                    <NavLink to="/login" onClick={closeMobileMenu} className="block w-full text-left px-4 py-2 text-purple-600 font-bold hover:bg-purple-50 transition-colors duration-200 cursor-pointer rounded">
                      Login
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;