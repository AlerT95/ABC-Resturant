package com.example.fitconnect.fitconnect.model;

import java.util.Date;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.mapping.DBRef;

public class Order {
    @Id
    private ObjectId id;
    private double totalAmount;
    private double subTotal;
    private double discount;
    private String status;
    private String paymentMethod; 
    private String orderType; 
    private String deliveryAddress; 

    @DBRef
    private User user;

    @CreatedDate
    private Date createdAt;

    // No-arg constructor
    public Order() {
        this.createdAt = new Date();
    }

    // Parameterized constructor
    public Order(double totalAmount, double subTotal, double discount, String status, String paymentMethod, String orderType, String deliveryAddress, User user) {
        this.totalAmount = totalAmount;
        this.subTotal = subTotal;
        this.discount = discount;
        this.status = status;
        this.paymentMethod = paymentMethod;
        this.orderType = orderType;
        this.deliveryAddress = deliveryAddress;
        this.user = user;
        this.createdAt = new Date();
    }

    // Getters and setters
    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public double getSubTotal() {
        return subTotal;
    }

    public void setSubTotal(double subTotal) {
        this.subTotal = subTotal;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getOrderType() {
        return orderType;
    }

    public void setOrderType(String orderType) {
        this.orderType = orderType;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}