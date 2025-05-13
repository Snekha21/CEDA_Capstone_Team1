import React, { useState } from 'react';
import Header from './header';
import Footer from './footer';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender:'',
    skinType: '',
    email: '',
    password: '',
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register:', form);
  };

  return (
    <>
    <Header  />
    <div style={styles.container}>
      <h2 style={styles.heading}>Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="name"
          placeholder="Name"
          value={form.username}
          onChange={handleChange}
          style={styles.input}
        />
          <input
            name="age"
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            style={styles.input}
          />
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>
        <select
          name="skinType"
          value={form.skinType}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="">Select Skin Type</option>
          <option value="dry">Dry</option>
          <option value="oily">Oily</option>
          <option value="combination">Combination</option>
          <option value="normal">Normal</option>
          <option value="sensitive">Sensitive</option>
        </select>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Register</button>
      </form>
    </div>
    </>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '400px',
    margin: '0 auto',
    backgroundColor: '#FEFCF3',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  heading: {
    color: '#DBA39A',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #DBA39A',
    borderRadius: '4px',
  },
  button: {
    backgroundColor: '#DBA39A',
    color: '#FFFFFF',
    border: 'none',
    padding: '10px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Register;
