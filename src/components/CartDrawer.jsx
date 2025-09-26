import React, { useState } from "react";
 // 👈 import CSS file
import { useStore } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
    const navigate = useNavigate();
  const {isOpen,setIsOpen} = useStore();

const closeCart = () => {
    setIsOpen(false);
    navigate("/home");
}

  return (
    <>
      

      
    </>
  );
};

export default CartDrawer;
