package com.ecommerce.backend.category;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class CategoryJpaDAOImpl implements CategoryDAO {
    private final CategoryRepository categoryRepository;

    @Override
    public List<Category> selectAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Optional<Category> selectCategoryByID(BigInteger categoryID) {
        return categoryRepository.findById(categoryID);
    }

    @Override
    public Optional<Category> insertCategory(Category category) {
        return Optional.of(categoryRepository.save(category));
    }

    @Override
    public void deleteCategoryByID(BigInteger categoryID) {
        categoryRepository.deleteById(categoryID);
    }

    @Override
    public Optional<Category> updateCategory(Category category) {
        return Optional.of(categoryRepository.save(category));
    }

    @Override
    public boolean existsCategoryByID(BigInteger categoryID) {
        return categoryRepository.existsById(categoryID);
    }

    @Override
    public boolean existsCategoryBySlug(String slug) {
        return categoryRepository.existsBySlug(slug);
    }

    @Override
    public boolean existsOtherCategoryBySlug(String slug, BigInteger categoryID) {
        return categoryRepository.existsBySlugAndCategoryIDNot(slug, categoryID);
    }
}
