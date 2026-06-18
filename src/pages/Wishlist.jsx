import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeartBroken } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';

export default function Wishlist({ wishlist, toggleWishlist, onAddToCart }) {
  if (wishlist.length === 0) {
    return (
      <div className="container py-16 flex flex-col items-center justify-center" style={{ minHeight: '60vh' }}>
        <div className="text-6xl text-muted mb-6"><FaHeartBroken /></div>
        <h2 className="text-3xl font-bold mb-4">Your wishlist is empty</h2>
        <p className="text-muted mb-8">Save items you like here to buy them later.</p>
        <Link to="/" className="btn-primary">Explore Products</Link>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-2">Your Wishlist</h1>
      <p className="text-muted mb-8">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved</p>
      
      <motion.div 
        className="product-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {wishlist.map((product, idx) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
          >
            <ProductCard 
              product={product} 
              onAddToCart={onAddToCart} 
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
