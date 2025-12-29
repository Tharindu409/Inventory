package backend.controller;

import backend.model.UserModel;
import backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage; // Import this
import org.springframework.mail.javamail.JavaMailSender; // Import this
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender; // 1. Inject the mail sender

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        UserModel user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        String token = UUID.randomUUID().toString();
        user.setResetToken(token);
        user.setTokenExpiry(LocalDateTime.now().plusMinutes(15));
        userRepository.save(user);

        // 2. Define the reset link
        String resetLink = "http://localhost:3000/reset-password?token=" + token;

        // 3. Send the real email
        try {
            sendEmail(email, resetLink);
            return ResponseEntity.ok("Reset link sent to your real email!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to send email. Check your SMTP settings.");
        }
    }

    // Helper method to send the email
    private void sendEmail(String to, String link) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Password Reset Request");
        message.setText("Hello,\n\nYou requested to reset your password. "
                + "Please click the link below to set a new password:\n\n"
                + link + "\n\nThis link will expire in 15 minutes.");

        mailSender.send(message);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        UserModel user = userRepository.findByResetToken(token).orElse(null);

        if (user == null || user.getTokenExpiry() == null || user.getTokenExpiry().isBefore(LocalDateTime.now())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or expired token");
        }

        user.setPassword(newPassword);
        user.setResetToken(null);
        user.setTokenExpiry(null);
        userRepository.save(user);

        return ResponseEntity.ok("Password updated successfully");
    }
}