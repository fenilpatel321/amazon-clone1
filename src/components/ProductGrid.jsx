import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';
import './ProductGrid.css';

export default function ProductGrid({ products, onAddToCart, wishlist, toggleWishlist }) {
  const [sortBy, setSortBy] = useState('Recommended');

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price;
    if (sortBy === 'Price: High to Low') return b.price - a.price;
    if (sortBy === 'Top Rated') return b.rating - a.rating;
    return 0; 
  });

  return (
    <section className="container py-8" id="products">
      <div className="grid-header">
        <h2 className="text-2xl font-bold">Top Deals</h2>
        
        <div className="sort-container">
          <span className="text-sm text-muted">Sort by:</span>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field py-1 px-3 text-sm"
          >
            <option>Recommended</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Top Rated</option>
          </select>
        </div>
      </div>

      {sortedProducts.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="py-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-2">No products found</h3>
          <p className="text-muted">Try searching for something else or clear the filters.</p>
        </motion.div>
      ) : (
        <motion.div layout className="product-grid">
          <AnimatePresence>
            {sortedProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard 
                  product={product} 
                  onAddToCart={onAddToCart} 
                  wishlist={wishlist}
                  toggleWishlist={toggleWishlist}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}
