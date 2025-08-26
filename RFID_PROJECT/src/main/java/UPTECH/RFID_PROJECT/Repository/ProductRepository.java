package UPTECH.RFID_PROJECT.Repository;

import UPTECH.RFID_PROJECT.Entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findByTagId(Long tagId);
}
