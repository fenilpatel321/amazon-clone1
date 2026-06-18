import React from 'react';
import { FaShippingFast, FaUndo, FaLock, FaTags } from 'react-icons/fa';
import './Features.css';

export default function Features() {
  const features = [
    { title: "Free Delivery", icon: <FaShippingFast size={24} />, desc: "On orders over ₹499" },
    { title: "Easy Returns", icon: <FaUndo size={24} />, desc: "10-day replacement" },
    { title: "Secure Payment", icon: <FaLock size={24} />, desc: "100% protected" },
    { title: "Best Prices", icon: <FaTags size={24} />, desc: "Guaranteed savings" }
  ];

  return (
    <section className="container py-8">
      <div className="features-grid">
        {features.map((f, i) => (
          <div key={i} className="feature-card glass-panel">
            <div className="feature-icon text-accent">{f.icon}</div>
            <div className="feature-info">
              <h4 className="font-bold text-lg">{f.title}</h4>
              <p className="text-sm text-muted">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
