package com.example.fitconnect.fitconnect.repository;

import com.example.fitconnect.fitconnect.model.User;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, ObjectId> {
    User findByEmail(String email);
    @SuppressWarnings("null")
    Optional<User> findById(String string);
}