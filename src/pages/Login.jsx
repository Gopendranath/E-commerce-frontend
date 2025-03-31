import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/slices/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BiLoaderCircle } from "react-icons/bi";

const Login = () => {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error, token } = useSelector((state) => state.auth);

  // Trigger animation after component mounts
  useEffect(() => {
    // Small delay to ensure transition works properly
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({email, password})).then((result) => {
      if(result.meta.requestStatus === "fulfilled") {
        navigate("/");
      }
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Animation class names based on state
  const cardClasses = `w-sm sm:max-w-md md:max-w-lg px-6 py-8 mt-20 relative border-x-2 border-gray-300 
    transition-all duration-700 ease-out ${animateIn ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`;
  
  const logoClasses = `text-gray-300 font-bold rounded-md text-5xl
    transition-all duration-1000 delay-300 ease-out ${animateIn ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-90'}`;
  
  const formClasses = `mt-8 space-y-6
    transition-all duration-700 delay-500 ease-out ${animateIn ? 'opacity-100' : 'opacity-0'}`;

  return (
    <div className="flex items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className={cardClasses}>
        
        <div className="text-center -mt-5">
          <h1 className={logoClasses}>
            ULTRASTORE
          </h1>
        </div>
  
        <div className="text-center">
          <h2 className={`mt-6 text-3xl font-extrabold text-gray-900 
            transition-all duration-700 delay-400 ease-out ${animateIn ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-5'}`}>Login</h2>
        </div>
        
        <form className={formClasses}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-5 h-5" aria-hidden="true" />
                  ) : (
                    <FaEye className="w-5 h-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>
  
          <div>
            <button
              onClick={handleLogin}
              disabled={status === "loading"}
              type="submit"
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed 
                transition-all duration-300 hover:transform hover:scale-105"
            >
              {status === "loading" ? <BiLoaderCircle className="animate-spin mr-2" /> : "Login"}
            </button>
          </div>
  
          {error && (
            <div className="p-3 mt-4 text-sm text-red-700 bg-red-100 rounded-md animate-pulse">
              {error}
            </div>
          )}
  
          {token && (
            <div className="p-3 mt-4 text-sm text-green-700 bg-green-100 rounded-md animate-pulse">
              Logged in successfully
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;