import React from 'react';
import HeroBanner from '../components/HeroBanner';
import Categories from '../components/Categories';
import Features from '../components/Features';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';

export default function Home({ searchQuery, onAddToCart, wishlist, toggleWishlist }) {
  // Filter products based on search query
  const filteredProducts = products.filter(product => {
    return product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           product.category.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <HeroBanner />
      <Categories />
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
