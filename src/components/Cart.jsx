import React from "react";
import { useStore } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { isOpen, setIsOpen, cart, removeFromCart } = useStore();
  const navigate = useNavigate();

  // Calculate total
  const totalAmount = cart.reduce(
    (acc, item) => acc + (item.price * (item.quantity || 1)),
    0
  );

  return (
    <div>
      {/* Drawer */}
      <div className={`drawer ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="drawer-header">
          <h2>Cart</h2>
          <button className="close-btn" onClick={() => setIsOpen(false)}>
            <p>✖</p>
          </button>
        </div>

        {/* Content */}
        <div className="drawer-content">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty 🛒</p>
              <button
                className="shop-btn"
                onClick={() => {
                  setIsOpen(false);
                  navigate("/products");
                }}
              >
                Shop Now
              </button>
            </div>
          ) : (
            <div className="cart-item">
              <div className="items-cart">
                {cart.map((item) => (
                  <div className="added-item" key={item.id}>
                    {/* Image */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="cart-img"
                    />

                    {/* Details */}
                    <div className="cart-detailss">
                      <div className="title-descr">
                        <span className="cart-title">{item.title}</span>
                        <span className="cart-item-desc">
                          {item.description}
                        </span>
                      </div>

                      <div className="size-qty">
                        <div className="price-div">
                          <p className="size-qty">Price</p>
                          <p className="value">
                            ₹{(item.price * (item.quantity || 1)).toFixed(2)}
                          </p>
                        </div>
                        <div className="price-div">
                          <p className="size-qty">Qty</p>
                          <p className="value">{item.quantity || 1}</p>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <div
                      className="close-btn"
                      onClick={() => removeFromCart(item.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <p>✖</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Section */}
              <div className="cart-total">
                <h3>Total: ₹{totalAmount.toFixed(2)}</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
