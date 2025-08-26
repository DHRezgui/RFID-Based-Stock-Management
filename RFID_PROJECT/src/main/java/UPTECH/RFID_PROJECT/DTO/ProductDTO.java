package UPTECH.RFID_PROJECT.DTO;


import java.util.Objects;

public class ProductDTO {
    private Long id;
    private String productName;
    private String productCategory;
    private String productDescription;
    private Long productPrice;
    private String epc;
    private Long tagId;

    public ProductDTO(Long id,String productName, String productCategory, String productDescription, Long productPrice, String epc, Long tagId) {
        this.id = id;
        this.productName = productName;
        this.productCategory = productCategory;
        this.productDescription = productDescription;
        this.productPrice = productPrice;
        this.epc = epc;
        this.tagId = tagId;

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Long getTagId() {
        return tagId;
    }

    public void setTagId(Long tagId) {
        this.tagId = tagId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductDTO that = (ProductDTO) o;
        return Objects.equals(productName, that.productName) && Objects.equals(productCategory, that.productCategory) && Objects.equals(productDescription, that.productDescription) && Objects.equals(productPrice, that.productPrice) && Objects.equals(epc, that.epc);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productName, productCategory, productDescription, productPrice, epc);
    }

    @Override
    public String toString() {
        return "ProductDTO{" +
                "productName='" + productName + '\'' +
                ", productCategory='" + productCategory + '\'' +
                ", productDescription='" + productDescription + '\'' +
                ", productPrice=" + productPrice +
                ", epc='" + epc + '\'' +
                '}';
    }
}


