package com.example.fitconnect.fitconnect.controller;

import com.example.fitconnect.fitconnect.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> registerUser(@RequestBody Map<String, String> payload) {
        try {
            String email = payload.get("email");
            String password = payload.get("password");
            String userType = "customer";
            if (email == null || password == null ) {
                throw new IllegalArgumentException("Email and password are required");
            }
            if (userService.emailExists(email)) {
                return ResponseEntity.badRequest().body(Map.of("message", "Email already exists"));
            }
            String hashedPassword = hashPassword(password);
            Map<String, Object> result = userService.registerUser(email, hashedPassword, userType);
            return ResponseEntity.ok(Map.of("message", "Registration successful", "data", result));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity.internalServerError().body(Map.of("message", "Registration failed", "error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("message", "An unexpected error occurred", "error", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody Map<String, String> payload) {
        try {
            String email = payload.get("email");
            String password = payload.get("password");
            if (email == null || password == null) {
                throw new IllegalArgumentException("Email and password are required");
            }
            String hashedPassword = hashPassword(password);
            Map<String, Object> result = userService.loginUser(email, hashedPassword);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("message", "Login failed", "error", e.getMessage()));
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteUser(@PathVariable String id) {
        try {
            if (id == null || id.isEmpty()) {
                throw new IllegalArgumentException("Email is required");
            }
            userService.deleteUser(id);
            return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        } catch (RuntimeException e) {
            return ResponseEntity.internalServerError().body(Map.of("message", "Failed to delete user", "error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("message", "An unexpected error occurred", "error", e.getMessage()));
        }
    }

    @PostMapping("/update-password")
    public ResponseEntity<Map<String, Object>> updatePassword(@RequestBody Map<String, String> payload) {
        try {
            String email = payload.get("email");
            String currentPassword = payload.get("currentPassword");
            String newPassword = payload.get("newPassword");
            if (email == null || currentPassword == null || newPassword == null) {
                throw new IllegalArgumentException("Email, current password, and new password are required");
            }
            String hashedCurrentPassword = hashPassword(currentPassword);
            Map<String, Object> result = userService.updatePassword(email, hashedCurrentPassword, newPassword);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("message", "Failed to update password", "error", e.getMessage()));
        }
    }

    @PostMapping("/request-password-reset")
    public ResponseEntity<Map<String, Object>> requestPasswordReset(@RequestBody Map<String, String> payload) {
        try {
            String email = payload.get("email");
            if (email == null) {
                throw new IllegalArgumentException("Email is required");
            }
            userService.requestPasswordReset(email);
            return ResponseEntity.ok(Map.of("message", "Password reset request sent successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("message", "Failed to request password reset", "error", e.getMessage()));
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, Object>> resetPassword(@RequestBody Map<String, String> payload) {
        try {
            String email = payload.get("email");
            String verificationCode = payload.get("verificationCode");
            String newPassword = payload.get("newPassword");
            if (email == null || verificationCode == null || newPassword == null) {
                throw new IllegalArgumentException("Email, verification code, and new password are required");
            }
            String hashedCurrentPassword = hashPassword(newPassword);
            Map<String, Object> result = userService.resetPassword(email, verificationCode, hashedCurrentPassword);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("message", "Failed to reset password", "error", e.getMessage()));
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<Map<String, Object>> verifyUser(@RequestBody Map<String, String> payload) {
        try {
            String email = payload.get("email");
            String verificationCode = payload.get("verificationCode");
            if (email == null || verificationCode == null) {
                throw new IllegalArgumentException("Email and verification code are required");
            }
            Map<String, Object> result = userService.verifyUser(email, verificationCode);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("message", "Failed to verify user", "error", e.getMessage()));
        }
    }

    @PostMapping("/update-user")
    public ResponseEntity<Map<String, Object>> updateUser(@RequestBody Map<String, String> payload) {
        try {
            String id = payload.get("id");
            String userType = payload.get("userType");
            String status = payload.get("status");
            if (id == null || userType == null || status == null) {
                throw new IllegalArgumentException("Id, user type, and status are required");
            }
            Map<String, Object> result = userService.updateUser(id, userType, status);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("message", "Failed to update user", "error", e.getMessage()));
        }
    }

    private String hashPassword(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = md.digest(password.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder();
            for (byte b : hashBytes) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Failed to hash password", e);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<Map<String, Object>> getAllUsers() {
        try {
            Map<String, Object> result = userService.getAllUsers();
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("message", "Failed to retrieve users", "error", e.getMessage()));
        }
    }
}