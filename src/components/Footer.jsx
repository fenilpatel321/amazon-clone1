import React from 'react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Get to Know Us</h3>
          <a href="#">About Us</a>
          <a href="#">Careers</a>
          <a href="#">Press Releases</a>
        </div>
        <div className="footer-section">
          <h3>Connect with Us</h3>
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
        </div>
        <div className="footer-section">
          <h3>Make Money with Us</h3>
          <a href="#">Sell on eShop</a>
          <a href="#">Become an Affiliate</a>
          <a href="#">Advertise Your Products</a>
        </div>
        <div className="footer-section">
          <h3>Let Us Help You</h3>
          <a href="#">Your Account</a>
          <a href="#">Returns Centre</a>
          <a href="#">Help</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} eShopPro. Developed for Assessment. All rights reserved.</p>
      </div>
    </footer>
  );
}
