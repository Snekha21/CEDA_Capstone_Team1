import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Form,
  Button,
  Alert,
  Container,
  Row,
  Col,
  Card,
} from 'react-bootstrap';
import { motion } from 'framer-motion';

const PatchProduct = () => {
  const { id } = useParams();
  const [fields, setFields] = useState({});
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    try {
      await axios.patch("http://localhost:9000/api/cosmetics/update/"+id, fields);
      setSuccess('✨ Product updated successfully!');
    } catch (err) {
      setError(`❌ Failed to update product. ${err.response?.data?.message || err.message}`);
    }
  };

  const renderInput = (label, name, type = 'text') => (
    <Form.Group className="mb-3" controlId={`form-${name}`}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        name={name}
        type={type}
        placeholder="Required"
        onChange={handleChange}
        required
      />
    </Form.Group>
  );

  return (
    <Container className="my-5">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="p-4 shadow-lg rounded-4 border-0">
          <h2 className="text-center text-primary mb-4">Update Product</h2>
          <p className="text-muted text-center mb-4">
            Update the product you want to modify.
          </p>

          {success && <Alert variant="success">{success}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>{renderInput('Title', 'title')}</Col>
              <Col md={6}>{renderInput('Brand', 'brand')}</Col>
              <Col md={6}>{renderInput('Price', 'price', 'number')}</Col>
              <Col md={6}>{renderInput('Quantity', 'quantity', 'number')}</Col>
              <Col md={6}>{renderInput('Category', 'category')}</Col>
              <Col md={6}>{renderInput('Rating', 'rating', 'number')}</Col>
              <Col md={6}>{renderInput('Skin Type', 'skinType')}</Col>
              <Col md={6}>{renderInput('Gender', 'gender')}</Col>
              <Col md={12}>{renderInput('Image URL', 'imageUrl')}</Col>
              <Col md={12}>{renderInput('Description', 'description')}</Col>
            </Row>

            <div className="d-grid mt-3">
              <Button variant="dark" size="lg" type="submit" className="rounded-3 shadow-sm">
                Update Product
              </Button>
            </div>
          </Form>
        </Card>
      </motion.div>
    </Container>
  );
};

export default PatchProduct;