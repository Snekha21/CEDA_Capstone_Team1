// src/components/Recommendations.js
import React, { useEffect, useState } from 'react';
import { getRecommendations } from './Api';

const skinTypeTips = {
  oily: "For oily skin, use non-comedogenic products that don't clog pores. A gel-based moisturizer works best.",
  dry: "For dry skin, hydrate regularly using a rich, creamy moisturizer and avoid alcohol-based products.",
  sensitive: "Sensitive skin benefits from fragrance-free and hypoallergenic products. Always patch test new items."
};

const Recommendations = () => {
  const [skinType, setSkinType] = useState('oily');
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    getRecommendations(skinType).then(setRecs);
  }, [skinType]);

  return (
    <div className="recommendations-container">
      <h2>Top Rated Products for Your Skin</h2>
      
      {/* Skin Type Select Input */}
      <select
        onChange={(e) => setSkinType(e.target.value)}
        value={skinType}
        className="input-field"
      >
        <option value="oily">Oily</option>
        <option value="dry">Dry</option>
        <option value="sensitive">Sensitive</option>
      </select>

      {/* Recommendations List */}
      <ul>
        {recs.map((rec) => (
          <li key={rec.product_id}>
            Product {rec.product_id} — ⭐ {rec.avg_rating}
          </li>
        ))}
      </ul>

      {/* Personalized Tip */}
      <div className="personal-tip">
        <h3>Personalized Tip</h3>
        <p>{skinTypeTips[skinType]}</p>
      </div>
    </div>
  );
};

export default Recommendations;
