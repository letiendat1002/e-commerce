package com.ecommerce.backend.service;

import com.ecommerce.backend.category.*;
import com.ecommerce.backend.shared.exception.DuplicateResourceException;
import com.ecommerce.backend.shared.exception.ResourceNotFoundException;
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

    private final CategoryDTOMapper categoryDTOMapper = new CategoryDTOMapper();
    private CategoryServiceImpl categoryService;
    @Mock
    private CategoryDAO categoryDAO;

    @BeforeEach
    void setUp() {
        categoryService = new CategoryServiceImpl(categoryDAO, categoryDTOMapper);
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

        var expected = categoryDTOMapper.apply(category);
        var actual = categoryService.fetchCategoryByID(id);

        // Then
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void givenID_whenFetchCategoryByID_butReturnEmptyOptional_thenThrowException() {
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
    void givenID_whenFetchCategoryByID_butIdNotFound_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(9_999_999);

        // When
        when(categoryDAO.selectCategoryByID(id)).thenThrow(ResourceNotFoundException.class);

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
    void givenSlug_whenAlreadyExists_thenThrowException() {
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

        // When
        var category = new Category(
                id,
                "string",
                "string",
                "string"
        );

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
    void whenUpdateCategory_butHasNoChanges_thenThrowException() {
        var id = BigInteger.valueOf(1);
        var request = new CategoryRequest(
                "string",
                "string",
                "string"
        );

        // When
        var category = new Category(
                id,
                request.name(),
                request.slug(),
                request.image()
        );

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
    void givenId_whenDeleteCategory_butIdIsNotExist_thenThrowException() {
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
}