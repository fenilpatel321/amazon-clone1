import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import './ProductCard.css';

export default function ProductCard({ product, onAddToCart, wishlist = [], toggleWishlist }) {
  const navigate = useNavigate();
  const isWishlisted = wishlist.some(item => item.id === product.id);

  const handleAddToCart = () => {
    onAddToCart(product);
    toast.success(`${product.title} added to cart`);
  };

  const handleBuyNow = () => {
    onAddToCart(product);
    navigate('/cart');
  };

  return (
    <motion.div 
      whileHover={{ y: -5, boxShadow: 'var(--shadow-xl)' }}
      className="product-card glass-panel"
    >
      <button 
        className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
        onClick={() => toggleWishlist(product)}
        aria-label="Add to Wishlist"
      >
        {isWishlisted ? <FaHeart color="var(--danger)" /> : <FaRegHeart color="var(--text-secondary)" />}
      </button>

      {product.badge && (
        <span className="product-badge bg-accent">
          {product.badge}
        </span>
      )}

      <Link to={`/product/${product.id}`} className="product-image-container">
        <img src={product.image} alt={product.title} className="product-image" loading="lazy" />
      </Link>

      <div className="product-info">
        <span className="text-xs text-muted font-medium uppercase tracking-wider">{product.category}</span>
        <Link to={`/product/${product.id}`}>
          <h3 className="product-title text-base font-semibold line-clamp-2 mt-1 mb-2">{product.title}</h3>
        </Link>
        
        <div className="product-rating flex items-center gap-1 mb-2">
          <FaStar color="#f59e0b" size={14} />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-xs text-muted">({Math.floor(Math.random() * 500) + 50})</span>
        </div>

        <div className="product-pricing mb-4">
          <span className="text-xl font-bold">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted line-through ml-2">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
          {product.discount > 0 && (
            <span className="text-xs font-bold text-success ml-2">{product.discount}% off</span>
          )}
        </div>

        <div className="product-actions flex gap-2">
          <button className="btn-secondary flex-1" onClick={handleAddToCart}>Add to Cart</button>
          <button className="btn-primary flex-1" onClick={handleBuyNow}>Buy Now</button>
        </div>
      </div>
    </motion.div>
  );
}
