import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Customer-Service-Components/header';
import Footer from './footer';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    skinType: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5001/api/customers/681b468a113a5320ab4aed37'
        );
        console.log(response.data);
        setUser(response.data);
        setFormData({
          name: response.data.name,
          age: response.data.age,
          gender: response.data.gender,
          skinType: response.data.skinType,
        });
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      // Send PUT request to backend to update customer data
      await axios.put(
        `http://localhost:5001/api/customers/681b468a113a5320ab4aed37`,
        formData
      );
      setUser({ ...user, ...formData });
      setEditMode(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (!user)
    return (
      <p style={{ padding: '20px', textAlign: 'center' }}>Loading...</p>
    );

  return (
    <>
    <Header />
    <div style={styles.container}>
      <h2 style={styles.heading}>My Profile</h2>
      <div style={styles.infoGrid}>
        <div style={styles.label}>ID</div>
        <div style={styles.value}>{user._id}</div>
        <div style={styles.label}>Email</div>
        <div style={styles.value}>{user.email}</div>

        <div style={styles.label}>Name</div>
        <div style={styles.value}>
          {editMode ? (
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
            />
          ) : (
            user.name
          )}
        </div>

        <div style={styles.label}>Age</div>
        <div style={styles.value}>
          {editMode ? (
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              style={styles.input}
            />
          ) : (
            user.age
          )}
        </div>

        <div style={styles.label}>Gender</div>
        <div style={styles.value}>
          {editMode ? (
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">Select</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            user.gender
          )}
        </div>

        <div style={styles.label}>Skin Type</div>
        <div style={styles.value}>
          {editMode ? (
            <select
              name="skinType"
              value={formData.skinType}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">Select</option>
              <option value="dry">Dry</option>
              <option value="oily">Oily</option>
              <option value="combination">Combination</option>
              <option value="normal">Normal</option>
            </select>
          ) : (
            user.skinType
          )}
        </div>
      </div>

      <button
        onClick={editMode ? handleSave : () => setEditMode(true)}
        style={styles.button}
      >
        {editMode ? 'Save Changes' : 'Edit Profile'}
      </button>
    </div>
    <Footer />
    </>
  );
};

const styles = {
  container: {
    maxWidth: '480px',
    margin: '40px auto',
    padding: '32px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #FEFCF3 0%, #F0DBDB 100%)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    textAlign: 'center',
    fontFamily: "'Montserrat', sans-serif",
    boxSizing: 'border-box',
  },
  heading: {
    fontFamily: "'Playfair Display', serif",
    fontSize: '2.2rem',
    color: '#8C5E58',
    marginBottom: '24px',
  },
  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gap: '16px 24px',
    marginBottom: '32px',
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
    boxSizing: 'border-box',
  },
  label: {
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontSize: '0.85rem',
    color: '#7A6A68',
    alignSelf: 'center',
    textAlign: 'left',
  },
  value: {
    fontSize: '0.95rem',
    color: '#333',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '8px 12px',
    fontSize: '0.95rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  select: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '8px 12px',
    fontSize: '0.95rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#fff',
  },
  button: {
    padding: '12px 28px',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#8C5E58',
    border: 'none',
    borderRadius: '24px',
    cursor: 'pointer',
    transition: 'transform 0.2s ease',
  },
};

export default Profile;