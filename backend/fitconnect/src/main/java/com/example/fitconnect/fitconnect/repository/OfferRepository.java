package com.example.fitconnect.fitconnect.repository;

import com.example.fitconnect.fitconnect.model.Offer;
import com.example.fitconnect.fitconnect.model.Product;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfferRepository extends MongoRepository<Offer, ObjectId> {
    // Method to find offers by product
    List<Offer> findByProduct(Product product);

    // Method to find offers by offer name
    Offer findByOfferName(String offerName);

}