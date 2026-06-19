import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Cart State
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalWishlistCount = wishlist.length;

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="app">
            <Toaster position="bottom-right" toastOptions={{
              style: {
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
              }
            }}/>
            <Header 
              searchQuery={searchQuery} 
              onSearchChange={setSearchQuery} 
              cartCount={totalCartCount} 
              wishlistCount={totalWishlistCount}
            />
            <Navbar onCategoryClick={setSearchQuery} />
            <main>
              <Routes>
                <Route 
                  path="/" 
                  element={
                    <Home 
                      searchQuery={searchQuery} 
                      onAddToCart={handleAddToCart} 
                      wishlist={wishlist}
                      toggleWishlist={toggleWishlist}
                    />
                  } 
                />
                <Route 
                  path="/product/:id" 
                  element={
                    <ProductDetails 
                      onAddToCart={handleAddToCart} 
                      wishlist={wishlist}
                      toggleWishlist={toggleWishlist}
                    />
                  } 
                />
                <Route 
                  path="/cart" 
                  element={
                    <Cart 
                      cartItems={cartItems} 
                      updateQuantity={updateQuantity} 
                      removeItem={removeItem} 
                    />
                  } 
                />
                <Route 
                  path="/wishlist" 
                  element={
                    <Wishlist 
                      wishlist={wishlist} 
                      toggleWishlist={toggleWishlist}
                      onAddToCart={handleAddToCart}
                    />
                  } 
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/checkout" element={<Checkout clearCart={() => setCartItems([])} />} />
                <Route path="/order-success" element={<OrderSuccess />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
