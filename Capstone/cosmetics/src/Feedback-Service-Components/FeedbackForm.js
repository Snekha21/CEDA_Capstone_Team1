import React, { useState, useEffect } from 'react';
import '../styles/FeedbackForm.css';
import { useNavigate } from 'react-router-dom';

function FeedbackForm() {
 const [formData, setFormData] = useState({
   product_id: '',
   user_id: '',
   skin_type: '',
   rating: 5,
   review_text: ''
 });
 const [message, setMessage] = useState('');
 const [reviews, setReviews] = useState([]);
 const navigate = useNavigate();
 useEffect(() => {
   fetchReviews();
 }, []);
 const handleChange = (e) => {
   setFormData({ ...formData, [e.target.name]: e.target.value });
 };
 const fetchReviews = async () => {
   
     //const token = localStorage.getItem("token");
     const response = await fetch("http://localhost:5000/feedback/all", {
       headers: {
         //'Authorization': `Bearer ${token}`
       }
     }).catch(error =>{console.log('API Error '+error );
      navigate('/maintain');
     });;
     const data = await response.json();
     setReviews(data.reviews || []);
   
 };
 const handleSubmit = async (e) => {
   e.preventDefault();
  
     //const token = localStorage.getItem("token");
     const response = await fetch("http://localhost:5000/feedback/submit", {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
         //'Authorization': `Bearer ${token}`
       },
       body: JSON.stringify(formData)
     }).catch(error =>{console.log('API Error '+error );
      navigate('/maintain');
     });
     if (response.ok) {
       setMessage("Feedback submitted successfully!");
       setFormData({
         product_id: '',
         user_id: '',
         skin_type: '',
         rating: 5,
         review_text: ''
       });
       fetchReviews();  // refresh the reviews
     } else {
       const errorData = await response.json();
       setMessage("Error: " + errorData.message || "Failed to submit");
     }
   } 
 // Replace the return block in FeedbackForm.js with the below JSX

return (
  
<div className="cute-container">
<header className="app-header">
<h1>Cosmetics E-Commerce Feedback</h1>
</header>

{/* <nav className="navbar navbar-expand-lg shadow-sm app-navbar"> */}
{/* <div className="container"> */}
{/* <a className="navbar-brand text-pink fw-bold" href="/">Cosmetics Feedback</a>
<div className="ml-auto">
<a className="btn btn-pink me-2" href="/feedback">Submit Feedback</a> */}
<br></br>
{/* </div> */}
{/* </div> */}
{/* </nav> */}
  <div className="cute-form-card shadow">
  <h2 className="form-title">Share Your Glow-Up!</h2>
  
        {message && <p className="message">{message}</p>}
  <form onSubmit={handleSubmit} className="feedback-form">
  <input type="text" name="product_id" placeholder="Product ID" value={formData.product_id} onChange={handleChange} required />
  <input type="text" name="user_id" placeholder="Your Name / User ID" value={formData.user_id} onChange={handleChange} required />
  <select name="skin_type" value={formData.skin_type} onChange={handleChange} required>
  <option value="">Skin Type</option>
  <option value="Oily">Oily</option>
  <option value="Dry">Dry</option>
  <option value="Combination">Combination</option>
  <option value="Sensitive">Sensitive</option>
  </select>
  <div className="star-rating">
  
            {[1, 2, 3, 4, 5].map((star) => (
  <span
  
                key={star}
  
                className={star <= formData.rating ? "star filled" : "star"}
  
                onClick={() => setFormData({ ...formData, rating: star })}
  >&#9733;</span>
  
            ))}
  </div>
  <textarea name="review_text" placeholder="Write your magical review..." value={formData.review_text} onChange={handleChange} rows="4" required />
  <button type="submit">Submit</button>
  </form>
  </div>
  <div className="review-stream-section">
  <h3 className="review-header">What Others Say?</h3>
  <div className="review-stream">
  
          {[...reviews].reverse().slice(0, 5).map((review, index) => (
  <div className="review-card" key={index}>
  <h5>{review.user_id}</h5>
  <div className="stars">
  
                {[1, 2, 3, 4, 5].map((star) => (
  <span key={star} className={star <= review.rating ? "star filled" : "star"}>&#9733;</span>
  
                ))}
  </div>
  <p>“{review.review_text}”</p>
  </div>
  
          ))}
  </div>
  </div>
  </div>
  
  );
   
}
export default FeedbackForm;