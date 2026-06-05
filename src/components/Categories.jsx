import React from 'react';

export default function Categories() {
  const cats = [
    { name: "Electronics", icon: "💻" },
    { name: "Fashion", icon: "👕" },
    { name: "Home & Kitchen", icon: "🏠" },
    { name: "Beauty", icon: "💄" },
    { name: "Sports", icon: "⚽" },
    { name: "Books", icon: "📚" },
    { name: "Automotive", icon: "🚗" },
  ];

  return (
    <div className="categories-wrapper">
      <div className="categories">
        {cats.map((cat, idx) => (
          <div key={idx} className="category-card">
            <span className="category-icon">{cat.icon}</span>
            <span className="category-name">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
