package com.ecommerce.backend.category;

import com.ecommerce.backend.util.exception.DuplicateResourceException;
import com.ecommerce.backend.util.exception.FailedOperationException;
import com.ecommerce.backend.util.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;

@RequiredArgsConstructor
@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryDAO categoryDAO;

    @Override
    public List<Category> fetchAllCategories() {
        return categoryDAO.selectAllCategories();
    }

    @Override
    public Category fetchCategoryByID(BigInteger categoryID) {
        return categoryDAO
                .selectCategoryByID(categoryID)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Category not found by categoryID {%d}"
                                        .formatted(categoryID)
                        )
                );
    }

    @Override
    public Category addCategory(CategoryRequest request) {
        checkIfCategoryNotExistsBySlugOrThrow(request.slug());

        var category = new Category(
                request.name(),
                request.slug(),
                request.image()
        );

        return categoryDAO
                .insertCategory(category)
                .orElseThrow(
                        () -> new FailedOperationException(
                                "Failed to add category"
                        )
                );
    }

    private void checkIfCategoryNotExistsBySlugOrThrow(String slug) {
        var isExisted = categoryDAO.existsCategoryBySlug(slug);
        if (isExisted) {
            throw new DuplicateResourceException(
                    "Category with slug {%s} is already existed".formatted(slug)
            );
        }
    }

    @Override
    public Category updateCategory(BigInteger categoryID, CategoryRequest request) {
        var category = fetchCategoryByID(categoryID);

        checkIfOtherCategoryNotExistsBySlugOrThrow(request.slug(), categoryID);
        checkAndUpdateChangesOrThrow(request, category);

        return categoryDAO
                .updateCategory(category)
                .orElseThrow(
                        () -> new FailedOperationException(
                                "Failed to update category"
                        )
                );
    }

    private void checkAndUpdateChangesOrThrow(
            CategoryRequest request,
            Category category
    ) {
        var isChanged = false;

        if (!request.name().equals(category.getName())
        ) {
            category.setName(request.name());
            isChanged = true;
        }

        if (!request.slug().equals(category.getSlug())
        ) {
            category.setSlug(request.slug());
            isChanged = true;
        }

        if (!request.image().equals(category.getImage())
        ) {
            category.setImage(request.image());
            isChanged = true;
        }

        if (!isChanged) {
            throw new DuplicateResourceException(
                    "No data changes detected"
            );
        }
    }

    private void checkIfOtherCategoryNotExistsBySlugOrThrow(
            String slug,
            BigInteger categoryID
    ) {
        var isExisted = categoryDAO
                .existsOtherCategoryBySlug(slug, categoryID);
        if (isExisted) {
            throw new DuplicateResourceException(
                    "Category with slug {%s} is already existed"
                            .formatted(slug)
            );
        }
    }

    @Override
    public void deleteCategory(BigInteger categoryID) {
        checkIfCategoryExistsByIdOrThrow(categoryID);
        categoryDAO.deleteCategoryByID(categoryID);
    }

    @Override
    public boolean existsCategoryByID(BigInteger categoryID) {
        return categoryDAO.existsCategoryByID(categoryID);
    }

    private void checkIfCategoryExistsByIdOrThrow(BigInteger categoryID) {
        var isExisted = categoryDAO.existsCategoryByID(categoryID);
        if (!isExisted) {
            throw new ResourceNotFoundException(
                    "Category not found by categoryID {%d}".formatted(categoryID)
            );
        }
    }
}
