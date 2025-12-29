package backend.controller;

import backend.model.ContactMessage;
import backend.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:3000") // Connects to your React App
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    // 1. SUBMIT MESSAGE (Used by Users on Contact Page)
    @PostMapping("/submit")
    public ResponseEntity<String> submitMessage(@RequestBody ContactMessage message) {
        try {
            contactRepository.save(message);
            return ResponseEntity.ok("Message sent successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error sending message: " + e.getMessage());
        }
    }

    // 2. GET ALL MESSAGES (Used by Admin Dashboard)
    @GetMapping("/all")
    public List<ContactMessage> getAllMessages() {
        return contactRepository.findAll();
    }

    // 3. MARK AS READ
    @PutMapping("/read/{id}")
    public ResponseEntity<String> markAsRead(@PathVariable Long id) {
        return contactRepository.findById(id).map(msg -> {
            msg.setRead(true); // <--- Use the setter method here
            contactRepository.save(msg);
            return ResponseEntity.ok("Message marked as read");
        }).orElse(ResponseEntity.notFound().build());
    }

    // 4. DELETE MESSAGE (Used by Admin to clean up)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMessage(@PathVariable Long id) {
        if (contactRepository.existsById(id)) {
            contactRepository.deleteById(id);
            return ResponseEntity.ok("Message deleted");
        }
        return ResponseEntity.notFound().build();
    }
}