import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { FaShoppingCart } from 'react-icons/fa';

export default function Cart({ cartItems, updateQuantity, removeItem }) {
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart-container">
        <div className="empty-cart">
          <img src="https://m.media-amazon.com/images/G/31/cart/empty/kettle-desaturated._CB424694257_.svg" alt="Empty Cart" />
          <div className="empty-cart-content">
            <h2>Your Cart is empty</h2>
            <Link to="/" className="btn btn-buy mt-3" style={{display: 'inline-block'}}>Shop today's deals</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-main">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <span className="price-header">Price</span>
        </div>
        
        <div className="cart-items-list">
          {cartItems.map(item => (
            <CartItem 
              key={item.id} 
              item={item} 
              updateQuantity={updateQuantity} 
              removeItem={removeItem} 
            />
          ))}
        </div>
        
        <div className="cart-subtotal-bottom">
          Subtotal ({totalItems} items): <strong>₹{totalAmount.toLocaleString('en-IN')}</strong>
        </div>
      </div>
      
      <div className="cart-sidebar">
        <div className="checkout-card">
          <div className="free-delivery-eligible">
            <span className="success-icon">✓</span>
            <p>Your order is eligible for FREE Delivery.</p>
          </div>
          
          <h3 className="checkout-subtotal">
            Subtotal ({totalItems} items): <strong>₹{totalAmount.toLocaleString('en-IN')}</strong>
          </h3>
          
          <button 
            className="btn btn-buy checkout-btn" 
            onClick={() => {
              alert('Redirecting to secure payment gateway...\n(This is a UI clone, no actual payment integration is included)');
            }}
          >
            Proceed to Buy
          </button>
        </div>
      </div>
    </div>
  );
}
