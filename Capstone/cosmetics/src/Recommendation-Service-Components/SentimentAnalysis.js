// src/components/SentimentAnalysis.js
import React, { useState } from 'react';
import { getSentimentStats } from './Api';

const SentimentAnalysis = () => {
  const [productId, setProductId] = useState('');
  const [sentiment, setSentiment] = useState(null);
  const [error, setError] = useState(null);

  const handleCheck = async () => {
    setError(null);
    setSentiment(null);

    try {
      const stats = await getSentimentStats(productId);
      setSentiment(stats);
    } catch (err) {
      setError('⚠️ Could not retrieve sentiment. Check Product ID or try again.');
    }
  };

  return (
    <div className="sentiment-analysis">
      <h2>Sentiment Overview</h2>
      <input
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        placeholder="Enter Product ID"
        className="input-field"
      />
      <button className="analyze-button" onClick={handleCheck}>
        Analyze
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {sentiment && (
        <ul>
          <li>😊 Positive: {sentiment.positive}%</li>
          <li>😞 Negative: {sentiment.negative}%</li>
        </ul>
      )}
    </div>
  );
};

export default SentimentAnalysis;
