import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { FaStar, FaArrowLeft, FaShoppingCart, FaBolt } from 'react-icons/fa';

export default function ProductDetails({ onAddToCart, wishlist = [], toggleWishlist }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));

  // Find similar products based on the same category (excluding current product)
  const similarProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <Link to="/" className="btn btn-buy">Back to Home</Link>
      </div>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(<FaStar key={i} color={i <= Math.round(rating) ? '#ffa41c' : '#ccc'} />);
    }
    return stars;
  };

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  const handleBuyNow = () => {
    onAddToCart(product);
    navigate('/cart');
  };

  return (
    <div className="product-details-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>

      <div className="product-details-content">
        <div className="product-details-image">
          {product.badge && (
            <span className={`detail-badge badge-${product.badge.toLowerCase().replace(' ', '-')}`}>
              {product.badge}
            </span>
          )}
          <img src={product.image} alt={product.title} />
        </div>

        <div className="product-details-info">
          <div className="detail-category">{product.category}</div>
          <h1 className="detail-title">{product.title}</h1>
          
          <div className="detail-rating">
            {renderStars(product.rating)} 
            <span className="rating-count">({Math.floor(Math.random() * 5000) + 100} ratings)</span>
          </div>

          <hr className="detail-divider" />

          <div className="detail-pricing">
            {product.discount > 0 && <span className="detail-discount-badge">-{product.discount}%</span>}
            <span className="detail-price">
              <span className="currency">₹</span>
              {product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && (
              <div className="detail-mrp">
                M.R.P.: <span className="original">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              </div>
            )}
          </div>

          <p className="detail-tax-info">Inclusive of all taxes</p>

          <hr className="detail-divider" />

          <div className="detail-offers">
            <h3>Offers</h3>
            <div className="offer-card">
              <h4>Bank Offer</h4>
              <p>10% Instant Discount on SBI Credit Cards</p>
            </div>
          </div>

          <hr className="detail-divider" />
          
          <div className="detail-description">
            <h3>About this item</h3>
            <ul>
              <li>High-quality materials designed for longevity and performance.</li>
              <li>Sleek, modern design that fits perfectly in any setup.</li>
              <li>Industry leading warranty and excellent customer support.</li>
              <li>Rated top in its class by experts and users alike.</li>
            </ul>
          </div>

        </div>

        <div className="product-details-actions">
          <div className="action-box">
            <h3 className="action-price">₹{product.price.toLocaleString('en-IN')}</h3>
            <p className="delivery-info">
              <span className="free-delivery">FREE delivery</span> by Tomorrow
            </p>
            <h4 className="in-stock">In stock</h4>
            <div className="sold-by">Sold by <span>RetailNet</span> and Fulfilled by Us.</div>

            <button className="btn btn-cart action-btn" onClick={handleAddToCart}>
              <FaShoppingCart /> Add to Cart
            </button>
            <button className="btn btn-buy action-btn" onClick={handleBuyNow}>
              <FaBolt /> Buy Now
            </button>

            <div className="secure-transaction">
              🔒 Secure transaction
            </div>
          </div>
        </div>
      </div>

      <div className="similar-products-section" style={{ marginTop: '50px' }}>
        <h2 className="section-title">Similar Products</h2>
        <div className="product-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
          {similarProducts.map(p => (
            <div key={p.id} className="product-card" style={{ padding: '15px' }}>
              <Link to={`/product/${p.id}`} className="product-image-link" style={{ display: 'block', marginBottom: '10px' }}>
                <img src={p.image} alt={p.title} className="product-image" loading="lazy" style={{ height: '150px' }} />
              </Link>
              <span className="product-category" style={{ fontSize: '0.75rem' }}>{p.category}</span>
              <Link to={`/product/${p.id}`} className="product-title-link">
                <h3 className="product-title" style={{ fontSize: '0.95rem' }}>{p.title}</h3>
              </Link>
              <div className="price" style={{ fontSize: '1.2rem', marginTop: '10px' }}>₹{p.price.toLocaleString('en-IN')}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
