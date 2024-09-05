package com.example.fitconnect.fitconnect.service;

import com.example.fitconnect.fitconnect.dto.ProductDTO;
import com.example.fitconnect.fitconnect.model.Category;
import com.example.fitconnect.fitconnect.model.Product;
import com.example.fitconnect.fitconnect.repository.CategoryRepository;
import com.example.fitconnect.fitconnect.repository.ProductRepository;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public ProductDTO createProduct(ProductDTO productDTO) {
        Optional<Category> categoryOptional = categoryRepository.findById(productDTO.getCategoryId());

        if (categoryOptional.isPresent()) {
            Product product = new Product(
                    productDTO.getProductName(),
                    productDTO.getImageUrl(),
                    productDTO.getPrice(),
                    productDTO.getDescription(),
                    productDTO.getStatus(),
                    categoryOptional.get()
            );
            Product savedProduct = productRepository.save(product);
            return convertToDTO(savedProduct);
        } else {
            throw new RuntimeException("Category not found");
        }
    }

    public List<ProductDTO> getAllProducts() {
        return productRepository.findAll().stream().map(this::convertToDTO).toList();
    }

    public ProductDTO getProductById(String id) {
        Optional<Product> productOptional = productRepository.findById(new ObjectId(id));
        return productOptional.map(this::convertToDTO).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public ProductDTO updateProduct(String id, ProductDTO productDTO) {
        Optional<Product> existingProductOptional = productRepository.findById(new ObjectId(id));
        Optional<Category> categoryOptional = categoryRepository.findById(productDTO.getCategoryId());

        if (existingProductOptional.isPresent() && categoryOptional.isPresent()) {
            Product existingProduct = existingProductOptional.get();
            existingProduct.setProductName(productDTO.getProductName());
            existingProduct.setImageUrl(productDTO.getImageUrl());
            existingProduct.setPrice(productDTO.getPrice());
            existingProduct.setDescription(productDTO.getDescription());
            existingProduct.setStatus(productDTO.getStatus());
            existingProduct.setCategory(categoryOptional.get());
            Product updatedProduct = productRepository.save(existingProduct);
            return convertToDTO(updatedProduct);
        } else {
            throw new RuntimeException("Product or Category not found");
        }
    }

    public List<ProductDTO> getProductsByCategoryName(String categoryName) {
        List<Product> products = productRepository.findByCategoryName(categoryName);
        return products.stream().map(this::convertToDTO).toList();
    }

    public void deleteProduct(String id) {
        productRepository.deleteById(new ObjectId(id));
    }

    // Helper method to convert Product to ProductDTO
    private ProductDTO convertToDTO(Product product) {
        ProductDTO productDTO = new ProductDTO();
        productDTO.setId(product.getId());
        productDTO.setProductName(product.getProductName());
        productDTO.setImageUrl(product.getImageUrl());
        productDTO.setPrice(product.getPrice());
        productDTO.setDescription(product.getDescription());
        productDTO.setStatus(product.getStatus());

        if (product.getCategory() != null) {
            productDTO.setCategoryId(product.getCategory().getId());
        }

        return productDTO;
    }
}