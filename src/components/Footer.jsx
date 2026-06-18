import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">🛍️ eShop<span className="accent">Pro</span></h3>
            <p className="text-sm text-muted mt-2">
              Your one-stop destination for the best deals, top quality products, and unbeatable service.
            </p>
          </div>
          <div className="footer-section">
            <h3>Get to Know Us</h3>
            <a href="#">About Us</a>
            <a href="#">Careers</a>
            <a href="#">Press Releases</a>
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
          <div className="social-links">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedin /></a>
          </div>
          <p className="text-sm text-muted">&copy; {new Date().getFullYear()} eShopPro. Developed for Assessment. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
