import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../Styles/HomePage.css";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      {/* Logo / Brand */}
      <div className="logo">ShopEase</div>

      {/* Links */}
      <div className="nav-links">
        <Link to="/products" className="nav-text">Products</Link>
        <Link to="/home" className="nav-text">Home</Link>
        <Link to="/profile" className="nav-text">Profile</Link>
        {/* {user && (
          <button className="logout-btn">Logout</button>
        )} */}
      </div>
    </nav>
  );
};

export default Navbar;
