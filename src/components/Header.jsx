import React, { useContext, useState, useEffect, useRef } from 'react';
import { FaShoppingCart, FaSearch, FaHeart, FaMoon, FaSun } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { products } from '../data/products';
import './Header.css';

export default function Header({ searchQuery, onSearchChange, cartCount, wishlistCount }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase().trim();
      // Simple suggestion logic: Match category or title
      const matches = products.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
      );
      
      // Get unique suggestions (could be categories or titles)
      const uniqueSuggestions = [];
      const addedKeys = new Set();
      
      matches.forEach(p => {
        if (p.category.toLowerCase().includes(query) && !addedKeys.has(p.category)) {
          uniqueSuggestions.push({ type: 'category', text: p.category });
          addedKeys.add(p.category);
        }
        if (p.title.toLowerCase().includes(query) && !addedKeys.has(p.title)) {
          uniqueSuggestions.push({ type: 'product', text: p.title, id: p.id });
          addedKeys.add(p.title);
        }
      });
      
      setSuggestions(uniqueSuggestions.slice(0, 5)); // Limit to 5 suggestions
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    navigate('/');
  };

  const handleSuggestionClick = (text) => {
    onSearchChange(text);
    setShowSuggestions(false);
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

        <div className="header-search-container" ref={searchRef} style={{ flex: 1, maxWidth: '600px', position: 'relative' }}>
          <form className="header-search" onSubmit={handleSearchSubmit} style={{ maxWidth: '100%' }}>
            <input 
              type="text" 
              className="input-field search-input"
              placeholder="Search products, brands and more..." 
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => searchQuery.trim().length > 0 && setShowSuggestions(true)}
            />
            <button type="submit" className="search-btn" aria-label="Search">
              <FaSearch />
            </button>
          </form>

          <AnimatePresence>
            {showSuggestions && suggestions.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="search-suggestions glass-panel"
              >
                {suggestions.map((suggestion, index) => (
                  <div 
                    key={index} 
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(suggestion.text)}
                  >
                    <FaSearch className="suggestion-icon text-muted" />
                    <span>{suggestion.text}</span>
                    {suggestion.type === 'category' && (
                      <span className="badge-category text-xs text-muted ml-auto">in {suggestion.text}</span>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
