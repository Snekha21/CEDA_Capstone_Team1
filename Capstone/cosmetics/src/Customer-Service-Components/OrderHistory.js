import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Customer-Service-Components/header';
import Footer from './footer';

const OrderHistory = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // if (!userId) return;

    const fetchOrders = async () => {
      try {
        // Updated endpoint to match backend: /api/customers/orders/:id
        const response = await axios.get(
          `http://localhost:5001/api/customers/orders/681b468a113a5320ab4aed37`
        );
        setOrders(response.data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError('Unable to load order history.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) return <p style={styles.loading}>Loading your orders...</p>;
  if (error) return <p style={styles.error}>{error}</p>;

  return (
    <>
    <Header />
    <div style={styles.container}>
      <h2 style={styles.heading}>Order History</h2>
      {orders.length === 0 ? (
        <p style={styles.noOrders}>No orders found.</p>
      ) : (
        <ul style={styles.list}>
          {orders.map((order) => (
            <li key={order._id} style={styles.card}>
              <div style={styles.cardHeader}>
                <span style={styles.orderId}>
                  Order #{order._id.slice(-6).toUpperCase()}
                </span>
                <span style={styles.orderDate}>
                  {new Date(order.orderDate).toLocaleDateString()}
                </span>
              </div>
              <div style={styles.cardBody}>
                <p style={styles.product}>{order.product}</p>
                <div style={styles.detailsRow}>
                  <span style={styles.detailLabel}>Qty:</span>
                  <span style={styles.detailValue}>{order.quantity}</span>
                  <span style={styles.detailLabel}>Price:</span>
                  <span style={styles.detailValue}>₹{order.price.toFixed(2)}</span>
                </div>
              </div>
              <div style={styles.cardFooter}>
                <span style={styles.totalLabel}>Total</span>
                <span style={styles.totalValue}>
                  ₹{(order.price * order.quantity).toFixed(2)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    <Footer />
    </>
  );
};

const styles = {
  container: {
    maxWidth: '700px',
    margin: '40px auto',
    padding: '32px',
    background: '#FEFCF3',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
    fontFamily: "'Montserrat', sans-serif",
  },
  heading: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '2.4rem',
    color: '#8C5E58',
    textAlign: 'center',
    marginBottom: '32px',
  },
  loading: {
    textAlign: 'center',
    padding: '20px',
    fontStyle: 'italic',
    color: '#7A6A68',
  },
  error: {
    textAlign: 'center',
    padding: '20px',
    color: '#D9534F',
  },
  noOrders: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#7A6A68',
  },
  list: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  card: {
    background: '#FFFFFF',
    marginBottom: '24px',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
    transition: 'transform 0.2s ease',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '12px',
  },
  orderId: {
    fontSize: '0.9rem',
    letterSpacing: '1px',
    color: '#7A6A68',
    textTransform: 'uppercase',
  },
  orderDate: {
    fontSize: '0.9rem',
    fontStyle: 'italic',
    color: '#7A6A68',
  },
  cardBody: {
    borderTop: '1px solid #F0E9E6',
    borderBottom: '1px solid #F0E9E6',
    padding: '16px 0',
  },
  product: {
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#333333',
    marginBottom: '8px',
  },
  detailsRow: {
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '24px',
    fontSize: '0.95rem',
    color: '#555555',
  },
  detailLabel: {
    fontWeight: '600',
  },
  detailValue: {},
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '16px',
  },
  totalLabel: {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#7A6A68',
  },
  totalValue: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#8C5E58',
  },
};

export default OrderHistory;
