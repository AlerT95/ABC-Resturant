package com.example.fitconnect.fitconnect.dto;

import java.util.Date;

public class OfferDTO {
    private String id;
    private String offerName;
    private String description;
    private double discountPercentage;
    private Date startDate;
    private Date endDate;
    private String productId; 

    public OfferDTO() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOfferName() {
        return offerName;
    }

    public void setOfferName(String offerName) {
        this.offerName = offerName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getDiscountPercentage() {
        return discountPercentage;
    }

    public void setDiscountPercentage(double discountPercentage) {
        this.discountPercentage = discountPercentage;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getProductId() { 
        return productId;
    }

    public void setProductId(String productId) { 
        this.productId = productId;
    }
}