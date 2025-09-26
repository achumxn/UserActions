import React from "react";
import "../Styles/ProductsPage.css"; // reuse your existing styles
import { useStore } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import filled from "../assets/ProductPage/filled.png";
import nofill from "../assets/ProductPage/nofill.png";
import Navbar from "./Navbar";

const Wishlist = () => {
    const { cart, handleCart, increaseQuantity, decreaseQuantity } = useStore();
    const { wishlist, handleWish, removeWish } = useSearch();

    if (!wishlist || wishlist.length === 0) {
        return (
            <>
            <Navbar/>
            <div className="products-page">
                <div className="category-section">
                    <h2 className="category-title">Wishlist Emptyy...!!!</h2>
                </div>
            </div>
            </>
        );
    }

    return (
        <>
            <Navbar/>
            <div className="products-page">
                <div className="category-section">
                    <h2 className="category-title">My Wishlist</h2>
                    <div className="products-grid">
                        {wishlist.map((item) => {
                            const inCart = cart.find((c) => c.id === item.id);

                            return (
                                <div key={item.id} className="product-card">
                                    <img src={item.image} alt={item.title} className="product-img" />
                                    <div className="heart-icon">
                                        <img
                                            src={filled}
                                            onClick={() => removeWish(item)}
                                            style={{ cursor: "pointer" }}
                                        />
                                    </div>
                                    <h3 className="product-title">{item.title}</h3>
                                    <p className="product-desc">{item.description}</p>
                                    <div className="price-add">
                                        <p className="product-price">₹{item.price}</p>
                                        {inCart ? (
                                            <div className="counter-btns">
                                                <button
                                                    className="counter-btn"
                                                    onClick={() => decreaseQuantity(item)}
                                                >
                                                    -
                                                </button>
                                                <span className="quantity">{inCart.quantity}</span>
                                                <button
                                                    className="counter-btn"
                                                    onClick={() => increaseQuantity(item)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                className="add-btn"
                                                onClick={() => handleCart(item)}
                                            >
                                                Add to Cart
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Wishlist;
