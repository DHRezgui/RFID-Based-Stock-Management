package UPTECH.RFID_PROJECT.Service;

import UPTECH.RFID_PROJECT.DTO.ProductDTO;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    List<ProductDTO> getAll();
    Optional<ProductDTO> getById(Long id);
    ProductDTO save(ProductDTO dto);
    void deleteById(Long id);
    ProductDTO associateTagToProduct(Long productId, Long tagId);
    ProductDTO update(Long id, ProductDTO dto);
}
