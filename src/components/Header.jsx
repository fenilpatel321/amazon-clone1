import React from 'react';
import { FaShoppingCart, FaSearch, FaHeart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ searchQuery, onSearchChange, cartCount, wishlistCount }) {
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <header className="header">
      <Link to="/" className="header-logo" style={{textDecoration: 'none'}}>
        🛍️ eShop<span>Pro</span>
      </Link>

      <div className="header-location">
        <span>Deliver to</span>
        <strong>📍 India</strong>
      </div>

      <form className="header-search" onSubmit={handleSearchSubmit}>
        <input 
          type="text" 
          placeholder="Search for products, brands and more..." 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <button type="submit" aria-label="Search"><FaSearch /></button>
      </form>

      <div className="header-nav">
        <div className="nav-link">
          <span>Hello, Sign in</span>
          <strong>Account & Lists</strong>
        </div>
        <div className="nav-link">
          <span>Returns</span>
          <strong>& Orders</strong>
        </div>
        
        <Link to="/wishlist" className="header-cart" style={{textDecoration: 'none'}}>
          <FaHeart color={wishlistCount > 0 ? '#ff6161' : 'white'} /> 
          <span className="cart-count">{wishlistCount}</span> 
          <span>Wishlist</span>
        </Link>

        <Link to="/cart" className="header-cart" style={{textDecoration: 'none'}}>
          <FaShoppingCart /> <span className="cart-count">{cartCount}</span> Cart
        </Link>
      </div>
    </header>
  );
}
