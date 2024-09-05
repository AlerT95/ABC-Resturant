package com.example.fitconnect.fitconnect.controller;

import com.example.fitconnect.fitconnect.dto.ServiceDTO;
import com.example.fitconnect.fitconnect.service.ServicesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServicesController {

    @Autowired
    private ServicesService servicesService;

    @SuppressWarnings("null")
    @PostMapping("")
    public ResponseEntity<ServiceDTO> createService(@RequestBody ServiceDTO serviceDTO) {
        try {
            return new ResponseEntity<>(servicesService.createService(serviceDTO), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @SuppressWarnings("null")
    @GetMapping("")
    public ResponseEntity<List<ServiceDTO>> getAllServices() {
        try {
            List<ServiceDTO> services = servicesService.getAllServices();
            if (services.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(services, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @SuppressWarnings("null")
    @GetMapping("/{id}")
    public ResponseEntity<ServiceDTO> getServiceById(@PathVariable("id") String id) {
        try {
            return new ResponseEntity<>(servicesService.getServiceById(id), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @SuppressWarnings("null")
    @PutMapping("/{id}")
    public ResponseEntity<ServiceDTO> updateService(@PathVariable("id") String id, @RequestBody ServiceDTO serviceDTO) {
        try {
            return new ResponseEntity<>(servicesService.updateService(id, serviceDTO), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @SuppressWarnings("null")
    @GetMapping("/category/{categoryName}")
    public ResponseEntity<List<ServiceDTO>> getServicesByCategoryName(@PathVariable("categoryName") String categoryName) {
        try {
            List<ServiceDTO> services = servicesService.getServicesByCategoryName(categoryName);
            if (services.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(services, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteService(@PathVariable("id") String id) {
        try {
            servicesService.deleteService(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
