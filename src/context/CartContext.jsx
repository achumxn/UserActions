import React, { createContext, useContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [cart, setCart] = useState(storedCart); 
  const [isOpen, setIsOpen] = useState(false);
  

  // Add item
  const handleCart = (item) => {
    setCart((prevCart) => {
      const exists = prevCart.find((cartItem) => cartItem.id === item.id);
      if (exists) {
        console.log("Item already in cart");
        return prevCart;
      }
      console.log("Item added");
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // Increase quantity
  const increaseQuantity = (item) => {
    setCart((prevCart) =>
      prevCart.map((prevItem) =>
        prevItem.id === item.id
          ? { ...prevItem, quantity: prevItem.quantity + 1 }
          : prevItem
      )
    );
    console.log("Increased quantity");
  };

  // Decrease quantity / auto-remove if 0
  const decreaseQuantity = (item) => {
    setCart((prevCart) => {
      const updated = prevCart
        .map((prevItem) =>
          prevItem.id === item.id
            ? { ...prevItem, quantity: prevItem.quantity - 1 }
            : prevItem
        )
        .filter((citem) => citem.quantity > 0);

      if (updated.length < prevCart.length) {
        console.log("Item removed (quantity 0)");
      } else {
        console.log("Decreased quantity");
      }
      return updated;
    });
  };

  // Remove item completely
  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((citem) => citem.id !== itemId));
    console.log("Item removed");
  };

  // Clear cart
  const clearCart = () => {
    if (cart.length === 0) {
      console.log("Cart is already empty");
    } else {
      console.log("Cart cleared");
      setCart([]);
    }
  };

  useEffect(() => {
    localStorage.setItem("cart",JSON.stringify(cart));
  },[cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        handleCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        isOpen,
        setIsOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook for easy access
export const useStore = () => useContext(CartContext);
