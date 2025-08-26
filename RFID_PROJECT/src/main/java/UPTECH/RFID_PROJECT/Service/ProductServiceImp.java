package UPTECH.RFID_PROJECT.Service;

import UPTECH.RFID_PROJECT.DTO.ProductDTO;
import UPTECH.RFID_PROJECT.Entity.Product;
import UPTECH.RFID_PROJECT.Entity.Tag;
import UPTECH.RFID_PROJECT.Exception.ResourceNotFoundException;
import UPTECH.RFID_PROJECT.Repository.ProductRepository;
import UPTECH.RFID_PROJECT.Repository.TagRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductServiceImp implements ProductService {

    private final ProductRepository productRepository;
    private final TagRepository tagRepository;

    public ProductServiceImp(ProductRepository productRepository, TagRepository tagRepository) {
        this.productRepository = productRepository;
        this.tagRepository = tagRepository;
    }

    @Override
    public List<ProductDTO> getAll() {
        return productRepository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public Optional<ProductDTO> getById(Long id) {
        return productRepository.findById(id).map(this::mapToDTO);
    }

    @Override
    public ProductDTO save(ProductDTO dto) {
        if (dto.getTagId() != null) {
            Optional<Product> productWithTag = productRepository.findByTagId(dto.getTagId());
            if (productWithTag.isPresent()) {
                throw new IllegalStateException("Ce tag est déjà associé à un autre produit");
            }
        }
        Product product = mapToEntity(dto);
        Product saved = productRepository.save(product);
        return mapToDTO(saved);
    }


    @Override
    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }

    private ProductDTO mapToDTO(Product p) {
        return new ProductDTO(
                p.getProductID(),
                p.getProductName(),
                p.getProductCategory(),
                p.getProductDescription(),
                p.getProductPrice(),
                p.getEpc(),
                p.getTag() != null ? p.getTag().getId() : null
        );
    }

    private Product mapToEntity(ProductDTO dto) {
        Product p = new Product();
        p.setProductID(dto.getId());
        p.setProductName(dto.getProductName());
        p.setProductCategory(dto.getProductCategory());
        p.setProductDescription(dto.getProductDescription());
        p.setProductPrice(dto.getProductPrice());
        p.setEpc(dto.getEpc());

        if (dto.getTagId() != null) {
            Tag tag = tagRepository.findById(dto.getTagId()).orElse(null);
            p.setTag(tag);
        }

        return p;
    }

    @Override
    public ProductDTO associateTagToProduct(Long productId, Long tagId) {
        Optional<Product> productWithTag = productRepository.findByTagId(tagId);

        if (productWithTag.isPresent() && !productWithTag.get().getProductID().equals(productId)) {
            throw new IllegalStateException("Ce tag est déjà associé à un autre produit");
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Produit non trouvé"));
        Tag tag = tagRepository.findById(tagId)
                .orElseThrow(() -> new RuntimeException("Tag non trouvé"));

        product.setTag(tag);

        Product saved = productRepository.save(product);
        return mapToDTO(saved);
    }

    @Override
    public ProductDTO update(Long id, ProductDTO dto) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        if (dto.getTagId() != null) {
            Optional<Product> existingWithTag = productRepository.findByTagId(dto.getTagId());
            if (existingWithTag.isPresent() && !existingWithTag.get().getProductID().equals(id)) {
                throw new IllegalStateException("Tag is already assigned to another product");
            }

            Tag tag = tagRepository.findById(dto.getTagId())
                    .orElseThrow(() -> new ResourceNotFoundException("Tag not found with id: " + dto.getTagId()));
            existingProduct.setTag(tag);
        }

        existingProduct.setProductName(dto.getProductName());
        existingProduct.setProductCategory(dto.getProductCategory());
        existingProduct.setProductDescription(dto.getProductDescription());
        existingProduct.setProductPrice(dto.getProductPrice());
        existingProduct.setEpc(dto.getEpc());

        Product saved = productRepository.save(existingProduct);
        return mapToDTO(saved);
    }




}
