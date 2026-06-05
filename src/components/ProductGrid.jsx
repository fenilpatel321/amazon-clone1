import React, { useState } from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid({ products, onAddToCart, wishlist, toggleWishlist }) {
  const [sortBy, setSortBy] = useState('Recommended');

  // Create a copy to sort so we don't mutate the original array
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price;
    if (sortBy === 'Price: High to Low') return b.price - a.price;
    if (sortBy === 'Top Rated') return b.rating - a.rating;
    return 0; // Default Recommended
  });

  if (sortedProducts.length === 0) {
    return (
      <div className="no-results">
        <h3>No products found</h3>
        <p>Try searching for something else or clear the search.</p>
      </div>
    );
  }

  return (
    <section className="product-grid-container" id="products">
      <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '2px solid var(--border-color)', paddingBottom: '10px' }}>
        <h2 className="section-title" style={{ borderBottom: 'none', marginBottom: 0, paddingBottom: 0 }}>Top Deals</h2>
        
        <div className="sort-container" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Sort by:</span>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: '5px 10px', borderRadius: '4px', border: '1px solid #ccc', outline: 'none' }}
          >
            <option>Recommended</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Top Rated</option>
          </select>
        </div>
      </div>

      <div className="product-grid">
        {sortedProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart} 
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
          />
        ))}
      </div>
    </section>
  );
}
