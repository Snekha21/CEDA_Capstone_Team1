import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Logins.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5050/api/admin_login', {
        email,
        password
      });

      if (response.status === 200) {
        setMessage('Login successful! Redirecting to admin dashboard...');
        setError('');
        localStorage.setItem('adminLoggedIn', 'true');
        navigate('/admin_home');
      }
    } catch (err) {
      setError('Invalid email or password');
      setMessage('');
    }
  };

  return (
    <>
      <div className="lumiere-link">
        <a href="/">Lumière</a>
      </div>
      <div className="section-container">
        <h2>Admin Login</h2>
        {message && <p className="highlight-tagline">{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="input-field"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="input-field"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="analyze-button">Login</button>
        </form>
        <div className="section-container">
        <h2>New Admin?</h2>
        <Link to="/admin_signup" className="analyze-button">Sign up</Link>
        </div>
      </div>
    </>
  );
  
};

export default AdminLogin;
