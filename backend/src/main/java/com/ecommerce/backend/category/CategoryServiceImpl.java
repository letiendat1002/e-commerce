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
        return categoryDAO
                .selectAllCategories()
                .stream()
                .map(categoryDTOMapper)
                .collect(Collectors.toList());
    }

    @Override
    public CategoryDTO fetchCategoryByID(BigInteger categoryID) {
        return categoryDTOMapper.apply(selectCategoryByIdOrThrow(categoryID));
    }

    @Override
    public CategoryDTO addCategory(CategoryRequest request) {
        checkIfCategoryNotExistsBySlugOrThrow(request.slug());

        var category = new Category(
                request.name(),
                request.slug(),
                request.image()
        );

        return categoryDAO
                .insertCategory(category)
                .map(categoryDTOMapper)
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
    public CategoryDTO updateCategory(BigInteger categoryID, CategoryRequest request) {
        var category = selectCategoryByIdOrThrow(categoryID);

        checkIfOtherCategoryNotExistsBySlugOrThrow(request.slug(), categoryID);
        checkAndUpdateChangesOrThrow(request, category);

        return categoryDAO
                .updateCategory(category)
                .map(categoryDTOMapper)
                .orElseThrow(
                        () -> new FailedOperationException(
                                "Failed to update category"
                        )
                );
    }

    private void checkAndUpdateChangesOrThrow(CategoryRequest request, Category category) {
        var isChanged = false;

        if (request.name() != null
                && !request.name().equals(category.getName())
        ) {
            category.setName(request.name());
            isChanged = true;
        }

        if (request.slug() != null
                && !request.slug().equals(category.getSlug())
        ) {
            category.setSlug(request.slug());
            isChanged = true;
        }

        if (request.image() != null
                && !request.image().equals(category.getImage())
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
        var isExisted = categoryDAO.existsOtherCategoryBySlug(slug, categoryID);
        if (isExisted) {
            throw new DuplicateResourceException(
                    "Category with slug {%s} is already existed".formatted(slug)
            );
        }
    }

    private Category selectCategoryByIdOrThrow(BigInteger categoryID) {
        return categoryDAO
                .selectCategoryByID(categoryID)
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
        var isExisted = categoryDAO.existsCategoryByID(categoryID);
        if (!isExisted) {
            throw new ResourceNotFoundException(
                    "Category not found by categoryID {%d}".formatted(categoryID)
            );
        }
    }
}
