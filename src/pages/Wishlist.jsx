import React from 'react';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

export default function Wishlist({ wishlist, toggleWishlist, onAddToCart }) {
  if (wishlist.length === 0) {
    return (
      <div className="empty-cart-container">
        <div className="empty-cart">
          <div className="empty-cart-content" style={{textAlign: 'center'}}>
            <h2 style={{marginBottom: '20px'}}>Your Wishlist is empty</h2>
            <p style={{color: '#565959', marginBottom: '20px'}}>
              Save items you want to buy later by clicking the heart icon.
            </p>
            <Link to="/" className="btn btn-buy" style={{display: 'inline-block'}}>Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-grid-container" style={{marginTop: '40px'}}>
      <h2 className="section-title">Your Wishlist ({wishlist.length} items)</h2>
      <div className="product-grid">
        {wishlist.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
          />
        ))}
      </div>
    </div>
  );
}
