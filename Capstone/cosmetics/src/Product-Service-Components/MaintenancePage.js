import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MaintenancePage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🚧 Under Maintenance</h1>
      <p>Sorry, this part of the site is currently unavailable.</p>
      <button onClick={() => navigate('/')}>Go back to Home</button>
    </div>
  );
}