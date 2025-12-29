package backend.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Better for MySQL
    private Long id;
    private String fullName;
    private String email;
    @Column(length = 255)
    private String password;
    private String phone;
    private String role;
    private String resetToken;
    private LocalDateTime tokenExpiry;


    public String getResetToken() {
        return resetToken;
    }

    public void setResetToken(String resetToken) {
        this.resetToken = resetToken;
    }

    public LocalDateTime getTokenExpiry() {
        return tokenExpiry;
    }

    public void setTokenExpiry(LocalDateTime tokenExpiry) {
        this.tokenExpiry = tokenExpiry;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    // ============================================================
    // 1. MANDATORY DEFAULT CONSTRUCTOR (Required by Hibernate/JPA)
    // ============================================================
    public UserModel() {
    }

    // 2. YOUR EXISTING CONSTRUCTOR
    public UserModel(Long id, String fullName, String email, String password, String phone) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.phone = phone;
    }

    // GETTERS AND SETTERS
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}