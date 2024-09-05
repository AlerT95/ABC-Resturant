package com.example.fitconnect.fitconnect.dto;

public class UserDTO {
    private String id;
    private String email;
    private String userType;
    private String status;

    // Default constructor
    public UserDTO() {
    }

    // Parameterized constructor
    public UserDTO(String id, String email, String userType, String status) {
        this.id = id;
        this.email = email;
        this.userType = userType;
        this.status = status;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}