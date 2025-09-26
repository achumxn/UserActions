import React from "react";
import { snacks, coolDrinks, chocolates, fruitsVeg } from "../data/Products";
import "../Styles/ProductsPage.css";
import { useStore } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import Navbar from "./Navbar";
import filled from "../assets/ProductPage/filled.png"
import nofill from "../assets/ProductPage/nofill.png"


const ProductsPage = () => {
  const categories = [
    { name: "Snacks", data: snacks },
    { name: "Cool Drinks", data: coolDrinks },
    { name: "Chocolates", data: chocolates },
    { name: "Fruits & Vegetables", data: fruitsVeg },
  ];

  const { cart, handleCart, increaseQuantity, decreaseQuantity } = useStore();
  const { filtered, isSearching, handleWish, removeWish, wishlist } = useSearch();

  // Flatten all products for easier filtering later
  const allProducts = [...snacks, ...coolDrinks, ...chocolates, ...fruitsVeg];

  return (
    <>
      <Navbar />
      <div className="products-page">

        {isSearching ? (
          <>
            {/*Show filtered search results first */}
            {filtered.length > 0 && (
              <div className="category-section">
                <h2 className="category-title">Search Results</h2>
                <div className="products-grid">
                  {filtered.map((item) => {
                    const inCart = cart.find((c) => c.id === item.id);
                    const inWish = wishlist.find((w) => w.id === item.id);
                    return (
                      <div key={item.id} className="product-card">
                        <img src={item.image} alt={item.title} className="product-img" />
                        <div className="heart-icon">
                        {inWish ? (
                          <img src={filled} onClick={() => removeWish(item)}/>
                        ):(
                          <img src={nofill} onClick={() => handleWish(item)}/>
                        )}
                      </div>
                        <h3 className="product-title">{item.title}</h3>
                        <p className="product-desc">{item.description}</p>
                        <div className="price-add">
                          <p className="product-price">₹{item.price}</p>
                          {inCart ? (
                            <div className="counter-btns">
                              <button className="counter-btn" onClick={() => decreaseQuantity(item)}>-</button>
                              <span className="quantity">{inCart.quantity}</span>
                              <button className="counter-btn" onClick={() => increaseQuantity(item)}>+</button>
                            </div>
                          ) : (
                            <button className="add-btn" onClick={() => handleCart(item)}>Add to Cart</button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Show remaining categories excluding filtered products */}
            {categories.map((cat) => (
            <div key={cat.name} className="category-section">
              <h2 className="category-title">{cat.name}</h2>
              <div className="products-grid">
                {cat.data.map((item) => {
                  const inCart = cart.find((c) => c.id === item.id);
                  const inWish = wishlist.find((w) => w.id === item.id);
                  return (
                    <div key={item.id} className="product-card">
                      <img src={item.image} alt={item.title} className="product-img" />
                      <div className="heart-icon">
                        {inWish ? (
                          <img src={filled} onClick={() => removeWish(item)}/>
                        ):(
                          <img src={nofill} onClick={() => handleWish(item)}/>
                        )}
                      </div>
                      <h3 className="product-title">{item.title}</h3>
                      <p className="product-desc">{item.description}</p>
                      <div className="price-add">
                        <p className="product-price">₹{item.price}</p>
                        {inCart ? (
                          <div className="counter-btns">
                            <button className="counter-btn" onClick={() => decreaseQuantity(item)}>-</button>
                            <span className="quantity">{inCart.quantity}</span>
                            <button className="counter-btn" onClick={() => increaseQuantity(item)}>+</button>
                          </div>
                        ) : (
                          <button className="add-btn" onClick={() => handleCart(item)}>Add to Cart</button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          </>
        ) : (
          // Normal mapping when not searching
          categories.map((cat) => (
            <div key={cat.name} className="category-section">
              <h2 className="category-title">{cat.name}</h2>
              <div className="products-grid">
                {cat.data.map((item) => {
                  const inCart = cart.find((c) => c.id === item.id);
                  const inWish = wishlist.find((w) => w.id === item.id);
                  return (
                    <div key={item.id} className="product-card">
                      <img src={item.image} alt={item.title} className="product-img" />
                      <div className="heart-icon">
                        {inWish ? (
                          <img src={filled} onClick={() => removeWish(item)}/>
                        ):(
                          <img src={nofill} onClick={() => handleWish(item)}/>
                        )}
                      </div>
                      <h3 className="product-title">{item.title}</h3>
                      <p className="product-desc">{item.description}</p>
                      <div className="price-add">
                        <p className="product-price">₹{item.price}</p>
                        {inCart ? (
                          <div className="counter-btns">
                            <button className="counter-btn" onClick={() => decreaseQuantity(item)}>-</button>
                            <span className="quantity">{inCart.quantity}</span>
                            <button className="counter-btn" onClick={() => increaseQuantity(item)}>+</button>
                          </div>
                        ) : (
                          <button className="add-btn" onClick={() => handleCart(item)}>Add to Cart</button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ProductsPage;
