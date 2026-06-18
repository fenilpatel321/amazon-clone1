import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus, FaShoppingCart } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import './Cart.css';

export default function Cart({ cartItems, updateQuantity, removeItem }) {
  const navigate = useNavigate();
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = total > 0 ? total * 0.1 : 0;
  const finalTotal = total > 0 ? total - discount + 50 : 0;

  if (cartItems.length === 0) {
    return (
      <div className="container py-16 flex flex-col items-center justify-center" style={{ minHeight: '60vh' }}>
        <div className="text-6xl text-muted mb-6"><FaShoppingCart /></div>
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-muted mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="cart-grid">
        <div className="cart-items-col">
          <AnimatePresence>
            {cartItems.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                className="cart-item glass-panel"
              >
                <Link to={`/product/${item.id}`} className="cart-item-img">
                  <img src={item.image} alt={item.title} />
                </Link>
                
                <div className="cart-item-details">
                  <span className="text-xs text-muted uppercase">{item.category}</span>
                  <Link to={`/product/${item.id}`}>
                    <h3 className="font-semibold text-lg line-clamp-1 hover:text-accent">{item.title}</h3>
                  </Link>
                  <p className="text-xl font-bold mt-2">₹{item.price.toLocaleString('en-IN')}</p>
                  
                  <div className="cart-item-actions mt-4">
                    <div className="quantity-control">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="qty-btn"
                      >
                        <FaMinus size={12} />
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="qty-btn"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="remove-btn"
                    >
                      <FaTrash size={14} /> Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="cart-summary-col">
          <div className="glass-panel p-6 rounded-2xl sticky top-24">
            <h2 className="text-xl font-semibold mb-6 border-b pb-4 border-color">Order Summary</h2>
            
            <div className="flex justify-between mb-3">
              <span className="text-muted">Subtotal ({cartItems.length} items)</span>
              <span className="font-medium">₹{total.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between mb-3 text-success">
              <span>Discount (10%)</span>
              <span className="font-medium">-₹{discount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-muted">Shipping</span>
              <span className="font-medium">₹50</span>
            </div>
            
            <div className="flex justify-between border-t border-color pt-4 mt-2 text-xl font-bold">
              <span>Total Amount</span>
              <span>₹{finalTotal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
            </div>
            
            <button 
              className="btn-primary w-full mt-6 py-3"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
