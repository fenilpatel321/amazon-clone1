import React, { useContext } from 'react';
import { FaShoppingCart, FaSearch, FaHeart, FaMoon, FaSun } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import './Header.css';

export default function Header({ searchQuery, onSearchChange, cartCount, wishlistCount }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <header className="header glass-panel">
      <div className="container header-container">
        <Link to="/" className="header-logo">
          <motion.div whileHover={{ scale: 1.05 }} className="logo-text">
            🛍️ eShop<span className="accent">Pro</span>
          </motion.div>
        </Link>

        <form className="header-search" onSubmit={handleSearchSubmit}>
          <input 
            type="text" 
            className="input-field search-input"
            placeholder="Search products, brands and more..." 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <button type="submit" className="search-btn" aria-label="Search">
            <FaSearch />
          </button>
        </form>

        <div className="header-actions">
          <button onClick={toggleTheme} className="icon-btn theme-toggle">
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>

          {user ? (
            <div className="nav-link user-menu">
              <span className="text-xs text-muted">Hello, {user.name || 'User'}</span>
              <strong onClick={logout} className="logout-btn">Logout</strong>
            </div>
          ) : (
            <Link to="/login" className="nav-link">
              <span className="text-xs text-muted">Hello, Sign in</span>
              <strong className="font-semibold">Account & Lists</strong>
            </Link>
          )}
          
          <Link to="/wishlist" className="header-icon-link">
            <div className="icon-wrapper">
              <FaHeart color={wishlistCount > 0 ? 'var(--danger)' : 'currentColor'} /> 
              {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
            </div>
            <span className="link-text font-medium text-sm">Wishlist</span>
          </Link>

          <Link to="/cart" className="header-icon-link">
            <div className="icon-wrapper">
              <FaShoppingCart /> 
              {cartCount > 0 && <span className="badge">{cartCount}</span>}
            </div>
            <span className="link-text font-medium text-sm">Cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
