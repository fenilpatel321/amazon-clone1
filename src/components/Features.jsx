import React from 'react';

export default function Features() {
  const features = [
    { title: "Free Delivery", icon: "🚚", desc: "On orders over ₹499" },
    { title: "Easy Returns", icon: "🔄", desc: "10-day replacement" },
    { title: "Secure Payment", icon: "🔒", desc: "100% protected" },
    { title: "Best Prices", icon: "🏷️", desc: "Guaranteed savings" }
  ];

  return (
    <div className="features">
      {features.map((f, i) => (
        <div key={i} className="feature-card">
          <div className="feature-icon">{f.icon}</div>
          <div className="feature-info">
            <h4>{f.title}</h4>
            <p>{f.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
