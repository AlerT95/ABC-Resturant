package com.example.fitconnect.fitconnect.repository;

import com.example.fitconnect.fitconnect.model.Product;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;

import java.util.Optional;

public interface ProductRepository extends MongoRepository<Product, ObjectId> {
   
    @SuppressWarnings("null")
    Optional<Product> findById(String string);

     @Query("{ 'category.categoryName' : ?0 }")
    List<Product> findByCategoryName(String categoryName);
}