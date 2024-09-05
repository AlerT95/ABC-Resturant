package com.example.fitconnect.fitconnect.service;

import com.example.fitconnect.fitconnect.model.Profile;
import com.example.fitconnect.fitconnect.repository.ProfileRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    // Create operation
    public Profile createProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    // Read operation
    public List<Profile> getAllProfiles() {
        return profileRepository.findAll();
    }

    public Optional<Profile> getProfileById(ObjectId id) {
        return profileRepository.findById(id);
    }

    // Adjusted to accept ObjectId instead of User object
    public List<Profile> getProfilesByUserId(ObjectId userId) {
        return profileRepository.findByUserId(userId);
    }

    // Update operation
    public Profile updateProfile(Profile updatedProfile) {
        return profileRepository.save(updatedProfile);
    }

   /**
 * Deletes profiles associated with a given user ID.
 *
 * @param userId The ObjectId of the user whose profiles are to be deleted.
 * @return true if any profiles were deleted, otherwise false.
 */
public boolean deleteProfileByUserId(ObjectId userId) {
    try {
        List<Profile> profiles = profileRepository.findByUserId(userId);
        if (!profiles.isEmpty()) {
            profileRepository.deleteAll(profiles);
            return true;
        } else {
           
            return false;
        }
    } catch (Exception e) {
       
        return false;
    }
}
}
