import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CustomerHomePage() {
  const navigate = useNavigate();
//   const isLoggedIn = localStorage.getItem('customer_token');

//   if (!isLoggedIn) {
//     navigate('/customer_login');
//     return null;
//   }

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #fffaf0, #ffe4e1)',
    padding: '40px',
    fontFamily: '"Segoe UI", sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  };

  const cardStyle = {
    background: '#fffaf4',
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
    background: 'linear-gradient(to right, #fb923c, #f97316)',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '12px',
    fontSize: '17px',
    transition: 'transform 0.2s ease-in-out'
  };

  return (
    <>
    <div className="lumiere-link">
    <a href="/">Lumière</a>
  </div>
    <div style={containerStyle}>
      <motion.h2
        style={{ color: '#d2691e', marginBottom: '20px' }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🌸 Customer Portal 🌸
      </motion.h2>
      <motion.div
        style={cardStyle}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {[
          { label: 'View All Products', path: '/products' },
          { label: 'Register', path: '/customer_register' },
          { label: 'My Orders', path: '/customer_orders' },
          { label: 'Feedback', path: '/feedback' },
          { label: 'Recommendations', path: '/recommendation' },
          { label: 'My Profile', path: '/customer_profile' },
          { label: 'Logout', path: '/logout'}
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
