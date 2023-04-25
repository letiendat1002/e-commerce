package com.ecommerce.backend.category;

import com.ecommerce.backend.shared.exception.DuplicateResourceException;
import com.ecommerce.backend.shared.exception.FailedOperationException;
import com.ecommerce.backend.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryDAO categoryDAO;
    private final CategoryDTOMapper categoryDTOMapper;

    @Override
    public List<CategoryDTO> fetchAllCategories() {
        return categoryDAO.selectAllCategories()
                .stream()
                .map(categoryDTOMapper)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryDTO fetchCategoryByID(BigInteger categoryID) {
        return categoryDAO
                .selectCategoryByID(categoryID)
                .map(categoryDTOMapper)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Category not found by categoryID {%d}".formatted(categoryID)
                        )
                );
    }

    @Override
    public CategoryDTO fetchCategoryBySlug(String slug) {
        return categoryDAO
                .selectCategoryBySlug(slug)
                .map(categoryDTOMapper)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Category not found by slug {%s}".formatted(slug)
                        )
                );
    }

    @Override
    public CategoryDTO addCategory(CategoryRequest request) {
        checkIfCategoryExistsBySlugOrThrow(request.slug());

        var category = new Category();
        category.setName(request.name());
        category.setSlug(request.slug());
        category.setImage(request.image());

        return categoryDAO
                .insertCategory(category)
                .map(categoryDTOMapper)
                .orElseThrow(
                        () -> new FailedOperationException(
                                "Failed to add category"
                        )
                );
    }

    private void checkIfCategoryExistsBySlugOrThrow(String slug) {
        var isExisted = categoryDAO.existsCategoryBySlug(slug);
        if (isExisted) {
            throw new DuplicateResourceException(
                    "Category already exists by slug {%s}".formatted(slug)
            );
        }
    }

    @Override
    public CategoryDTO updateCategory(BigInteger categoryID, CategoryRequest request) {
        checkIfOtherCategoryExistsBySlugOrThrow(request.slug(), categoryID);

        var category = selectCategoryByIdOrThrow(categoryID);
        category.setName(request.name());
        category.setSlug(request.slug());
        category.setImage(request.image());

        return categoryDAO.updateCategory(category)
                .map(categoryDTOMapper)
                .orElseThrow(
                        () -> new FailedOperationException(
                                "Failed to update category"
                        )
                );
    }

    private void checkIfOtherCategoryExistsBySlugOrThrow(String slug, BigInteger categoryID) {
        var isExisted = categoryDAO.existsOtherCategoryBySlug(slug, categoryID);
        if (isExisted) {
            throw new DuplicateResourceException(
                    "Category already exists by slug {%s}".formatted(slug)
            );
        }
    }

    private Category selectCategoryByIdOrThrow(BigInteger categoryID) {
        return categoryDAO.selectCategoryByID(categoryID)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Category not found by categoryID {%d}".formatted(categoryID)
                        )
                );
    }

    @Override
    public void deleteCategory(BigInteger categoryID) {
        checkIfCategoryExistsByIdOrThrow(categoryID);
        categoryDAO.deleteCategoryByID(categoryID);
    }

    private void checkIfCategoryExistsByIdOrThrow(BigInteger categoryID) {
        if (!categoryDAO.existsCategoryByID(categoryID)) {
            throw new ResourceNotFoundException(
                    "Category not found by categoryID {%d}".formatted(categoryID)
            );
        }
    }
}
