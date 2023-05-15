package com.ecommerce.backend.product;

import com.ecommerce.backend.category.Category;
import com.ecommerce.backend.category.CategoryService;
import com.ecommerce.backend.product.Product;
import com.ecommerce.backend.product.ProductDAO;
import com.ecommerce.backend.product.ProductRequest;
import com.ecommerce.backend.product.ProductServiceImpl;
import com.ecommerce.backend.shared.exception.DuplicateResourceException;
import com.ecommerce.backend.shared.exception.FailedOperationException;
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
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceImplTest {
    private ProductServiceImpl productService;
    @Mock
    private ProductDAO productDAO;
    @Mock
    private CategoryService categoryService;

    @BeforeEach
    void setUp() {
        productService = new ProductServiceImpl(productDAO, categoryService);
    }

    @Test
    void fetchAllProducts() {
        // When
        productService.fetchAllProducts();

        // Then
        verify(productDAO).selectAllProducts();
    }

    @Test
    void fetchAllProductsByCategoryID() {
        // Given
        var id = BigInteger.valueOf(1);

        var category = new Category(
                id,
                "string",
                "string",
                "string"
        );

        // When
        when(categoryService.fetchCategoryByID(id))
                .thenReturn(category);
        productService.fetchAllProductsByCategoryID(id);

        // Then
        verify(productDAO).selectAllProductsByCategory(category);
    }

    @Test
    void whenFetchAllProductsByCategoryID_butCategoryNotFound_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);

        // When
        when(categoryService.fetchCategoryByID(id))
                .thenThrow(ResourceNotFoundException.class);

        // Then
        assertThatThrownBy(() -> productService.fetchAllProductsByCategoryID(id))
                .isInstanceOf(ResourceNotFoundException.class);
        verify(productDAO, never()).selectAllProductsByCategory(any());
    }

    @Test
    void fetchProductByProductID() {
        // Given
        var id = BigInteger.valueOf(1);
        var category = new Category(id,
                "string",
                "string",
                "string");

        var product = new Product(
                id,
                category,
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                BigInteger.valueOf(0),
                null,
                50L,
                "string",
                0,
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                true
        );

        // When
        when(productDAO.selectProductByID(id)).thenReturn(Optional.of(product));

        var actual = productService.fetchProductByProductID(id);

        // Then
        assertThat(actual).isEqualTo(product);
    }

    @Test
    void whenFetchProductByID_butReturnEmptyOptional_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);

        // When
        when(productDAO.selectProductByID(id)).thenReturn(Optional.empty());

        // Then
        assertThatThrownBy(() -> productService.fetchProductByProductID(id))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void addProduct() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new ProductRequest(
                id,
                "string",
                "test-add-product",
                "",
                "string",
                "string",
                "string",
                BigInteger.valueOf(0),
                null,
                50L,
                "string",
                0,
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                true
        );

        var category = new Category(
                id,
                "string",
                "string",
                "string"
        );

        var product = new Product(
                category,
                request.name(),
                request.slug(),
                request.image(),
                request.imageReview1(),
                request.imageReview2(),
                request.imageReview3(),
                request.unitPrice(),
                request.discount(),
                request.quantity(),
                request.description(),
                request.yearRelease(),
                request.manufacturer(),
                request.monitor(),
                request.cpu(),
                request.ram(),
                request.vga(),
                request.hardDisk(),
                request.camera(),
                request.battery(),
                request.memory(),
                request.demand(),
                request.status()
        );

        // When
        when(categoryService.fetchCategoryByID(request.categoryID()))
                .thenReturn(category);
        when(productDAO.existsAnyProductBySlug(request.slug()))
                .thenReturn(false);
        when(productDAO.insertProduct(product))
                .thenReturn(Optional.of(product));
        productService.addProduct(request);

        // Then
        var captor = ArgumentCaptor.forClass(Product.class);
        verify(productDAO).insertProduct(captor.capture());
        var capturedProduct = captor.getValue();
        assertThat(capturedProduct).isEqualTo(product);
    }

    @Test
    void whenAddFailed_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new ProductRequest(
                id,
                "string",
                "test-add-product",
                "",
                "string",
                "string",
                "string",
                BigInteger.valueOf(0),
                null,
                50L,
                "string",
                0,
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                true
        );

        var category = new Category(
                id,
                "string",
                "string",
                "string"
        );

        // When
        when(categoryService.fetchCategoryByID(request.categoryID()))
                .thenReturn(category);
        when(productDAO.existsAnyProductBySlug(request.slug()))
                .thenReturn(false);

        // Then
        assertThatThrownBy(() -> productService.addProduct(request))
                .isInstanceOf(FailedOperationException.class);
    }

    @Test
    void whenAddProduct_butCategoryNotFound_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new ProductRequest(
                id,
                "string",
                "test-add-product",
                "",
                "string",
                "string",
                "string",
                BigInteger.valueOf(0),
                null,
                50L,
                "string",
                0,
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                true
        );

        // When
        when(categoryService.fetchCategoryByID(request.categoryID()))
                .thenThrow(ResourceNotFoundException.class);

        // Then
        assertThatThrownBy(() -> productService.addProduct(request))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void whenAddProduct_butExistsProductBySlug_thenThrowException() {
        // Given
        var slug = "string";

        var category = new Category(
                BigInteger.valueOf(1),
                "string",
                "string",
                "string"
        );

        var request = new ProductRequest(
                category.getCategoryID(),
                "string",
                slug,
                "",
                "string",
                "string",
                "string",
                BigInteger.valueOf(0),
                null,
                50L,
                "string",
                0,
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                true
        );

        // When
        when(categoryService.fetchCategoryByID(request.categoryID()))
                .thenReturn(category);
        when(productDAO.existsAnyProductBySlug(slug))
                .thenReturn(true);

        // Then
        assertThatThrownBy(
                () -> productService.addProduct(request)
        ).isInstanceOf(DuplicateResourceException.class);

        verify(productDAO, never()).insertProduct(any());
    }

    @Test
    void deleteProduct() {
        // Given
        var id = BigInteger.valueOf(1);

        // When
        when(productDAO.existsProductByID(id)).thenReturn(true);
        productService.deleteProduct(id);

        // Then
        verify(productDAO).deleteProductByID(id);
    }

    @Test
    void givenId_whenDeleteProduct_butIdNotFound_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);

        // When
        when(productDAO.existsProductByID(id)).thenReturn(false);

        // Then
        assertThatThrownBy(() -> productService.deleteProduct(id))
                .isInstanceOf(ResourceNotFoundException.class);

        verify(productDAO, never()).deleteProductByID(id);
    }

    @Test
    void updateProduct() {
        // Given
        var id = BigInteger.valueOf(1);
        var category = new Category(
                BigInteger.valueOf(1),
                "string",
                "string",
                "string"
        );

        var request = new ProductRequest(
                category.getCategoryID(),
                "test-update-product-name",
                "test-update-product-slug",
                "",
                "string",
                "string",
                "string",
                BigInteger.valueOf(0),
                null,
                100L,
                "string",
                0,
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                true
        );

        var product = new Product(
                id,
                category,
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                BigInteger.valueOf(0),
                null,
                50L,
                "string",
                0,
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                true
        );

        // When
        when(productDAO.selectProductByID(id)).thenReturn(Optional.of(product));
        when(categoryService.existsCategoryByID(request.categoryID()))
                .thenReturn(true);
        when(productDAO.existsOtherProductBySlug(request.slug(), id))
                .thenReturn(false);
        when(productDAO.updateProduct(product)).thenReturn(Optional.of(product));
        productService.updateProduct(id, request);

        // Then
        var captor = ArgumentCaptor.forClass(Product.class);
        verify(productDAO).updateProduct(captor.capture());

        var capturedProduct = captor.getValue();
        assertThat(capturedProduct.getProductID()).isEqualTo(id);
        assertThat(capturedProduct.getCategory()).isEqualTo(category);
        assertThat(capturedProduct.getName()).isEqualTo(request.name());
        assertThat(capturedProduct.getSlug()).isEqualTo(request.slug());
        assertThat(capturedProduct.getImage()).isEqualTo(request.image());
        assertThat(capturedProduct.getImageReview1()).isEqualTo(request.imageReview1());
        assertThat(capturedProduct.getImageReview2()).isEqualTo(request.imageReview2());
        assertThat(capturedProduct.getImageReview3()).isEqualTo(request.imageReview3());
        assertThat(capturedProduct.getUnitPrice()).isEqualTo(request.unitPrice());
        assertThat(capturedProduct.getDiscount()).isEqualTo(request.discount());
        assertThat(capturedProduct.getQuantity()).isEqualTo(request.quantity());
        assertThat(capturedProduct.getDescription()).isEqualTo(request.description());
        assertThat(capturedProduct.getYearRelease()).isEqualTo(request.yearRelease());
        assertThat(capturedProduct.getManufacturer()).isEqualTo(request.manufacturer());
        assertThat(capturedProduct.getMonitor()).isEqualTo(request.monitor());
        assertThat(capturedProduct.getCpu()).isEqualTo(request.cpu());
        assertThat(capturedProduct.getRam()).isEqualTo(request.ram());
        assertThat(capturedProduct.getVga()).isEqualTo(request.vga());
        assertThat(capturedProduct.getHardDisk()).isEqualTo(request.hardDisk());
        assertThat(capturedProduct.getCamera()).isEqualTo(request.camera());
        assertThat(capturedProduct.getBattery()).isEqualTo(request.battery());
        assertThat(capturedProduct.getMemory()).isEqualTo(request.memory());
        assertThat(capturedProduct.getDemand()).isEqualTo(request.demand());
        assertThat(capturedProduct.getStatus()).isEqualTo(request.status());
    }

    @Test
    void whenUpdateFailed_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);
        var category = new Category(
                id,
                "string",
                "string",
                "string"
        );

        var request = new ProductRequest(
                id,
                "test-update-product-name",
                "test-update-product-slug",
                "",
                "string",
                "string",
                "string",
                BigInteger.valueOf(0),
                null,
                100L,
                "string",
                0,
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                true
        );

        var product = new Product(
                id,
                category,
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                BigInteger.valueOf(0),
                null,
                50L,
                "string",
                0,
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                true
        );

        // When
        when(productDAO.selectProductByID(id)).thenReturn(Optional.of(product));
        when(categoryService.existsCategoryByID(request.categoryID()))
                .thenReturn(true);
        when(productDAO.existsOtherProductBySlug(request.slug(), id))
                .thenReturn(false);

        // Then
        assertThatThrownBy(() -> productService.updateProduct(id, request))
                .isInstanceOf(FailedOperationException.class);
    }

    @Test
    void whenUpdate__butHasNoChanges_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);
        var category = new Category(
                BigInteger.valueOf(1),
                "string",
                "string",
                "string"
        );

        var request = new ProductRequest(
                category.getCategoryID(),
                "string",
                "string",
                "",
                "string",
                "string",
                "string",
                BigInteger.valueOf(0),
                null,
                50L,
                "string",
                0,
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                true
        );

        // When
        var product = new Product(
                id,
                category,
                "string",
                "string",
                "",
                "string",
                "string",
                "string",
                BigInteger.valueOf(0),
                null,
                50L,
                "string",
                0,
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                "string",
                true
        );

        when(productDAO.selectProductByID(id)).thenReturn(Optional.of(product));
        when(categoryService.existsCategoryByID(request.categoryID()))
                .thenReturn(true);
        when(productDAO.existsOtherProductBySlug(request.slug(), id))
                .thenReturn(false);

        // Then
        assertThatThrownBy(() -> productService.updateProduct(id, request))
                .isInstanceOf(DuplicateResourceException.class);
        verify(productDAO, never()).updateProduct(any());
    }
}