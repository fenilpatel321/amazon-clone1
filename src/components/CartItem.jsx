import React from 'react';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function CartItem({ item, updateQuantity, removeItem }) {
  return (
    <div className="cart-item">
      <Link to={`/product/${item.id}`} className="cart-item-image">
        <img src={item.image} alt={item.title} />
      </Link>
      
      <div className="cart-item-details">
        <Link to={`/product/${item.id}`} className="cart-item-title">
          {item.title}
        </Link>
        <div className="cart-item-stock">In stock</div>
        <div className="cart-item-shipping">Eligible for FREE Shipping</div>
        
        <div className="cart-item-actions">
          <div className="quantity-controls">
            <button 
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="qty-btn"
            >
              <FaMinus />
            </button>
            <span className="qty-value">{item.quantity}</span>
            <button 
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="qty-btn"
            >
              <FaPlus />
            </button>
          </div>
          
          <div className="divider">|</div>
          
          <button className="remove-btn" onClick={() => removeItem(item.id)}>
            <FaTrash /> Delete
          </button>
        </div>
      </div>
      
      <div className="cart-item-price">
        <strong>₹{(item.price * item.quantity).toLocaleString('en-IN')}</strong>
      </div>
    </div>
  );
}
