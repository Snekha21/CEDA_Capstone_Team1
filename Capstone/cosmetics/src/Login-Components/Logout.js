import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('customerLoggedIn');
    navigate('/');
  }, [navigate]);

  return null; // No UI needed
};

export default Logout;