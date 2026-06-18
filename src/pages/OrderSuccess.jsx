import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Checkout.css'; // Reusing utilities

export default function OrderSuccess() {
  return (
    <div className="container py-16 flex justify-center items-center" style={{ minHeight: '60vh' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-8 text-center rounded-2xl max-w-md w-full"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="w-20 h-20 bg-success text-white rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-lg"
          style={{ backgroundColor: 'var(--success)', margin: '0 auto' }}
        >
          ✓
        </motion.div>
        <h2 className="text-3xl font-bold mb-2">Order Confirmed!</h2>
        <p className="text-muted mb-8">Thank you for your purchase. Your order has been placed successfully and will be delivered soon.</p>
        <Link to="/" className="btn-primary w-full">Continue Shopping</Link>
      </motion.div>
    </div>
  );
}
