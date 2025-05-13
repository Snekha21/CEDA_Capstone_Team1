package team1.capstone.product_service.controller;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import team1.capstone.product_service.model.Product;
import team1.capstone.product_service.repository.ProductRepository;
import team1.capstone.product_service.service.ProducerService;

@RestController
@RequestMapping("/api/cosmetics")
public class ProductController {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    private ProducerService producer;

    // Add a new product
    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            String productJson = mapper.writeValueAsString(product);    
            producer.sendProductToTopic(productJson);
            ResponseEntity.ok("Product added and broadcasted.");
            Product saved = productRepository.save(product);
            return new ResponseEntity<>(saved, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get all products
    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAllProducts() {
        try {
            List<Product> products = productRepository.findAll();
            if (products.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get product by ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable long id) {
        Optional<Product> product = productRepository.findById(id);
        return product.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                      .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Search by title or brand
    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String brand) {
        try {
            List<Product> results = new ArrayList<>();

            if (title != null)
                results = productRepository.findByTitleContainingIgnoreCase(title);
            else if (brand != null)
                results = productRepository.findByBrandContainingIgnoreCase(brand);
            else
                results = productRepository.findAll();

            if (results.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            return new ResponseEntity<>(results, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Filter by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Product>> filterByCategory(@PathVariable String category) {
        try {
            List<Product> products = productRepository.findByCategoryIgnoreCase(category);
            if (products.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Update product
    @PutMapping("/update/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable long id, @RequestBody Product updatedProduct) {
        Optional<Product> productData = productRepository.findById(id);
        if (productData.isPresent()) {
            Product product = productData.get();
            product.setTitle(updatedProduct.getTitle());
            product.setBrand(updatedProduct.getBrand());
            product.setCategory(updatedProduct.getCategory());
            product.setDescription(updatedProduct.getDescription());
            product.setPrice(updatedProduct.getPrice());
            product.setQuantity(updatedProduct.getQuantity());
            product.setImageUrl(updatedProduct.getImageUrl());
            product.setRating(updatedProduct.getRating());
            product.setSkinType(updatedProduct.getSkinType());
            product.setGender(updatedProduct.getGender());

            return new ResponseEntity<>(productRepository.save(product), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete product by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteProduct(@PathVariable long id) {
        try {
            productRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Delete all products
    @DeleteMapping("/delete-all")
    public ResponseEntity<HttpStatus> deleteAllProducts() {
        try {
            productRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/filter")
    public ResponseEntity<List<Product>> filterByPriceOrRating(
        @RequestParam(required = false) Double minPrice,
        @RequestParam(required = false) Double maxPrice,
        @RequestParam(required = false) Double minRating,
        @RequestParam(required = false) Double maxRating) {
    
        try {
            List<Product> results = new ArrayList<>();

            // Case: Price filter
            if (minPrice != null && maxPrice != null) {
                results = productRepository.findByPriceBetween(minPrice, maxPrice);
            }

            // Case: Rating filter
            else if (minRating != null && maxRating != null) {
                results = productRepository.findByRatingBetween(minRating, maxRating);
            }

            // No filters
            else {
                results = productRepository.findAll();
            }

            if (results.isEmpty())
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            return new ResponseEntity<>(results, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
}
    @PatchMapping("/patch/{id}")
    public ResponseEntity<Product> patchProduct(@PathVariable long id, @RequestBody Map<String, Object> updates) {
        Optional<Product> productData = productRepository.findById(id);
        if (productData.isPresent()) {
            Product product = productData.get();

            updates.forEach((key, value) -> {
                switch (key) {
                    case "title": product.setTitle((String) value); break;
                    case "brand": product.setBrand((String) value); break;
                    case "category": product.setCategory((String) value); break;
                    case "description": product.setDescription((String) value); break;
                    case "price": product.setPrice(Double.valueOf(value.toString())); break;
                    case "quantity": product.setQuantity(Integer.valueOf(value.toString())); break;
                    case "imageUrl": product.setImageUrl((String) value); break;
                    case "rating": product.setRating(Double.valueOf(value.toString())); break;
                    case "skinType": product.setSkinType((String) value); break;
                    case "gender": product.setGender((String) value); break;
                    default: break;
                }
            });

            return new ResponseEntity<>(productRepository.save(product), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
}
}



