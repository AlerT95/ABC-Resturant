package com.example.fitconnect.fitconnect.repository;

import com.example.fitconnect.fitconnect.model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends MongoRepository<Category, String> {

    // Find a category by name
    Category findByCategoryName(String categoryName);

}