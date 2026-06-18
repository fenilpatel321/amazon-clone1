import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css';

export default function Navbar({ onCategoryClick }) {
  const navigate = useNavigate();
  
  const links = [
    "All", "Electronics", "Fashion", "Beauty", "Home & Kitchen", "Sports", "Automotive"
  ];

  const handleCategoryClick = (e, link) => {
    e.preventDefault();
    if (link === "All") {
      onCategoryClick('');
    } else {
      onCategoryClick(link.split(' ')[0]);
    }
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        {links.map((link, idx) => (
          <motion.a 
            key={idx} 
            href="#" 
            onClick={(e) => handleCategoryClick(e, link)}
            whileHover={{ y: -2, color: 'var(--accent-primary)' }}
            whileTap={{ scale: 0.95 }}
            className="nav-item text-sm font-medium"
          >
            {link}
          </motion.a>
        ))}
      </div>
    </nav>
  );
}
