package com.example.fitconnect.fitconnect.service;

import com.example.fitconnect.fitconnect.dto.ServiceDTO;
import com.example.fitconnect.fitconnect.model.Category;
import com.example.fitconnect.fitconnect.model.Services;
import com.example.fitconnect.fitconnect.repository.CategoryRepository;
import com.example.fitconnect.fitconnect.repository.ServiceRepository;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ServicesService {

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public ServiceDTO createService(ServiceDTO serviceDTO) {
        Optional<Category> categoryOptional = categoryRepository.findById(serviceDTO.getCategoryId());

        if (categoryOptional.isPresent()) {
            Services service = new Services(
                    serviceDTO.getServiceName(),
                    serviceDTO.getDescription(),
                    serviceDTO.getPrice(),
                    categoryOptional.get()
            );
            Services savedService = serviceRepository.save(service);
            return convertToDTO(savedService);
        } else {
            throw new RuntimeException("Category not found");
        }
    }

    public List<ServiceDTO> getAllServices() {
        return serviceRepository.findAll().stream().map(this::convertToDTO).toList();
    }

    public ServiceDTO getServiceById(String id) {
        Optional<Services> serviceOptional = serviceRepository.findById(new ObjectId(id));
        return serviceOptional.map(this::convertToDTO).orElseThrow(() -> new RuntimeException("Service not found"));
    }

    public ServiceDTO updateService(String id, ServiceDTO serviceDTO) {
        Optional<Services> existingServiceOptional = serviceRepository.findById(new ObjectId(id));
        Optional<Category> categoryOptional = categoryRepository.findById(serviceDTO.getCategoryId());

        if (existingServiceOptional.isPresent() && categoryOptional.isPresent()) {
            Services existingService = existingServiceOptional.get();
            existingService.setServiceName(serviceDTO.getServiceName());
            existingService.setDescription(serviceDTO.getDescription());
            existingService.setPrice(serviceDTO.getPrice());
            existingService.setCategory(categoryOptional.get());
            Services updatedService = serviceRepository.save(existingService);
            return convertToDTO(updatedService);
        } else {
            throw new RuntimeException("Service or Category not found");
        }
    }

    public List<ServiceDTO> getServicesByCategoryName(String categoryName) {
        List<Services> services = serviceRepository.findByCategoryName(categoryName);
        return services.stream().map(this::convertToDTO).toList();
    }

    public void deleteService(String id) {
        serviceRepository.deleteById(new ObjectId(id));
    }

    // Helper method to convert Service to ServiceDTO
    private ServiceDTO convertToDTO(Services service) {
        ServiceDTO serviceDTO = new ServiceDTO();
        serviceDTO.setId(service.getId());
        serviceDTO.setServiceName(service.getServiceName());
        serviceDTO.setDescription(service.getDescription());
        serviceDTO.setPrice(service.getPrice());

        if (service.getCategory() != null) {
            serviceDTO.setCategoryId(service.getCategory().getId());
        }

        return serviceDTO;
    }
}