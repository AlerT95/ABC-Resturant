package com.example.fitconnect.fitconnect.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ImageService {

    @Value("${image.upload.directory}")
    private String uploadDirectory;

    public String uploadImage(MultipartFile file) throws IOException {
        @SuppressWarnings("null")
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        String fileExtension = fileName.substring(fileName.lastIndexOf("."));
        String generatedFileName = UUID.randomUUID().toString() + fileExtension;
    
        Path uploadPath = Paths.get(uploadDirectory);
        try {
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
                System.out.println("Directory created at: " + uploadPath.toAbsolutePath());
            }
        } catch (IOException e) {
            System.out.println("Failed to create directory: " + e.getMessage());
            throw new IOException("Failed to create upload directory", e);
        }
    
        Path filePath = uploadPath.resolve(generatedFileName);
        try {
            Files.copy(file.getInputStream(), filePath);
            System.out.println("File uploaded to: " + filePath.toAbsolutePath());
        } catch (IOException e) {
            System.out.println("Failed to upload file: " + e.getMessage());
            throw new IOException("Failed to upload file", e);
        }
    
        return generatedFileName;
    }

    
    public byte[] getImage(String fileName) throws IOException {
        Path imagePath = Paths.get(uploadDirectory).resolve(fileName);
        return Files.readAllBytes(imagePath);
    }
}