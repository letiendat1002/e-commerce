package com.ecommerce.backend.category;

import java.math.BigInteger;
import java.util.List;

public interface CategoryService {
    List<Category> fetchAllCategories();

    Category fetchCategoryByID(BigInteger categoryID);

    Category addCategory(CategoryRequest request);

    Category updateCategory(BigInteger categoryID, CategoryRequest request);

    void deleteCategory(BigInteger categoryID);

    boolean existsCategoryByID(BigInteger categoryID);
}
