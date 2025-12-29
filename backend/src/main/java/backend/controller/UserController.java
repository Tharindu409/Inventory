package backend.controller;

import backend.exception.UserNotFoundException;
import backend.model.UserModel;
import backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // REGISTER NEW USER
    @PostMapping("/user")
    public ResponseEntity<?> newUserModel(@RequestBody UserModel newUserModel) {
        try {
            if(userRepository.findByEmail(newUserModel.getEmail()).isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(Map.of("message", "Email already registered"));
            }
            // In a real project, you would encrypt the password here
            UserModel savedUser = userRepository.save(newUserModel);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Database error: " + e.getMessage()));
        }
    }

    // SIMPLE LOGIN (No JWT)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserModel loginDetails) {
        return userRepository.findByEmail(loginDetails.getEmail())
                .map(user -> {
                    // Plain text comparison (matches your current setup)
                    if (user.getPassword().equals(loginDetails.getPassword())) {

                        Map<String, Object> response = new HashMap<>();
                        response.put("message", "Login successful");
                        // We return the user object or roles directly without a token
                        response.put("id", user.getId());
                        response.put("role", user.getRole());
                        response.put("fullName", user.getFullName());
                        response.put("email", user.getEmail());

                        return ResponseEntity.ok(response);
                    }
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                            .body(Map.of("message", "Invalid credentials"));
                }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("message", "User not found")));
    }

    // GET ALL USERS
    @GetMapping("/user")
    public List<UserModel> getAllUsers(){
        return userRepository.findAll();
    }

    // GET USER BY ID
    @GetMapping("/user/{id}")
    public UserModel getUserId(@PathVariable Long id){
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    // UPDATE USER
    @PutMapping("/user/{id}")
    public ResponseEntity<?> updateProfile(@RequestBody UserModel newUserModel, @PathVariable Long id){
        return userRepository.findById(id)
                .map(userModel -> {
                    if (newUserModel.getFullName() != null) userModel.setFullName(newUserModel.getFullName());
                    if (newUserModel.getEmail() != null) userModel.setEmail(newUserModel.getEmail());
                    if (newUserModel.getPassword() != null) userModel.setPassword(newUserModel.getPassword());
                    if (newUserModel.getPhone() != null) userModel.setPhone(newUserModel.getPhone());
                    userRepository.save(userModel);
                    return ResponseEntity.ok(Map.of("message", "Profile updated successfully"));
                }).orElseThrow(() -> new UserNotFoundException(id));
    }

    // DELETE USER
    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> deleteProfile(@PathVariable long id){
        if(!userRepository.existsById(id)) throw new UserNotFoundException(id);
        userRepository.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
    }
}