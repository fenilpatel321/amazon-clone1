import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

export default function ProductCard({ product, onAddToCart, wishlist = [], toggleWishlist }) {
  const navigate = useNavigate();
  
  const isWishlisted = wishlist.some(item => item.id === product.id);

  // Generate dummy stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<span key={i} style={{ color: i <= Math.round(rating) ? '#ffa41c' : '#ccc' }}>★</span>);
    }
    return stars;
  };

  return (
    <div className="product-card">
      <button 
        className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
        onClick={() => toggleWishlist(product)}
        aria-label="Add to Wishlist"
      >
        {isWishlisted ? <FaHeart color="#ff6161" /> : <FaRegHeart color="#ccc" />}
      </button>
      {product.badge && (
        <span className={`product-badge badge-${product.badge.toLowerCase().replace(' ', '-')}`}>
          {product.badge}
        </span>
      )}
      <Link to={`/product/${product.id}`} className="product-image-link">
        <img src={product.image} alt={product.title} className="product-image" loading="lazy" />
      </Link>
      <span className="product-category">{product.category}</span>
      <Link to={`/product/${product.id}`} className="product-title-link">
        <h3 className="product-title">{product.title}</h3>
      </Link>
      
      <div className="product-rating">
        {renderStars(product.rating)} <span style={{ color: '#007185', fontSize: '0.8rem' }}>({Math.floor(Math.random() * 5000) + 100})</span>
      </div>

      <div className="product-pricing">
        <span className="price">₹{product.price.toLocaleString('en-IN')}</span>
        {product.originalPrice && (
          <span className="original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
        )}
        {product.discount > 0 && (
          <span className="discount">({product.discount}% off)</span>
        )}
      </div>

      <div className="product-actions">
        <button className="btn btn-cart" onClick={() => onAddToCart(product)}>Add to Cart</button>
        <button className="btn btn-buy" onClick={() => { onAddToCart(product); navigate('/cart'); }}>Buy Now</button>
      </div>
    </div>
  );
}
