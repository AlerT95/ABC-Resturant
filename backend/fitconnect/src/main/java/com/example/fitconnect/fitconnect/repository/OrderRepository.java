package com.example.fitconnect.fitconnect.repository;

import com.example.fitconnect.fitconnect.model.Order;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<Order, ObjectId> {
    // Method to find orders by userId instead of User object
    List<Order> findByUser_Id(ObjectId userId);
}
