import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

//Home Page Imports
import Home from './Product-Service-Components/Home';
import AdminHomePage from './Product-Service-Components/Admin_HomePage';
import CustomerHomePage from './Product-Service-Components/Customer_HomePage';

//Product Service Imports
import ProductList from './Product-Service-Components/ProductList';
import ProductDetails from './Product-Service-Components/ProductDetails';
import AddProduct from './Product-Service-Components/AddProduct';
import UpdateProduct from './Product-Service-Components/UpdateProduct';
import PatchProduct from './Product-Service-Components/PatchProduct';
import CategoryPage from './Product-Service-Components/CategoryPage';
import ProductList_Customer from './Product-Service-Components/ProductList_Customer';

// Customer Service Imports
import Register from './Customer-Service-Components/register';
import Profile from './Customer-Service-Components/profil';
import OrderHistory from './Customer-Service-Components/OrderHistory';

// Feedback Service Imports
import Dashboard from './Feedback-Service-Components/Dashboard'
import FeedbackForm from './Feedback-Service-Components/FeedbackForm';

//Login Imports
import CustomerSignup from './Login-Components/CustomerSignup';
import AdminSignup from './Login-Components/AdminSignup';
import CustomerLogin from './Login-Components/CustomerLogin';
import AdminLogin from './Login-Components/AdminLogin';
import Logout from './Login-Components/Logout';

//Recommendation Service Imports
import Recommend from './Recommendation-Service-Components/Recommend';

//Error Service Imports
import Error from './Product-Service-Components/Error';
import ErrorBoundary from './Product-Service-Components/ErrorBoundary';
import MaintenancePage from './Product-Service-Components/MaintenancePage';

const AdminRoute = ({ element }) => {
  const isAdminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
  return isAdminLoggedIn ? element : <Navigate to="/admin_login" />;
};

const CustomerRoute = ({ element }) => {
  const isCustomerLoggedIn = localStorage.getItem('customerLoggedIn') === 'true';
  return isCustomerLoggedIn ? element : <Navigate to="/customer_login" />;
};

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <ErrorBoundary>
        <Routes>
          <Route path="/products" element={<ProductList_Customer />} />
          <Route path="/admin_home" element={<AdminRoute element={<AdminHomePage />} />} />
          <Route path="/admin" element={<AdminRoute element={<ProductList />} />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/add" element={<AdminRoute element={<AddProduct />} />} />
          <Route path="/update/:id" element={<AdminRoute element={<UpdateProduct />} />} />
          <Route path="/patch/:id" element={<AdminRoute element={<PatchProduct />} />} />
          <Route path="/category/:categoryname" element={<CategoryPage />} />
          <Route path="/" element={<Home />} />
          <Route path="*" class="active" element={<Error />}></Route>

          {/* Customer Service Routes */}
          <Route path="/customer_home" element={<CustomerRoute element={<CustomerHomePage />} />} />
          <Route path="/customer_register" element={<CustomerRoute element={<Register />} />} />
          <Route path="/customer_profile" element={<CustomerRoute element={<Profile />} />} />
          <Route path="/customer_orders" element={<CustomerRoute element={<OrderHistory />} />} />

          {/* Feedback Service Routes */}
          <Route path="/dashboard" element={<AdminRoute element={<Dashboard />} />} />
          <Route path="/feedback" element={<CustomerRoute element={<FeedbackForm />} />} />

          {/* Recommendation Service Routes */}
          <Route path="/recommendation" element={<CustomerRoute element={<Recommend />} />}  />

          {/* Login Service Routes */}
          <Route path="/customer_signup" element={<CustomerSignup />} />
          <Route path="/customer_login" element={<CustomerLogin />} />
          <Route path="/admin_signup" element={<AdminSignup />} />
          <Route path="/admin_login" element={<AdminLogin />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/maintain' element={<MaintenancePage />} />

        </Routes>
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;


