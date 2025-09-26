import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../Styles/HomePage.css";
import "../Styles/CartDrawer.css";
import searchicon from "../assets/Navbar/search.png"
import { useSearch } from "../context/SearchContext";
import ProductsPage from "./ProductsPage";
import { useStore } from "../context/CartContext";
import Cart from "./Cart";

const Navbar = () => {
  const { user, logout } = useAuth();

  const { searchItem, handleChange, handleSearch } = useSearch();
  const {setIsOpen} = useStore()
  const navigate = useNavigate()

  const handleSearching = () => {
    handleSearch();
    navigate("/products")
  }

  return (
    
    <>
      <Cart/>
      <nav className="navbar">
      {/* Logo / Brand */}
      <div className="logo">ShopEase</div>

      {/* Search Bar */}

      <div className="customsearch">
        <img src={searchicon} onClick={handleSearching} />
        <hr />
        <input type="text" placeholder="Search!!..." value={searchItem} onChange={handleChange} />
      </div>

      {/* Links */}
      <div className="nav-links">
        <Link to="/home" className="nav-text">Home</Link>
        <Link to="/products" className="nav-text">Products</Link>
        <Link to="/wishlist" className="nav-text">Wishlist</Link>
        <p className="nav-text" onClick={() => { setIsOpen(true) }}>Cart</p>
        <Link to="/profile" className="nav-text">Profile</Link>
        <Link to="/allproducts" className="nav-text">All Products</Link>
        

      </div>
    </nav>    
    </>
  );
};

export default Navbar;
