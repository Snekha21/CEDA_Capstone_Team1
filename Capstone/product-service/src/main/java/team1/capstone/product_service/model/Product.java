package team1.capstone.product_service.model;
import jakarta.persistence.*;

@Entity
@Table(name = "cosmetic_products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "brand", nullable = false)
    private String brand;

    @Column(name = "category", nullable = false)
    private String category; // e.g., Skincare, Makeup, Haircare

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private double price;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "rating")
    private double rating;

    @Column(name = "suitable_for_skin_type")
    private String skinType; // Optional

    @Column(name = "gender_target")
    private String gender; // Optional: Unisex, Female, Male

    public Product() {
    }

    public Product(String title, String brand, String category, String description, double price, int quantity,
                           String imageUrl, double rating, String skinType, String gender) {
        this.title = title;
        this.brand = brand;
        this.category = category;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.imageUrl = imageUrl;
        this.rating = rating;
        this.skinType = skinType;
        this.gender = gender;
    }

    // Getters and Setters

    public long getId() { return id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }

    public String getSkinType() { return skinType; }
    public void setSkinType(String skinType) { this.skinType = skinType; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    @Override
    public String toString() {
        return "CosmeticProduct [id=" + id + ", title=" + title + ", brand=" + brand + ", category=" + category +
                ", price=" + price + ", quantity=" + quantity + ", rating=" + rating + "]";
    }
}
