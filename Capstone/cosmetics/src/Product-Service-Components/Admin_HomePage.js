// AdminPortal.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AdminHomePage() {



  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #ffe0f0, #fbe4ff)',
    padding: '40px',
    fontFamily: '"Segoe UI", sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const cardStyle = {
    background: '#fff0f6',
    padding: '30px',
    borderRadius: '20px',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center'
  };

  const linkStyle = {
    display: 'block',
    padding: '14px',
    margin: '12px 0',
    background: 'linear-gradient(to right, #f472b6, #ec4899)',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '12px',
    fontSize: '17px',
    transition: 'transform 0.2s ease-in-out'
  };

  const linkHoverStyle = {
    transform: 'scale(1.05)'
  };

  return (
    <>
        <div className="lumiere-link">
        <a href="/">Lumière</a>
      </div>
    <div style={containerStyle}>
      <motion.h2
        style={{ color: '#b83280', marginBottom: '20px' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        ✨ Admin Portal ✨
      </motion.h2>
      <motion.div
        style={cardStyle}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {[
          { label: 'Manage Products', path: '/admin' },
          { label: 'Add Product', path: '/add' },
          { label: 'Update Product', path: '/update/1' },
          { label: 'Dashboard', path: '/dashboard' },
          { label: 'Logout', path: '/logout' }
        ].map((route) => (
          <motion.div
            key={route.path}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to={route.path} style={linkStyle}>{route.label}</Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
    </>
  );
}