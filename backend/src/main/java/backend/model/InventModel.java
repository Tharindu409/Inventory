package backend.model;



import jakarta.persistence.*;

@Entity
public class InventModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String itemId;
    private String itemImage;
    private String itemName;
    private String itemCategory;
    private String itemQty;
    private String itemDetails;
    private Double itemPrice;
    private Integer minStockLimit;
    private String location;

    public Double getItemPrice() {
        return itemPrice;
    }

    public void setItemPrice(Double itemPrice) {
        this.itemPrice = itemPrice;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }



    public Integer getMinStockLimit() {
        return minStockLimit;
    }

    public void setMinStockLimit(Integer minStockLimit) {
        this.minStockLimit = minStockLimit;
    }



    public InventModel() {}

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getItemId() { return itemId; }
    public void setItemId(String itemId) { this.itemId = itemId; }

    public String getItemImage() { return itemImage; }
    public void setItemImage(String itemImage) { this.itemImage = itemImage; }

    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }

    public String getItemCategory() { return itemCategory; }
    public void setItemCategory(String itemCategory) { this.itemCategory = itemCategory; }

    public String getItemQty() { return itemQty; }
    public void setItemQty(String itemQty) { this.itemQty = itemQty; }

    public String getItemDetails() {
        return itemDetails;
    }

    public void setItemDetails(String itemDetails) {
        this.itemDetails = itemDetails;
    }
}

