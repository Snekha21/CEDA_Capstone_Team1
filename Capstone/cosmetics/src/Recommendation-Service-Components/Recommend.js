// src/App.js
import React from 'react';
import Recommendations from './Recommendations';
import ReviewForm from './ReviewForm';
import SentimentAnalysis from './SentimentAnalysis';
import PromoPopup from './PromoPopup';


import '../App.css';

function Recommend() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Lumière Top Link */}
      <div className="lumiere-link">
        <a href="#top" onClick={scrollToTop}>Lumière</a>
      </div>

      {/* Navbar */}
      <header className="navbar">
        <a href="#recommendations">Recommendations</a>
        <a href="#sentiment">Sentiment Analysis</a>
      </header>

      {/* Promo Popup */}
      <PromoPopup />

      {/* Main Section */}
      <section className="main-section" id="top">
        <h1>Welcome to Lumière</h1>
        <img src={require('../images/skin1.png')} alt="Product Image" />
        <p className="highlight-tagline">
          Discover the beauty of cosmetics with Lumière.
          <br />Curated Selections for Every Skin.
        </p>
      </section>

      {/* Recommendations Section */}
      <section id="recommendations" className="section-container">
        <Recommendations />
      </section>

      <div className="App">
        {/* Other components */}
        <ReviewForm />
       </div>

      {/* Sentiment Analysis Section */}
      <section id="sentiment" className="section-container">
        <SentimentAnalysis />
      </section>

    </div>
  );
}

export default Recommend;
