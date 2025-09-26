import React, { createContext, useContext, useEffect, useState } from "react";
import { chocolates, coolDrinks, fruitsVeg, snacks } from "../data/Products";
import { useNavigate } from "react-router-dom";
import ProductsPage from "../components/ProductsPage";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchItem, setSearchItem] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const [wishlist, setWishlist] = useState(storedWishlist);

  const handleChange = (e) => {
    setSearchItem(e.target.value);
  };

const handleSearch = () => {
  if (!searchItem.trim()) {
    // 🔹 if input is empty, reset
    setFiltered([]);
    setIsSearching(false);
    return;
  }

  const allProducts = [...snacks, ...coolDrinks, ...chocolates, ...fruitsVeg];

  const result = allProducts.filter((p) =>
    p.title.toLowerCase().includes(searchItem.toLowerCase())
  );

  setFiltered(result);
  setIsSearching(true);

  // console.log("Filtered Results:", result);
};


  //Add to WishList--------!

  const handleWish = (item) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.find((wishItem) => wishItem.id === item.id);
      if (exists) {
        console.log("Item already in cart");
        return prevWishlist;
      }
      // console.log("Item added");
      return [...prevWishlist, item];
    });
  }

  //Remove from WishList-------!

  const removeWish = (item) => {
    setWishlist((prevWishlist) => 
      prevWishlist.filter((wishItem) => wishItem.id !== item.id))
  }

  useEffect(() => {
      // console.log("Wishlist updated:", wishlist);
      localStorage.setItem("wishlist",JSON.stringify(wishlist))
    }, [wishlist]);

  return (
    <SearchContext.Provider
      value={{ searchItem, handleChange, handleSearch, filtered, isSearching, handleWish, removeWish,wishlist }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
