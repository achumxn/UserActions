import React from "react";
import { snacks, coolDrinks, chocolates, fruitsVeg } from "../data/Products";
import "../Styles/ProductsPage.css";

const ProductsPage = () => {
    // Category list
    const categories = [
        { name: "Snacks", data: snacks },
        { name: "Cool Drinks", data: coolDrinks },
        { name: "Chocolates", data: chocolates },
        { name: "Fruits & Vegetables", data: fruitsVeg },
    ];

    return (
        <div className="products-page">
            {categories.map((cat) => (
                <div key={cat.name} className="category-section">
                    <h2 className="category-title">{cat.name}</h2>
                    <div className="products-grid">
                        {cat.data.map((item) => (
                            <div key={item.id} className="product-card">
                                <img src={item.image} alt={item.title} className="product-img" />
                                <h3 className="product-title">{item.title}</h3>
                                <p className="product-desc">{item.description}</p>
                                <div className="price-add">
                                    <p className="product-price">₹{item.price}</p>
                                    <button className="add-btn">Add to Cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductsPage;
