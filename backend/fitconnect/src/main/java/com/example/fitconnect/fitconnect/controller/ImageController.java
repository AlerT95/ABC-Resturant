package com.example.fitconnect.fitconnect.controller;

import com.example.fitconnect.fitconnect.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String fileName = imageService.uploadImage(file);
            return ResponseEntity.ok().body(fileName);
        } catch (IOException e) {
            System.out.println("Error during file upload: " + e.getMessage()); // Add logging for better debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image");
        }
    }

    
    @GetMapping("/retrieve/{fileName}")
    public ResponseEntity<byte[]> retrieveImage(@PathVariable("fileName") String fileName) {
        try {
            byte[] imageData = imageService.getImage(fileName);
            return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(imageData);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
