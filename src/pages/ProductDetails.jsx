import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { FaStar, FaArrowLeft, FaShoppingCart, FaBolt, FaShieldAlt, FaUndo, FaTruck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import './ProductDetails.css';

export default function ProductDetails({ onAddToCart, wishlist = [], toggleWishlist }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));

  const similarProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Product not found</h2>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    onAddToCart(product);
    toast.success(`${product.title} added to cart`);
  };

  const handleBuyNow = () => {
    onAddToCart(product);
    navigate('/cart');
  };

  return (
    <div className="container py-8">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>

      <div className="product-details-grid">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="product-image-col glass-panel"
        >
          {product.badge && (
            <span className="product-badge bg-accent">{product.badge}</span>
          )}
          <img src={product.image} alt={product.title} className="detail-main-image" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="product-info-col"
        >
          <span className="text-sm font-semibold uppercase tracking-wider text-muted">{product.category}</span>
          <h1 className="text-3xl font-bold mt-2 mb-4">{product.title}</h1>
          
          <div className="flex items-center gap-2 mb-6 border-b border-color pb-6">
            <div className="flex items-center gap-1 text-warning">
              <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar color="#ccc" />
            </div>
            <span className="font-medium">{product.rating}</span>
            <span className="text-muted ml-2">({Math.floor(Math.random() * 5000) + 100} reviews)</span>
          </div>

          <div className="pricing-section mb-6">
            <div className="flex items-end gap-3 mb-1">
              <span className="text-4xl font-bold">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted line-through mb-1">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
            </div>
            {product.discount > 0 && <span className="text-success font-semibold">You save {product.discount}%</span>}
            <p className="text-xs text-muted mt-1">Inclusive of all taxes</p>
          </div>

          <div className="features-grid mb-8">
            <div className="feature-item">
              <FaTruck size={24} className="text-accent" />
              <span className="text-sm">Free Delivery</span>
            </div>
            <div className="feature-item">
              <FaUndo size={24} className="text-accent" />
              <span className="text-sm">7 Days Return</span>
            </div>
            <div className="feature-item">
              <FaShieldAlt size={24} className="text-accent" />
              <span className="text-sm">1 Year Warranty</span>
            </div>
          </div>

          <div className="description-section mb-8">
            <h3 className="text-xl font-semibold mb-3">About this item</h3>
            <ul className="desc-list text-muted">
              <li>High-quality materials designed for longevity and performance.</li>
              <li>Sleek, modern design that fits perfectly in any setup.</li>
              <li>Industry leading warranty and excellent customer support.</li>
              <li>Rated top in its class by experts and users alike.</li>
            </ul>
          </div>

          <div className="actions-section glass-panel p-6 rounded-2xl">
            <div className="flex gap-4">
              <button className="btn-secondary flex-1 py-3 text-lg" onClick={handleAddToCart}>
                <FaShoppingCart /> Add to Cart
              </button>
              <button className="btn-primary flex-1 py-3 text-lg" onClick={handleBuyNow}>
                <FaBolt /> Buy Now
              </button>
            </div>
            <p className="text-center text-sm text-muted mt-4 flex items-center justify-center gap-1">
              <FaShieldAlt /> Secure transaction
            </p>
          </div>
        </motion.div>
      </div>

      {similarProducts.length > 0 && (
        <div className="similar-products mt-16">
          <h2 className="text-2xl font-bold mb-6 border-b border-color pb-2">Similar Products</h2>
          <div className="similar-grid">
            {similarProducts.map(p => (
              <Link to={`/product/${p.id}`} key={p.id} className="similar-card glass-panel">
                <img src={p.image} alt={p.title} />
                <div className="p-4">
                  <h3 className="text-sm font-semibold line-clamp-2 mb-2">{p.title}</h3>
                  <span className="font-bold text-lg">₹{p.price.toLocaleString('en-IN')}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
