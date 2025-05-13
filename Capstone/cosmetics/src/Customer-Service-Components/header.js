import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header style={{ backgroundColor: '#F5EBE0', padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
    <h1 style={{ color: '#DBA39A' }}>Lumiere</h1>
    <nav>
      <Link to="/products" style={styles.link}>Home</Link>
      <Link to="/customer_register" style={styles.link}>Register</Link>
      {/* <Link to="/login" style={styles.link}>Login</Link> */}
      <Link to="/customer_profile" style={styles.link}>Profile</Link>
      <Link to="/customer_orders" style={styles.link}>Order History</Link>
    </nav>
  </header>
);

const styles = {
  link: {
    margin: '0 10px',
    textDecoration: 'none',
    color: '#DBA39A',
  },
};

export default Header;
