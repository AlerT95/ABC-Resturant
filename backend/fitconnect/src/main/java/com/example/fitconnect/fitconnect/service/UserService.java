package com.example.fitconnect.fitconnect.service;

import com.example.fitconnect.fitconnect.dto.UserDTO;
import com.example.fitconnect.fitconnect.model.User;
import com.example.fitconnect.fitconnect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private VerificationCode verificationCode;

    @Autowired
    private EmailService emailService;

    public Map<String, Object> registerUser(String email, String password, String userType) {
        try {
            if (emailExists(email)) {
                throw new RuntimeException("Email already exists");
            }

            String verificationCodeString = verificationCode.generateCode();
            User user = new User(email, password, userType, "unverified", verificationCodeString);
            user = userRepository.save(user);

            // Send verification code to user's email
            emailService.sendVerificationCode(email, verificationCodeString);

            UserDTO userDTO = new UserDTO(user.getId(), user.getEmail(), user.getUserType(), user.getStatus());
            Map<String, Object> response = new HashMap<>();
            response.put("message", "User registered successfully");
            response.put("user", userDTO);
            return response;
        } catch (Exception e) {
            throw new RuntimeException("Registration failed", e);
        }
    }


    public Map<String, Object> loginUser(String email, String password) {
        try {
            User user = userRepository.findByEmail(email);
            if (user == null || !user.getPassword().equals(password)) {
                throw new RuntimeException("Invalid email or password");
            }

            UserDTO userDTO = new UserDTO(user.getId(), user.getEmail(), user.getUserType(), user.getStatus());
            Map<String, Object> response = new HashMap<>();
            response.put("message", "User logged in successfully");
            response.put("user", userDTO);
            return response;
        } catch (Exception e) {
            throw new RuntimeException("Login failed", e);
        }
    }

    public Map<String, Object> updateUser(String id, String userType, String status) {
        try {
            User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
            
            user.setUserType(userType);
            user.setStatus(status);
            user = userRepository.save(user);
    
            UserDTO userDTO = new UserDTO(user.getId(), user.getEmail(), user.getUserType(), user.getStatus());
            Map<String, Object> response = new HashMap<>();
            response.put("message", "User updated successfully");
            response.put("user", userDTO);
            return response;
        } catch (Exception e) {
            throw new RuntimeException("Failed to update user", e);
        }
    }


    public void deleteUser(String id) {
        try {
            Optional<User> userOptional = userRepository.findById(id);
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                userRepository.delete(user);
            } else {
                throw new RuntimeException("User not found");
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete user", e);
        }
    }

    public boolean emailExists(String email) {
        return userRepository.findByEmail(email) != null;
    }

    public Map<String, Object> updatePassword(String email, String currentPassword, String newPassword) {
        try {
            User user = userRepository.findByEmail(email);
            if (user == null) {
                throw new RuntimeException("User not found");
            }

            if (!user.getPassword().equals(currentPassword)) {
                throw new RuntimeException("Invalid current password");
            }

            user.setPassword(newPassword);
            user = userRepository.save(user);

            UserDTO userDTO = new UserDTO(user.getId(), user.getEmail(), user.getUserType(), user.getStatus());
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Password updated successfully");
            response.put("user", userDTO);
            return response;
        } catch (Exception e) {
            throw new RuntimeException("Failed to update password", e);
        }
    }

    public Map<String, Object> verifyUser(String email, String verificationCode) {
        try {
            User user = userRepository.findByEmail(email);
            if (user == null) {
                throw new RuntimeException("User not found");
            }

            if (!user.getVerificationCode().equals(verificationCode)) {
                throw new RuntimeException("Invalid verification code");
            }

            user.setStatus("verified");
            user = userRepository.save(user);

            UserDTO userDTO = new UserDTO(user.getId(), user.getEmail(), user.getUserType(), user.getStatus());
            Map<String, Object> response = new HashMap<>();
            response.put("message", "User verified successfully");
            response.put("user", userDTO);
            return response;
        } catch (Exception e) {
            throw new RuntimeException("Failed to verify user", e);
        }
    }

    public void requestPasswordReset(String email) {
        try {
            User user = userRepository.findByEmail(email);
            if (user == null) {
                throw new RuntimeException("User not found");
            }

            String verificationCodeString = verificationCode.generateCode();
            user.setVerificationCode(verificationCodeString);
            userRepository.save(user);

            emailService.sendVerificationCode(email, verificationCodeString);
        } catch (Exception e) {
            throw new RuntimeException("Failed to request password reset", e);
        }
    }

    public Map<String, Object> getAllUsers() {
        try {
            List<User> users = userRepository.findAll();
            List<UserDTO> userDTOs = users.stream()
                    .map(user -> new UserDTO(user.getId(), user.getEmail(), user.getUserType(), user.getStatus()))
                    .collect(Collectors.toList());

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Users retrieved successfully");
            response.put("users", userDTOs);
            return response;
        } catch (Exception e) {
            throw new RuntimeException("Failed to retrieve users", e);
        }
    }

    public Map<String, Object> resetPassword(String email, String verificationCode, String newPassword) {
        try {
            User user = userRepository.findByEmail(email);
            if (user == null) {
                throw new RuntimeException("User not found");
            }

            if (!user.getVerificationCode().equals(verificationCode)) {
                throw new RuntimeException("Invalid verification code");
            }

            user.setPassword(newPassword);
            user.setVerificationCode(null);
            user = userRepository.save(user);

            UserDTO userDTO = new UserDTO(user.getId(), user.getEmail(), user.getUserType(), user.getStatus());
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Password reset successfully");
            response.put("user", userDTO);
            return response;
        } catch (Exception e) {
            throw new RuntimeException("Failed to reset password", e);
        }
    }
}