package UPTECH.RFID_PROJECT.Entity;

import UPTECH.RFID_PROJECT.Entity.Tag;
import jakarta.persistence.*;

import java.util.Objects;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productID;

    private String productName;
    private String productCategory;
    private String productDescription;
    private Long productPrice;
    private String epc;
    @OneToOne
    @JoinColumn(name = "tag_id", referencedColumnName = "id")
    private Tag tag;


    public Product() {
    }

    public Product(Long productID, String productName, String productCategory, String productDescription, Long productPrice, String epc, Tag tag) {
        this.productID = productID;
        this.productName = productName;
        this.productCategory = productCategory;
        this.productDescription = productDescription;
        this.productPrice = productPrice;
        this.epc = epc;
        this.tag = tag;
    }

    public Tag getTag() {
        return tag;
    }

    public void setTag(Tag tag) {
        this.tag = tag;
    }

    public Long getProductID() {
        return productID;
    }

    public void setProductID(Long productID) {
        this.productID = productID;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductCategory() {
        return productCategory;
    }

    public void setProductCategory(String productCategory) {
        this.productCategory = productCategory;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public Long getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(Long productPrice) {
        this.productPrice = productPrice;
    }

    public String getEpc() {
        return epc;
    }

    public void setEpc(String epc) {
        this.epc = epc;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return Objects.equals(productID, product.productID) && Objects.equals(productName, product.productName) && Objects.equals(productCategory, product.productCategory) && Objects.equals(productDescription, product.productDescription) && Objects.equals(productPrice, product.productPrice) && Objects.equals(epc, product.epc) && Objects.equals(tag, product.tag);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productID, productName, productCategory, productDescription, productPrice, epc, tag);
    }

    @Override
    public String toString() {
        return "Product{" +
                "productID=" + productID +
                ", productName='" + productName + '\'' +
                ", productCategory='" + productCategory + '\'' +
                ", productDescription='" + productDescription + '\'' +
                ", productPrice=" + productPrice +
                ", epc='" + epc + '\'' +
                '}';
    }
}
