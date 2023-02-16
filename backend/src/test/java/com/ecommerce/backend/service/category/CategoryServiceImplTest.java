package com.ecommerce.backend.service.category;

import com.ecommerce.backend.category.Category;
import com.ecommerce.backend.category.CategoryDAO;
import com.ecommerce.backend.category.CategoryRequest;
import com.ecommerce.backend.category.CategoryServiceImpl;
import com.ecommerce.backend.util.exception.DuplicateResourceException;
import com.ecommerce.backend.util.exception.FailedOperationException;
import com.ecommerce.backend.util.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigInteger;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CategoryServiceImplTest {
    private CategoryServiceImpl categoryService;
    @Mock
    private CategoryDAO categoryDAO;

    @BeforeEach
    void setUp() {
        categoryService = new CategoryServiceImpl(categoryDAO);
    }

    @Test
    void fetchAllCategories() {
        // When
        categoryService.fetchAllCategories();

        // Then
        verify(categoryDAO).selectAllCategories();
    }

    @Test
    void fetchCategoryByID() {
        // Given
        var id = BigInteger.valueOf(1);

        var category = new Category(id, "string", "string", "string");

        // When
        when(categoryDAO.selectCategoryByID(id)).thenReturn(Optional.of(category));

        var actual = categoryService.fetchCategoryByID(id);

        // Then
        assertThat(actual).isEqualTo(category);
    }

    @Test
    void whenFetchCategoryByID_butReturnEmptyOptional_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);

        // When
        when(categoryDAO.selectCategoryByID(id)).thenReturn(Optional.empty());

        // Then
        assertThatThrownBy(
                () -> categoryService.fetchCategoryByID(id)
        ).isInstanceOf(ResourceNotFoundException.class);
        verify(categoryDAO).selectCategoryByID(id);
    }

    @Test
    void whenFetchCategoryByID_butIdNotFound_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(9_999_999);

        // Then
        assertThatThrownBy(() -> categoryService.fetchCategoryByID(id))
                .isInstanceOf(ResourceNotFoundException.class);
        verify(categoryDAO).selectCategoryByID(id);
    }

    @Test
    void addCategory() {
        // Given
        var request = new CategoryRequest(
                "test-add-category",
                "test-add-category",
                "test-image-add"
        );

        var category = new Category(
                request.name(),
                request.slug(),
                request.image()
        );

        // When
        when(categoryDAO.existsCategoryBySlug(request.slug()))
                .thenReturn(false);

        when(categoryDAO.insertCategory(category)).thenReturn(Optional.of(category));

        categoryService.addCategory(request);

        // Then
        var captor = ArgumentCaptor.forClass(Category.class);
        verify(categoryDAO).insertCategory(captor.capture());

        var capturedCategory = captor.getValue();
        assertThat(capturedCategory.getCategoryID()).isNull();
        assertThat(capturedCategory.getSlug()).isEqualTo(request.slug());
        assertThat(capturedCategory.getName()).isEqualTo(request.name());
        assertThat(capturedCategory.getImage()).isEqualTo(request.image());
    }

    @Test
    void whenAddFailed_thenThrowException() {
        // Given
        var request = new CategoryRequest(
                "test-add-category",
                "test-add-category",
                "test-image-add"
        );

        // When
        when(categoryDAO.existsCategoryBySlug(request.slug()))
                .thenReturn(false);
        when(categoryDAO.insertCategory(any(Category.class)))
                .thenReturn(Optional.empty());

        // Then
        assertThatThrownBy(
                () -> categoryService.addCategory(request)
        ).isInstanceOf(FailedOperationException.class);
    }

    @Test
    void whenAddCategory_butAlreadyExistsCategoryBySlug_thenThrowException() {
        // Given
        var slug = "string";

        var request = new CategoryRequest(
                "string",
                slug,
                ""
        );

        // When
        when(categoryDAO.existsCategoryBySlug(slug)).thenReturn(true);

        // Then
        assertThatThrownBy(
                () -> categoryService.addCategory(request)
        ).isInstanceOf(DuplicateResourceException.class);

        verify(categoryDAO, never()).insertCategory(any());
    }

    @Test
    void updateCategory() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new CategoryRequest(
                "test-update-category",
                "test-update-category",
                "test-image-update"
        );

        var category = new Category(
                id,
                "string",
                "string",
                "string"
        );

        // When
        when(categoryDAO.selectCategoryByID(id))
                .thenReturn(Optional.of(category));
        when(categoryDAO.existsOtherCategoryBySlug(request.slug(), id))
                .thenReturn(false);
        when(categoryDAO.updateCategory(category)).thenReturn(Optional.of(category));

        categoryService.updateCategory(id, request);

        // Then
        var captor = ArgumentCaptor.forClass(Category.class);
        verify(categoryDAO).updateCategory(captor.capture());

        var capturedCategory = captor.getValue();
        assertThat(capturedCategory.getSlug()).isEqualTo(request.slug());
        assertThat(capturedCategory.getName()).isEqualTo(request.name());
        assertThat(capturedCategory.getImage()).isEqualTo(request.image());
    }

    @Test
    void whenUpdate_butIdNotFound_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(9_999_999);
        var request = new CategoryRequest(
                "test-update-category",
                "test-update-category",
                "test-image-update"
        );

        // Then
        assertThatThrownBy(() -> categoryService.updateCategory(id, request))
                .isInstanceOf(ResourceNotFoundException.class);
        verify(categoryDAO, never()).updateCategory(any());
    }

    @Test
    void whenUpdate_butExistsOtherCategoryBySlug_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new CategoryRequest(
                "test-update-category",
                "test-update-category",
                "test-image-update"
        );

        var category = new Category(
                id,
                "string",
                "string",
                "string"
        );

        // When
        when(categoryDAO.selectCategoryByID(id))
                .thenReturn(Optional.of(category));
        when(categoryDAO.existsOtherCategoryBySlug(request.slug(), id))
                .thenReturn(true);

        // Then
        assertThatThrownBy(() -> categoryService.updateCategory(id, request))
                .isInstanceOf(DuplicateResourceException.class);
    }

    @Test
    void whenUpdateFailed_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new CategoryRequest(
                "test-update-category",
                "test-update-category",
                "test-image-update"
        );

        var category = new Category(
                id,
                "string",
                "string",
                "string"
        );

        // When
        when(categoryDAO.selectCategoryByID(id))
                .thenReturn(Optional.of(category));
        when(categoryDAO.existsOtherCategoryBySlug(request.slug(), id))
                .thenReturn(false);
        when(categoryDAO.updateCategory(category))
                .thenReturn(Optional.empty());

        // Then
        assertThatThrownBy(() -> categoryService.updateCategory(id, request))
                .isInstanceOf(FailedOperationException.class);
    }

    @Test
    void whenUpdate_butHasNoChange_thenThrowException() {
        var id = BigInteger.valueOf(1);
        var request = new CategoryRequest(
                "string",
                "string",
                "string"
        );

        var category = new Category(
                id,
                request.name(),
                request.slug(),
                request.image()
        );

        // When
        when(categoryDAO.selectCategoryByID(id))
                .thenReturn(Optional.of(category));
        when(categoryDAO.existsOtherCategoryBySlug(request.slug(), id))
                .thenReturn(false);

        // Then
        assertThatThrownBy(() -> categoryService.updateCategory(id, request))
                .isInstanceOf(DuplicateResourceException.class);
        verify(categoryDAO, never()).updateCategory(any());
    }

    @Test
    void deleteCategory() {
        // Given
        var id = BigInteger.valueOf(1);

        // When
        when(categoryDAO.existsCategoryByID(id)).thenReturn(true);

        categoryService.deleteCategory(id);

        // Then
        verify(categoryDAO).deleteCategoryByID(id);
    }

    @Test
    void whenDeleteCategory_butIdNotFound_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(9_999_999);

        // When
        when(categoryDAO.existsCategoryByID(id)).thenReturn(false);

        // Then
        assertThatThrownBy(
                () -> categoryService.deleteCategory(id)
        ).isInstanceOf(ResourceNotFoundException.class);

        verify(categoryDAO, never()).deleteCategoryByID(id);
    }

    @Test
    void existsCategoryByID() {
        // Given
        var id = BigInteger.valueOf(1);

        // When
        when(categoryDAO.existsCategoryByID(id)).thenReturn(true);
        var result = categoryService.existsCategoryByID(id);

        // Then
        verify(categoryDAO).existsCategoryByID(id);
        assertThat(result).isTrue();
    }

    @Test
    void notExistsCategoryByID() {
        // Given
        var id = BigInteger.valueOf(1);

        // When
        when(categoryDAO.existsCategoryByID(id)).thenReturn(false);
        var result = categoryService.existsCategoryByID(id);

        // Then
        verify(categoryDAO).existsCategoryByID(id);
        assertThat(result).isFalse();
    }
}
