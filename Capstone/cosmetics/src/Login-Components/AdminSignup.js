import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Logins.css';
import { useNavigate } from 'react-router-dom';

const CustomerSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setMessage('');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5050/api/admin_signup', {
        name,
        email,
        password,
      });
      localStorage.setItem('customer_id', response.data.customer_id);

      if (response.status === 201) {
        setMessage('Signup successful! You can now log in.');
        setError('');
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        navigate('/admin_login');
      }
    } catch (err) {
      setError('Signup failed. Try again.'+err);
      setMessage('');
    }
  };

  return (
    <>
        <div className="lumiere-link">
        <a href="/">Lumière</a>
      </div>
    <div className="section-container">
        
      <h2>Admin Sign Up</h2>
      {message && <p className="highlight-tagline">{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-field"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          className="input-field"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="input-field"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          className="input-field"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="analyze-button">Sign Up</button>
      </form>
    </div>
    </>
  );
};

export default CustomerSignup;
