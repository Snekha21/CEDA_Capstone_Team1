// ReviewForm.js (or wherever you handle the review submission)
import React, { useState } from 'react';
import '../App.css';  

const ReviewForm = () => {
  const [productId, setProductId] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make sure all fields are filled out
    if (!productId || !review || !rating) {
      alert('All fields are required');
      return;
    }

    const reviewData = {
      product_id: productId,
      review: review,
      rating: parseInt(rating), // Rating must be a number
    };

    try {
      const response = await fetch('http://localhost:8080/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),  // Send data as JSON
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('Review submitted successfully!');
      } else {
        alert('Error: ' + data.error);
      }
    } catch (error) {
      alert('Error submitting review: ' + error.message);
    }
  };

  return (
    <div className="section-container">
      <h2>Submit Review</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="text"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
        />
        <textarea
          className="input-field"
          placeholder="Write your review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />
        <input
          className="input-field"
          type="number"
          placeholder="Rating (1-5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
          required
        />
        <button className="analyze-button" type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;
