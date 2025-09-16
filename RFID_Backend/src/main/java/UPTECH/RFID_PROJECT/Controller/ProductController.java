package UPTECH.RFID_PROJECT.Controller;

import UPTECH.RFID_PROJECT.DTO.ProductDTO;
import UPTECH.RFID_PROJECT.Exception.ResourceNotFoundException;
import UPTECH.RFID_PROJECT.Service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<ProductDTO> getAll() {
        return productService.getAll();
    }

    @GetMapping("/{id}")
    public ProductDTO getById(@PathVariable Long id) {
        return productService.getById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody ProductDTO dto) {
        try {
            ProductDTO saved = productService.save(dto);
            return ResponseEntity.ok(saved);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        productService.deleteById(id);
    }

    @PutMapping("/{productId}/tag/{tagId}")
    public ResponseEntity<?> associateTag(@PathVariable Long productId, @PathVariable Long tagId) {
        try {
            ProductDTO updated = productService.associateTagToProduct(productId, tagId);
            return ResponseEntity.ok(updated);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody ProductDTO dto) {
        try {
            ProductDTO updated = productService.update(id, dto);
            return ResponseEntity.ok(updated);
        } catch (IllegalStateException | ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }




}
