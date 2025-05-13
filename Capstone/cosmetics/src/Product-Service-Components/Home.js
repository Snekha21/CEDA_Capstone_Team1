import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  const navigate = useNavigate();

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(to bottom right, #ffe4e6, #f3e8ff)',
    fontFamily: '"Segoe UI", sans-serif',
    textAlign: 'center',
    padding: '40px'
  };

  const cardStyle = {
    backgroundColor: '#fff0f6',
    padding: '30px 40px',
    borderRadius: '24px',
    boxShadow: '0 12px 28px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px'
  };

  const buttonStyle = {
    background: 'linear-gradient(to right, #f472b6, #ec4899)',
    color: 'white',
    padding: '14px 28px',
    borderRadius: '12px',
    border: 'none',
    margin: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease-in-out'
  };

  return (
    <div style={containerStyle}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ fontSize: '36px', color: '#d946ef', marginBottom: '30px' }}
      >
         Welcome to Lumière 
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={cardStyle}
      >
        <h2 style={{ color: '#c026d3', marginBottom: '20px' }}>Please choose your portal</h2>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <button
            style={buttonStyle}
            onClick={() => navigate('/admin_login')}
          >
            Admin
          </button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <button
            style={buttonStyle}
            onClick={() => navigate('/customer_login')}
          >
            Customer
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
