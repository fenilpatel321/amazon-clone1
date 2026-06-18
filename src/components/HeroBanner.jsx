import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './HeroBanner.css';

const banners = [
  {
    id: 1,
    title: 'The Big Billion Days Sale',
    subtitle: 'Up to 80% Off on Top Brands. Limited Time Offer!',
    cta: 'Explore Deals',
    bgClass: 'bg-banner-1',
  },
  {
    id: 2,
    title: 'New Arrivals in Electronics',
    subtitle: 'Upgrade your tech with the latest gadgets and accessories.',
    cta: 'Shop Electronics',
    bgClass: 'bg-banner-2',
  },
  {
    id: 3,
    title: 'Summer Fashion Fiesta',
    subtitle: 'Get ready for the sun with our premium new collection.',
    cta: 'Discover Fashion',
    bgClass: 'bg-banner-3',
  }
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-banner-container container">
      <div className="hero-banner glass-panel">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5 }}
            className={`banner-slide ${banners[current].bgClass}`}
          >
            <div className="banner-content">
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold"
              >
                {banners[current].title}
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg"
              >
                {banners[current].subtitle}
              </motion.p>
              <motion.button 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary banner-btn"
              >
                {banners[current].cta}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
        
        <div className="banner-dots">
          {banners.map((_, idx) => (
            <div 
              key={idx} 
              className={`dot ${idx === current ? 'active' : ''}`}
              onClick={() => setCurrent(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
