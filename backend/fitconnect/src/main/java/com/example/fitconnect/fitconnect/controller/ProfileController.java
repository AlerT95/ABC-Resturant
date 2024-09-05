package com.example.fitconnect.fitconnect.controller;

import com.example.fitconnect.fitconnect.model.Profile;
import com.example.fitconnect.fitconnect.service.ProfileService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/profiles")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @PostMapping("/user/{userId}")
    public ResponseEntity<Profile> createProfile(@PathVariable("userId") String userId, @RequestBody Profile profile) {
        ObjectId userObjectId = new ObjectId(userId);
        profile.setUserId(userObjectId);
        Profile createdProfile = profileService.createProfile(profile);
        return ResponseEntity.ok(createdProfile);
    }

    @GetMapping
    public ResponseEntity<List<Profile>> getAllProfiles() {
        List<Profile> profiles = profileService.getAllProfiles();
        return ResponseEntity.ok(profiles);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Profile> getProfileById(@PathVariable("id") String id) {
        ObjectId objectId = new ObjectId(id);
        Optional<Profile> profile = profileService.getProfileById(objectId);
        return profile.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Profile>> getProfilesByUser(@PathVariable("userId") String userId) {
        ObjectId objectId = new ObjectId(userId);
        List<Profile> profiles = profileService.getProfilesByUserId(objectId);
        return ResponseEntity.ok(profiles);
    }

    @PutMapping("/{id}/user/{userId}")
    public ResponseEntity<Profile> updateProfile(@PathVariable("id") String id, @PathVariable("userId") String userId, @RequestBody Profile updatedProfile) {
        ObjectId objectId = new ObjectId(id);
        ObjectId userObjectId = new ObjectId(userId);
        Profile existingProfile = profileService.getProfileById(objectId).orElse(null);
        if (existingProfile == null || !existingProfile.getUserId().equals(userObjectId)) {
            return ResponseEntity.notFound().build();
        }
        updatedProfile.setId(objectId);
        updatedProfile.setUserId(userObjectId);
        Profile updated = profileService.updateProfile(updatedProfile);
        return ResponseEntity.ok(updated);
    }

     /**
     * Deletes all profiles associated with a specific user.
     *
     * @param userId The ID of the user whose profiles are to be deleted.
     * @return ResponseEntity with the appropriate status code.
     */
    @DeleteMapping("/user/{userId}")
    public ResponseEntity<Void> deleteProfilesByUser(@PathVariable("userId") String userId) {
        try {
            ObjectId userObjectId = new ObjectId(userId);
            boolean deleted = profileService.deleteProfileByUserId(userObjectId);
            if (deleted) {
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(null);
        }
    }
}
