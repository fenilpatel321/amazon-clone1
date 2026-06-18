import React, { useState } from 'react';
import HeroBanner from '../components/HeroBanner';
import Categories from '../components/Categories';
import Features from '../components/Features';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';

export default function Home({ searchQuery, onAddToCart, wishlist, toggleWishlist }) {
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter products based on search query and active category
  const filteredProducts = products.filter(product => {
    const query = searchQuery.toLowerCase().trim();
    const searchTerms = query.split(/\s+/);
    
    // Check if every search term matches either title or category
    const matchesSearch = query === '' || searchTerms.every(term => 
      product.title.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
    
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <HeroBanner />
      <Categories 
        activeCategory={activeCategory} 
        onCategorySelect={setActiveCategory} 
      />
      <Features />
      <ProductGrid 
        products={filteredProducts} 
        onAddToCart={onAddToCart} 
        wishlist={wishlist}
        toggleWishlist={toggleWishlist}
      />
    </>
  );
}
