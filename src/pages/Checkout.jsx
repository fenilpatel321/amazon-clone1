import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import './Checkout.css';

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = total * 0.1; // 10% mock discount
  const finalTotal = total > 0 ? total - discount + 50 : 0; // +50 shipping

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    toast.success('Order placed successfully!');
    localStorage.setItem('cartItems', JSON.stringify([])); // Clear cart instead of removeItem so App state stays synced
    // Actually wait, App.jsx uses context or localstorage initial. It will trigger useEffect on next load.
    // For immediate effect we should dispatch event or just let it reload/navigate
    window.dispatchEvent(new Event('storage')); // A hack to force other tabs/components to see localstorage changes if they listen
    setTimeout(() => {
        // App.jsx will sync eventually on refresh, or we just reload
        navigate('/order-success');
        window.location.reload(); // Quick hack to sync App state
    }, 1000);
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="checkout-grid">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="checkout-form-section"
        >
          <form id="checkout-form" onSubmit={handlePlaceOrder}>
            <div className="glass-panel p-6 rounded-2xl mb-6">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2 border-color">Shipping Address</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input required type="text" className="input-field" placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input required type="tel" className="input-field" placeholder="+91 9876543210" />
                </div>
                <div className="form-group full-width">
                  <label>Address</label>
                  <textarea required className="input-field" rows="3" placeholder="123 Street Name"></textarea>
                </div>
                <div className="form-group">
                  <label>City</label>
                  <input required type="text" className="input-field" placeholder="Mumbai" />
                </div>
                <div className="form-group">
                  <label>Pincode</label>
                  <input required type="text" className="input-field" placeholder="400001" />
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl">
              <h2 className="text-xl font-semibold mb-4 border-b pb-2 border-color">Payment Method</h2>
              <div className="payment-methods">
                <label className="payment-option">
                  <input type="radio" name="payment" defaultChecked />
                  <span>Credit / Debit Card</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="payment" />
                  <span>UPI / Net Banking</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="payment" />
                  <span>Cash on Delivery</span>
                </label>
              </div>
            </div>
          </form>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="checkout-summary glass-panel p-6 rounded-2xl"
        >
          <h2 className="text-xl font-semibold mb-4 border-b pb-2 border-color">Order Summary</h2>
          <div className="summary-items mb-4">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item">
                <span className="text-sm line-clamp-1 flex-1">{item.name}</span>
                <span className="text-sm font-semibold">₹{item.price} x {item.quantity}</span>
              </div>
            ))}
          </div>
          
          <div className="summary-calc border-t pt-4 border-color">
            <div className="flex justify-between mb-2">
              <span className="text-muted">Subtotal</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2 text-success">
              <span>Discount (10%)</span>
              <span>-₹{discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-muted">Shipping</span>
              <span>₹50.00</span>
            </div>
            <div className="flex justify-between mt-4 pt-4 border-t border-color text-xl font-bold">
              <span>Total</span>
              <span>₹{finalTotal.toFixed(2)}</span>
            </div>
          </div>
          
          <button form="checkout-form" type="submit" className="btn-primary w-full mt-6">
            Place Order
          </button>
        </motion.div>
      </div>
    </div>
  );
}
