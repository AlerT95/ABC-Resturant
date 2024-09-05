package com.example.fitconnect.fitconnect.repository;

import com.example.fitconnect.fitconnect.model.Profile;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfileRepository extends MongoRepository<Profile, ObjectId> {
    // Method to find profiles by userId instead of User object
    List<Profile> findByUserId(ObjectId userId);
}
