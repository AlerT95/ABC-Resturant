package com.example.fitconnect.fitconnect.service;

import com.example.fitconnect.fitconnect.model.Category;
import com.example.fitconnect.fitconnect.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // Create a new category
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    // Get all categories
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Get a category by ID
    public Optional<Category> getCategoryById(String id) {
        return categoryRepository.findById(id);
    }

    // Get a category by name
    public Category getCategoryByName(String categoryName) {
        return categoryRepository.findByCategoryName(categoryName);
    }

    // Update a category
    public Category updateCategory(Category category) {
        return categoryRepository.save(category);
    }

    // Delete a category
    public void deleteCategory(String id) {
        categoryRepository.deleteById(id);
    }
}
