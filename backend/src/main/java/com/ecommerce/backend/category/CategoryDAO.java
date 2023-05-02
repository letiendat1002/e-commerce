package com.ecommerce.backend.category;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

public interface CategoryDAO {
    List<Category> selectAllCategories();

    Optional<Category> selectCategoryByID(BigInteger categoryID);

    Optional<Category> insertCategory(Category category);

    void deleteCategoryByID(BigInteger categoryID);

    Optional<Category> updateCategory(Category category);

    boolean existsCategoryByID(BigInteger categoryID);

    boolean existsCategoryBySlug(String slug);

    boolean existsOtherCategoryBySlug(String slug, BigInteger categoryID);
}
