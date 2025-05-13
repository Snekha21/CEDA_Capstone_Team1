import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Spinner, Alert } from 'react-bootstrap';
import '../styles/ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("Product Details");
  const customerId = "681b468a113a5320ab4aed37"
 
  useEffect(() => {
    window.scrollTo(0, 0);
    axios.get("http://localhost:9000/api/cosmetics/"+id)
      .then((response) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch product. " + err.message);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    axios.get("http://localhost:9000/api/cosmetics/all")
      .then((response) => {
        const allProducts = response.data;
        const filtered = allProducts.filter(
          (p) => p.category === product?.category && p.id !== product.id
        );
        setSimilarProducts(filtered.slice(0, 4)); 
      })
      .catch((err) => {
        console.error("Failed to fetch similar products:", err);
      });
  }, [product]);
  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  
    const handleGetReviews=() => {
      var productId = id; 
  
      axios.get("http://localhost:5000/feedback/product/"+ productId)
        .then(function (response) {
          setReviews(response.data); 
          console.log(reviews);
        })
        .catch(function (error) {
         console.log('API Error'+error)
        });

        
    }

  const renderStars = (rating) => {
    return (
      <div className="rating-container">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= Math.floor(rating) ? 'filled' : ''}`}
          >
            {star <= Math.floor(rating) ? '★' : '☆'}
          </span>
        ))}
        <span className="rating-number">{rating.toFixed(1)}</span>
      </div>
    );
  };
  const OrderProduct = ({  customerId }) => {
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
  
    useEffect(() => {
      // Fetch product info from Product Service
      axios.get("http://localhost:9000/api/cosmetics/"+id)
        .then(res => setProduct(res.data))
        .catch(err => console.error("Failed to fetch product", err));
    }, []);}
  
    const handleOrder = async () => {
      if (!product) return;
  
      const orderPayload = {
        product: product.title,
        price: product.price,
        quantity: quantity
      };
  
      try {
        console.log(orderPayload);
        const response = await axios.post(
          "http://localhost:5001/api/customers/"+customerId+'/orders',
          orderPayload
        );
        alert("Order placed!");
      } catch (error) {
        console.error("Failed to place order", error);
      }
    };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  if (loading) return (
    <div className="loading-container">
      <Spinner animation="border" className="custom-spinner" />
      <p>Loading luxurious beauty...</p>
    </div>
  );

  if (error) return <Alert variant="danger" className="error-alert">{error}</Alert>;
 
  if (!product) return <Alert variant="warning" className="error-alert">Product not found.</Alert>;

  // Mock multiple images 
  const productImages = [
    product.imageUrl,
    product.imageUrl, 
    product.imageUrl
  ];

  const truncatedDescription = product.description.substring(0, 150);
  const shouldTruncate = product.description.length > 150;

  return (
    <Container fluid className="product-detail-page">
      <div className="breadcrumb-nav">
        <Link to="/products" className="breadcrumb-link">Home</Link> /
        <Link to={`/category/${product.category}`} className="breadcrumb-link">{product.category}</Link> /
        <span className="current-page">{product.title}</span>
      </div>
     
      <div className="product-detail-container">
        <div className="product-gallery">
          <div className="main-image-container">
            <img
              src={productImages[activeImage]}
              alt={product.title}
              className="main-product-image"
            />
          </div>
          <div className="thumbnail-row">
            {productImages.map((img, index) => (
              <div
                key={index}
                className={`thumbnail-container ${activeImage === index ? 'active-thumbnail' : ''}`}
                onClick={() => setActiveImage(index)}
              >
                <img src={img} alt={`${product.title} view ${index + 1}`} className="thumbnail-image" />
              </div>
            ))}
          </div>
        </div>
       
        <div className="product-info">
          <div className="product-header">
            <h5 className="product-brand">{product.brand}</h5>
            <h1 className="product-title">{product.title}</h1>
            <div className="product-price-rating">
              <div className="price">₹{product.price}</div>
              {renderStars(product.rating)}
            </div>
          </div>
         
          <div className="product-badges">
            {product.vegan && <span className="badge vegan-badge">Vegan</span>}
            {product.crueltyFree && <span className="badge cruelty-free-badge">Cruelty Free</span>}
            {product.organic && <span className="badge organic-badge">Organic</span>}
          </div>
         
          <div className="product-details">
            <div className="detail-item">
              <span className="detail-label">Category:</span>
              <span className="detail-value">{product.category}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Skin Type:</span>
              <span className="detail-value">{product.skinType}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Gender:</span>
              <span className="detail-value">{product.gender}</span>
            </div>
          </div>
         
          <div className="product-description">
            <h3>Description</h3>
            <p>
              {showFullDescription ? product.description : truncatedDescription}
              {shouldTruncate && !showFullDescription && '...'}
            </p>
            {shouldTruncate && (
              <button
                className="read-more-btn"
                onClick={toggleDescription}
              >
                {showFullDescription ? 'Show Less' : 'Read More'}
              </button>
            )}
          </div>
         
          <div className="purchase-section">
            <div className="quantity-selector">
              <button
                className="quantity-btn"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                −
              </button>
              <span className="quantity-display">{quantity}</span>
              <button
                className="quantity-btn"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
           
            <div className="action-buttons">
              <button onClick={handleOrder} className="add-to-cart-btn">
                Order · ₹{(quantity * product.price).toFixed(2)}
              </button>
              <button className="wishlist-btn">♡</button>
            </div>
          </div>
         
          <div className="product-features">
            <div className="feature">
              <div className="feature-icon">✓</div>
              <div className="feature-text">
                <strong>Free Shipping</strong>
                <span>On orders above ₹499</span>
              </div>
            </div>
            <div className="feature">
              <div className="feature-icon">✓</div>
              <div className="feature-text">
                <strong>Easy Returns</strong>
                <span>30-day return policy</span>
              </div>
            </div>
            <div className="feature">
              <div className="feature-icon">✓</div>
              <div className="feature-text">
                <strong>Secure Payment</strong>
                <span>100% protected</span>
              </div>
            </div>
          </div>
         
          <div className="back-link-container">
            <Link to="/" className="back-to-products">
              ← Back to All Products
            </Link>
          </div>
        </div>
      </div>
     
      <div className="product-tabs">
        
        {/* <div className="tab-container">
          <button className="tab-button active">Product Details</button>
          <button className="tab-button">Ingredients</button>
          <button className="tab-button">How to Use</button>
          <button onClick={handleGetReviews} className="tab-button">Reviews ({reviews.length})</button>
        </div>
        <div className="tab-content">
          <h3>About {product.title}</h3>
          <p>{product.description}</p>
        </div>
      </div>
      {showReviews $$}  */}
      <div className="tab-container">

  <button
    className={`tab-button ${activeTab === "Product Details" ? "active" : ""}`}
    onClick={() => setActiveTab("Product Details")}
  >
    Product Details
  </button>

  <button
    className={`tab-button ${activeTab === "Ingredients" ? "active" : ""}`}
    onClick={() => setActiveTab("Ingredients")}
  >
    Ingredients
  </button>

  <button
    className={`tab-button ${activeTab === "How to Use" ? "active" : ""}`}
    onClick={() => setActiveTab("How to Use")}
  >
    How to Use
  </button>

  <button
    className={`tab-button ${activeTab === "Reviews" ? "active" : ""}`}
    onClick={() => {
      setActiveTab("Reviews");
      handleGetReviews();
    }}
  >
    Reviews 
  </button>
</div>
<div className="tab-content">
  {activeTab === "Product Details" && (
    <>
      <h3>About {product.title}</h3>
      <p>{product.description}</p>
    </>
  )}

  {activeTab === "Ingredients" && (
    <p>Goodness and Enchriched with Care</p>
  )}

  {activeTab === "How to Use" && (
    <p>Use the product twice a day </p>
  )}

  {activeTab === "Reviews" && (
    <div className="reviews-section">
      <h3>Customer Reviews</h3>

      {reviews  ? (
        reviews.map((review, index) => (
          <div key={index} className="review-card">
            <p><strong>{review.user_id || "Anonymous"}</strong></p>
            <p>{review.review}</p>
            <p>Rating: {review.rating} / 5</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  )}
</div>
</div>
     
      <div className="recommended-products">
        <h3 className="section-title">You Might Also Like</h3>
        <div className="product-recommendation-row">
        {similarProducts.map((similarProduct) => (
  <div key={similarProduct.id} className="recommended-product-card">
    <Link to={`/product/${similarProduct.id}`} className="recommended-img-container">
      <img src={similarProduct.imageUrl} alt={similarProduct.title} />
    </Link>
    <div className="recommended-product-info">
      <h5>{similarProduct.title}</h5>
      <p>₹{similarProduct.price.toFixed(2)}</p>
    </div>
  </div>

          ))}
        </div>
      </div>
    </Container>
  );
}

export default ProductDetails;
