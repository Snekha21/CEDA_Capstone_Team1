package team1.capstone.product_service.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import team1.capstone.product_service.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByTitleContainingIgnoreCase(String title);
    List<Product> findByBrandContainingIgnoreCase(String brand);
    List<Product> findByCategoryIgnoreCase(String category);
    List<Product> findByPriceBetween(Double minPrice, Double maxPrice);
    List<Product> findByRatingBetween(Double minRating, Double maxRating);
}