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
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Orders from "./pages/Orders.jsx";
import Profile from "./pages/Profile.jsx";
import Product from "./pages/Product.jsx";

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    // Main container: Full height, flex column layout
    <div className="bg-purple-100 min-h-screen flex flex-col">

      {/* Conditional Navbar */}
      {!isLoginPage && <Navbar />}
      <main className="flex-grow"> {/* <--- KEY CHANGE HERE */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/category/:id" element={<Categoryproduct />} />
          <Route path="/feature/:id" element={<Selectedfeature />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </main>

      {/* Toaster for notifications - position is usually absolute/fixed, so placement here is fine */}
      <Toaster />

      {/* Conditional Footer */}
      {!isLoginPage && <Footer />}

    </div>
  )
}

export default App;