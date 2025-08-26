package UPTECH.RFID_PROJECT.Repository;

import UPTECH.RFID_PROJECT.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByFullName(String fullName);
}

