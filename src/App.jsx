import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home.jsx";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout"
import Wishlist from "./pages/Wishlist"
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Notfound from "./pages/Notfound";
import Categoryproduct from "./pages/Categoryproduct";
import ProtectedRoute from "./components/ProtectedRoute";
import Selectedfeature from "./pages/Selectedfeature.jsx";

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="min-h-screen bg-purple-100">
      {!isLoginPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/category/:id" element={<Categoryproduct />} />
        <Route path="/feature/:id" element={<Selectedfeature />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
      <Toaster />
      {!isLoginPage && <Footer />}
    </div>
  )
}

export default App