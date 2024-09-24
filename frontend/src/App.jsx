import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Collection from "./pages/collection";
import About from "./pages/about";
import Product from "./pages/product";
import Cart from "./pages/cart";
import Login from "./pages/login";
import Contact from "./pages/contact";
import PlaceOrder from "./pages/placeOrder";
import Orders from "./pages/orders";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import SearchBar from "./components/searchBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
