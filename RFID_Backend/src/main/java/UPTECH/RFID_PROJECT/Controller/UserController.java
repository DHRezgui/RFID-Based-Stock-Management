package UPTECH.RFID_PROJECT.Controller;

import UPTECH.RFID_PROJECT.DTO.AuthRequest;
import UPTECH.RFID_PROJECT.DTO.AuthResponse;
import UPTECH.RFID_PROJECT.Entity.User;
import UPTECH.RFID_PROJECT.Service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import UPTECH.RFID_PROJECT.Security.JwtUtil;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UserController(UserService userService, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userService.getUserByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Email already exists"));
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.saveUser(user);

        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        try {
            if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                updatedUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
            }
            User user = userService.updateUser(id, updatedUser);
            return ResponseEntity.ok(user);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        System.out.println("Login attempt with email: " + authRequest.getEmail());

        Optional<User> userOpt = userService.getUserByEmail(authRequest.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            System.out.println("User found, checking password...");
            if (passwordEncoder.matches(authRequest.getPassword(), user.getPassword())) {
                System.out.println("Password valid, generating token...");
                String token = jwtUtil.generateToken(user);
                return ResponseEntity.ok(new AuthResponse(token));
            } else {
                System.out.println("Password invalid");
            }
        } else {
            System.out.println("User not found");
        }

        return ResponseEntity.status(401).body(Map.of("message", "Invalid email or password"));
    }




}
