package com.ecommerce.backend.category;

import java.math.BigInteger;
import java.util.List;

public interface CategoryService {
    List<CategoryDTO> fetchAllCategories();

    CategoryDTO fetchCategoryByID(BigInteger categoryID);

    CategoryDTO fetchCategoryBySlug(String slug);

    CategoryDTO addCategory(CategoryRequest request);

    CategoryDTO updateCategory(BigInteger categoryID, CategoryRequest request);

    void deleteCategory(BigInteger categoryID);
}
