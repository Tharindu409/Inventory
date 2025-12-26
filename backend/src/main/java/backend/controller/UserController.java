package backend.controller;

import backend.exception.UserNotFoundException;
import backend.model.InventModel;
import backend.model.UserModel;
import backend.repository.InventRepository;
import backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/user")
    public UserModel newUserModel(@RequestBody UserModel newUserModel){
        return userRepository.save(newUserModel);

    }
    //user login
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody UserModel loginDetails) {
        // 1. Debug: See what React is sending
        System.out.println("DEBUG: Attempting login for Email: " + loginDetails.getEmail());
        System.out.println("DEBUG: Password received: " + loginDetails.getPassword());

        UserModel user = userRepository.findByEmail(loginDetails.getEmail())
                .orElseThrow(() -> new UserNotFoundException("Email not found: " + loginDetails.getEmail()));

        // 2. Debug: See what is actually in your Database
        System.out.println("DEBUG: User found in DB. Password in DB is: " + user.getPassword());

        // 3. Comparison Logic
        if (user.getPassword().equals(loginDetails.getPassword())) {
            System.out.println("DEBUG: Passwords match! Sending success response.");
            Map<String, Object> response = new HashMap<>();
            response.put("message", "login successfull");
            response.put("id", user.getId());
            return ResponseEntity.ok(response); // Return 1: Success
        } else {
            System.out.println("DEBUG: Passwords do NOT match.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "invalid credentials")); // Return 2: Failure
        }
    }
    //desplay
    @GetMapping("/user")
    List<UserModel> getAllUsers(){
        return userRepository.findAll();
    }
    @GetMapping("/user/{id}")
    UserModel getUserId(@PathVariable Long id){
        return userRepository.findById(id)
                .orElseThrow(()->new UserNotFoundException(id));


    }

   //update
   @PutMapping("/user/{id}")
   UserModel updateProfile(@RequestBody UserModel newUserModel, @PathVariable Long id){
        return userRepository.findById(id)
                .map(userModel -> {
                    if (newUserModel.getFullName()!=null) userModel.setFullName(newUserModel.getFullName());
                    if (newUserModel.getEmail()!=null) userModel.setEmail(newUserModel.getEmail());
                    if (newUserModel.getPassword()!=null) userModel.setPassword(newUserModel.getPassword());
                    if (newUserModel.getPhone()!=null) userModel.setPhone(newUserModel.getPhone());

                    return userRepository.save(userModel);
                }).orElseThrow(()->new UserNotFoundException(id));

   }

}
