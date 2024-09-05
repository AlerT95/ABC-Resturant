package com.example.fitconnect.fitconnect.model;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
    private ObjectId id;
    private String email;
    private String password;
    private String userType;
    private String status;
    private String verificationCode; // added verificationCode attribute

    // Default constructor
    public User() {
    }

    // Parameterized constructor
    public User(String email, String password, String userType, String status, String verificationCode) {
        this.email = email;
        this.password = password;
        this.userType = userType;
        this.status = status;
        this.verificationCode = verificationCode; // initialized verificationCode
    }

    // Getters and Setters
    public String getId() {
        return id.toHexString();
    }

    public void setId(ObjectId id) {
        this.id = id;
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

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }
}