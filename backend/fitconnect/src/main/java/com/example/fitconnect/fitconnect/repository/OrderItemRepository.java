package com.example.fitconnect.fitconnect.repository;

import com.example.fitconnect.fitconnect.model.Order;
import com.example.fitconnect.fitconnect.model.OrderItem;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends MongoRepository<OrderItem, ObjectId> {
    // Method to find order items by order id
    List<OrderItem> findByOrder_Id(ObjectId orderId);

    // Method to find order items by product id
    List<OrderItem> findByProduct_Id(ObjectId productId);

    // Method to find order items by service id
    List<OrderItem> findByService_Id(ObjectId serviceId);

    // Method to find order items by offer id
    List<OrderItem> findByOffer_Id(ObjectId offerId);

    // Method to find order items by order
    List<OrderItem> findByOrder(Order order);

    // Method to delete order items by order
    void deleteByOrder(Order order);
}
