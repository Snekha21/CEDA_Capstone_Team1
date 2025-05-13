// src/components/PromoPopup.js
import React, { useState, useEffect } from 'react';
import '../styles/PromoPopup.css';

const PromoPopup = () => {
  const [visible, setVisible] = useState(true);

  // Automatically hide after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 10000); // Hide after 10 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="promo-popup">
      <div className="promo-content">
        <button className="close-btn" onClick={() => setVisible(false)}>✕</button>
        <h3>🎉 Enjoy up to 25% Off!</h3>
        <p>Use code: <strong>LUM50</strong> at checkout</p>
      </div>
    </div>
  );
};

export default PromoPopup;
