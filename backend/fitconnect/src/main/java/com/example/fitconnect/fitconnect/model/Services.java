package com.example.fitconnect.fitconnect.model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;

@Document(collection = "services")
public class Services {
    @Id
    private ObjectId id;
    private String serviceName;
    private String description;
    private double price;
    @DBRef
    private Category category;

    // Constructors, getters, and setters

    public Services() {
    }

    public Services(String serviceName, String description, double price, Category category) {
        this.serviceName = serviceName;
        this.description = description;
        this.price = price;
        this.category = category;
    }

    public String getId() {
        return id.toHexString();
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}