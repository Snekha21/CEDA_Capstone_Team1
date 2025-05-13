import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

const AddProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: '',
    brand: '',
    category: '',
    description: '',
    price: '',
    quantity: '',
    imageUrl: '',
    rating: '',
    skinType: '',
    gender: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:9000/api/cosmetics/add", product).catch(error =>{console.log('API Error '+error );
        navigate('/maintain');
       });
      alert("Product added successfully!");
      navigate("/admin");
    } catch (error) {
      alert("Failed to add product: " + error.message);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-lg">
        <h2 className="mb-4 text-center">Add New Product</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control name="title" value={product.title} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Brand</Form.Label>
                <Form.Control name="brand" value={product.brand} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control name="category" value={product.category} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Skin Type</Form.Label>
                <Form.Control name="skinType" value={product.skinType} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Control name="gender" value={product.gender} onChange={handleChange} />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control name="price" type="number" value={product.price} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control name="quantity" type="number" value={product.quantity} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control name="imageUrl" value={product.imageUrl} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Rating</Form.Label>
                <Form.Control name="rating" type="number" step="0.1" max="5" value={product.rating} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" name="description" rows={3} value={product.description} onChange={handleChange} />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="dark" type="submit" className="w-100 mt-3">
            Add Product
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AddProduct;
