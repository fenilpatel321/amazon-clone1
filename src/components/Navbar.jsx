import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar({ onCategoryClick }) {
  const navigate = useNavigate();
  
  const links = [
    "☰ All", 
    "Today's Deals", 
    "Electronics", 
    "Fashion", 
    "Beauty", 
    "Home & Kitchen", 
    "Sports", 
    "Books", 
    "Automotive",
    "Customer Service"
  ];

  const handleCategoryClick = (e, link) => {
    e.preventDefault();
    if (link === "☰ All" || link === "Customer Service" || link === "Today's Deals") {
      onCategoryClick('');
    } else {
      // Just extract the first word for simple filtering
      onCategoryClick(link.split(' ')[0]);
    }
    navigate('/');
  };

  return (
    <nav className="navbar">
      {links.map((link, idx) => (
        <a key={idx} href="#" onClick={(e) => handleCategoryClick(e, link)}>
          {link}
        </a>
      ))}
    </nav>
  );
}
