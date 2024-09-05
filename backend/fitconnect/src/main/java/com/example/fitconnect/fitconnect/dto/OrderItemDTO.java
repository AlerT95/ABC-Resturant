package com.example.fitconnect.fitconnect.dto;

import org.bson.types.ObjectId;

public class OrderItemDTO {
    private ObjectId id;
    private int quantity;
    private double unitPrice;
    private double totalAmount;
    private String orderId;
    private String productId;
    private String serviceId;
    private String offerId;

    // Getters and setters
    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId objectId) {
        this.id = objectId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(double unitPrice) {
        this.unitPrice = unitPrice;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String string) {
        this.orderId = string;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getServiceId() {
        return serviceId;
    }

    public void setServiceId(String serviceId) {
        this.serviceId = serviceId;
    }

    public String getOfferId() {
        return offerId;
    }

    public void setOfferId(String offerId) {
        this.offerId = offerId;
    }
}
