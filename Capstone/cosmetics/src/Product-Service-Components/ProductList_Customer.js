import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col, Spinner, Container, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/ProductList.css";

function ProductList_Customer() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All Products");
  const [activeBrand, setActiveBrand] = useState("All Brands");
  const [sortBy, setSortBy] = useState("Featured");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      // Extract unique categories and brands
      const uniqueCategories = [...new Set(products.map(p => p.category))];
      const uniqueBrands = [...new Set(products.map(p => p.brand))];
    
      setCategories(uniqueCategories);
      setBrands(uniqueBrands);
    
      // Apply initial filtering
      filterProducts(activeFilter, activeBrand, sortBy, searchQuery);
    }
  }, [products]);

  const fetchProducts = () => {
    axios.get("http://localhost:9000/api/cosmetics/all")
      .then(res => {
        setProducts(res.data);
        setFilteredProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const filterProducts = (category, brand, sort, query) => {
    let result = [...products];
  
    // Apply category filter
    if (category !== "All Products") {
      result = result.filter(product => product.category === category);
    }
  
    // Apply brand filter
    if (brand !== "All Brands") {
      result = result.filter(product => product.brand === brand);
    }
  
    // Apply search query
    if (query) {
      query = query.toLowerCase();
      result = result.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query)
      );
    }
  
    // Apply sorting
    switch(sort) {
      case "Price - Low to High":
        result.sort((a, b) => a.price - b.price);
        break;
      case "Price - High to Low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "Name - A to Z":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Name - Z to A":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "Rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // "Featured" - no sorting needed, use default order
        break;
    }
  
    setFilteredProducts(result);
  };

  const handleCategoryChange = (category) => {
    setActiveFilter(category);
    filterProducts(category, activeBrand, sortBy, searchQuery);
  };

  const handleBrandChange = (brand) => {
    setActiveBrand(brand);
    filterProducts(activeFilter, brand, sortBy, searchQuery);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    filterProducts(activeFilter, activeBrand, sort, searchQuery);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterProducts(activeFilter, activeBrand, sortBy, query);
  };

  const renderProducts = () => {
    if (filteredProducts.length === 0) {
      return (
        <div className="no-products-found">
          <div className="empty-state-icon">✧</div>
          <h3>No products found</h3>
          <p>Try adjusting your filters or search query</p>
        </div>
      );
    }

    return (
      <Row className="product-grid">
        {filteredProducts.map(product => (
          <Col sm={12} md={6} lg={4} xl={3} key={product.id} className="product-col">
            <div className="product-card">
              <div className="product-card-inner">
                <div className="product-image-container" onClick={() => navigate(`/product/${product.id}`)}>
                  <img src={product.imageUrl} alt={product.title} className="product-image" />
                  <div className="product-overlay">
                    <div className="quick-view-btn">Quick View</div>
                  </div>
                </div>
              
                <div className="product-info">
                  <div className="product-brand">{product.brand}</div>
                  <h3 className="product-name" onClick={() => navigate(`/product/${product.id}`)}>{product.title}</h3>
                  <div className="product-category">{product.category}</div>
                
                    <div className="product-rating">
                      {Array(5).fill().map((_, i) => (
                        <span key={i} className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}>
                          {i < Math.floor(product.rating) ? '★' : '☆'}
                        </span>
                      ))}
                    </div>
                
                  <div className="product-actions">
                    <button className="view-btn" onClick={() => navigate(`/product/${product.id}`)}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <div className="product-list-page">
      <div className="hero-section">
        <Container>
          <h1 className="hero-title">Luxury Cosmetics Collection</h1>
          <p className="hero-subtitle">Discover premium beauty products for your perfect look</p>
          <marquee>Glow like never before - Sale 50% Off on selected products for limited time only! Grab yours now!!</marquee>
        </Container>
      </div>
    
      <Container className="main-content">
        <div className="filters-section">
          <div className="search-bar-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <span className="search-icon">🔍</span>
          </div>
        
          <div className="filter-options">
            <div className="filter-item">
              <Dropdown>
                <Dropdown.Toggle variant="light" id="category-dropdown" className="filter-dropdown">
                  {activeFilter}
                </Dropdown.Toggle>
                <Dropdown.Menu className="filter-dropdown-menu">
                  <Dropdown.Item
                    onClick={() => handleCategoryChange("All Products")}
                    active={activeFilter === "All Products"}
                  >
                    All Products
                  </Dropdown.Item>
                  {categories.map(category => (
                    <Dropdown.Item
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      active={activeFilter === category}
                    >
                      {category}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          
            <div className="filter-item">
              <Dropdown>
                <Dropdown.Toggle variant="light" id="brand-dropdown" className="filter-dropdown">
                  {activeBrand}
                </Dropdown.Toggle>
                <Dropdown.Menu className="filter-dropdown-menu">
                  <Dropdown.Item
                    onClick={() => handleBrandChange("All Brands")}
                    active={activeBrand === "All Brands"}
                  >
                    All Brands
                  </Dropdown.Item>
                  {brands.map(brand => (
                    <Dropdown.Item
                      key={brand}
                      onClick={() => handleBrandChange(brand)}
                      active={activeBrand === brand}
                    >
                      {brand}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          
            <div className="filter-item">
              <Dropdown>
                <Dropdown.Toggle variant="light" id="sort-dropdown" className="filter-dropdown">
                  Sort: {sortBy}
                </Dropdown.Toggle>
                <Dropdown.Menu className="filter-dropdown-menu">
                  {["Featured", "Price - Low to High", "Price - High to Low", "Name - A to Z", "Name - Z to A", "Rating"].map(option => (
                    <Dropdown.Item
                      key={option}
                      onClick={() => handleSortChange(option)}
                      active={sortBy === option}
                    >
                      {option}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      
        <div className="product-results">
          <div className="results-header">
            <h2 className="section-title">{activeFilter}</h2>
            <span className="results-count">{filteredProducts.length} products</span>
          </div>
        
          {loading ? (
            <div className="loading-container">
              <Spinner animation="border" className="custom-spinner" />
              <p>Loading beautiful products...</p>
            </div>
          ) : (
            renderProducts()
          )}
        </div>
   
      </Container>
    </div>
  );
}

export default ProductList_Customer;