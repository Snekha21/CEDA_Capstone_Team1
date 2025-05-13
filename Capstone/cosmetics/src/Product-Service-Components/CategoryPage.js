import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Spinner, Alert, Card, Button } from 'react-bootstrap';
import '../styles/CategoryPage.css';
import { useNavigate } from 'react-router-dom';

function CategoryPage() {
  const { categoryname } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:9000/api/cosmetics/all")
      .then((res) => {
        const filtered = res.data.filter(p =>
          p.category.toLowerCase() === categoryname.toLowerCase()
        );
        setProducts(filtered);
        setLoading(false);
      })
      .catch(error =>{console.log('API Error '+error );
        navigate('/maintain');
       });
  }, [categoryname]);

  if (loading) return (
    <div className="loading-container">
      <Spinner animation="border" />
      <p>Loading {categoryname} products...</p>
    </div>
  );

  if (error) return <Alert variant="danger">{error}</Alert>;

  if (products.length === 0) {
    return (
      <Container className="no-products-container">
        <h3>No products found in "{categoryname}"</h3>
        <Link to="/customer_home">← Back to Home</Link>
      </Container>
    );
  }

  return (
    <Container className="category-page">
      <h2 className="category-heading">Showing results for: <span>{categoryname}</span></h2>
      <Row>
        {products.map(product => (
          <Col key={product._id} sm={6} md={4} lg={3} className="mb-4">
            <Card className="product-card">
              <Card.Img variant="top" src={product.imageUrl} alt={product.title} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>₹{product.price}</Card.Text>
                <Link to={`/product/${product.id}`}>
                  <Button variant="primary" size="sm">View Details</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Link to={"/products"}>
                  <Button variant="primary" size="sm">Home</Button>
                </Link>
    </Container>
    
  );
}

export default CategoryPage;