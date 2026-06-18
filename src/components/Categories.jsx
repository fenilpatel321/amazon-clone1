import React from 'react';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import './Categories.css';

export default function Categories({ activeCategory, onCategorySelect }) {
  const baseCats = [
    { name: "All", icon: "🛍️", label: "All Products" },
    { name: "Mobiles", icon: "📱", label: "Mobiles" },
    { name: "Laptops", icon: "💻", label: "Laptops" },
    { name: "Fashion", icon: "👕", label: "Fashion" },
    { name: "Home & Kitchen", icon: "🏠", label: "Home & Kitchen" },
    { name: "Beauty", icon: "💄", label: "Beauty" },
    { name: "Sports", icon: "⚽", label: "Sports" },
    { name: "Books", icon: "📚", label: "Books" },
    { name: "Automotive", icon: "🚗", label: "Automotive" },
  ];

  const catsWithCounts = baseCats.map(cat => ({
    ...cat,
    count: cat.name === 'All' 
      ? products.length 
      : products.filter(p => p.category === cat.name).length
  })).filter(cat => cat.count > 0);

  return (
    <section className="container py-8">
      <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
      <div className="categories-grid">
        {catsWithCounts.map((cat, idx) => (
          <motion.div 
            key={idx} 
            className={`category-card glass-panel ${activeCategory === cat.name ? 'active' : ''}`}
            whileHover={{ y: -5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
            onClick={() => onCategorySelect && onCategorySelect(cat.name)}
          >
            <span className="category-icon text-4xl mb-2">{cat.icon}</span>
            <span className="category-name font-medium">{cat.label}</span>
            <span className="category-count text-xs text-muted mt-1">{cat.count} Items</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
