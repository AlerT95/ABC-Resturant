package com.example.fitconnect.fitconnect.repository;

import com.example.fitconnect.fitconnect.model.Services;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;
import java.util.Optional;

public interface ServiceRepository extends MongoRepository<Services, ObjectId> {
   
    @SuppressWarnings("null")
    Optional<Services> findById(ObjectId id);

    @Query("{ 'category.categoryName' : ?0 }")
    List<Services> findByCategoryName(String categoryName);
}