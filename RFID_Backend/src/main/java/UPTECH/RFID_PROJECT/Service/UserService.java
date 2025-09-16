package UPTECH.RFID_PROJECT.Service;

import UPTECH.RFID_PROJECT.Entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User saveUser(User user);
    Optional<User> findByFullName(String fullName);
    Optional<User> getUserByEmail(String email);
    List<User> getAllUsers();
    void deleteUser(Long id);
    User updateUser(Long id, User updatedUser);
}
