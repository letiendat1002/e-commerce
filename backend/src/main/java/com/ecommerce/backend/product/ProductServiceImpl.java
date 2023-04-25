package com.ecommerce.backend.product;

import com.ecommerce.backend.category.Category;
import com.ecommerce.backend.category.CategoryDAO;
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
public class ProductServiceImpl implements ProductService {
    private final ProductDAO productDAO;
    private final ProductDTOMapper productDTOMapper;
    private final CategoryDAO categoryDAO;

    @Override
    public List<ProductDTO> fetchAllProducts() {
        return productDAO.selectAllProducts()
                .stream()
                .map(productDTOMapper)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDTO> fetchAllProductsByCategory(BigInteger categoryID) {
        var category = selectCategoryByIdOrThrow(categoryID);

        return productDAO.selectAllProductsByCategory(category)
                .stream()
                .map(productDTOMapper)
                .collect(Collectors.toList());
    }

    @Override
    public ProductDTO fetchProductByProductID(BigInteger productID) {
        return productDAO
                .selectProductByID(productID)
                .map(productDTOMapper)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Product not found by productID {%d}".formatted(productID)
                        )
                );
    }

    @Override
    public ProductDTO fetchProductBySlug(String slug) {
        return productDAO
                .selectProductBySlug(slug)
                .map(productDTOMapper)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Product not found by slug {%s}".formatted(slug)
                        )
                );
    }

    @Override
    public ProductDTO addProduct(ProductRequest request) {
        checkIfProductExistsBySlugOrThrow(request.slug());

        var category = selectCategoryByIdOrThrow(request.categoryID());
        var product = new Product();

        putDataToProduct(request, category, product);

        return productDAO
                .insertProduct(product)
                .map(productDTOMapper)
                .orElseThrow(
                        () -> new FailedOperationException(
                                "Failed to add product"
                        )
                );
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

    private void checkIfProductExistsBySlugOrThrow(String slug) {
        var isExisted = productDAO.existsAnyProductBySlug(slug);
        if (isExisted) {
            throw new DuplicateResourceException(
                    "Product already exists by slug {%s}".formatted(slug)
            );
        }
    }

    @Override
    public void deleteProduct(BigInteger productID) {
        checkIfProductExistsByIdOrThrow(productID);
        productDAO.deleteProductByID(productID);
    }

    private void checkIfProductExistsByIdOrThrow(BigInteger productID) {
        var isExisted = productDAO.existsProductByID(productID);
        if (!isExisted) {
            throw new ResourceNotFoundException(
                    "Product not found by productID {%d}".formatted(productID)
            );
        }
    }

    @Override
    public ProductDTO updateProduct(BigInteger productID, ProductRequest request) {
        checkIfOtherProductExistsBySlugOrThrow(request.slug(), productID);

        var product = selectProductByIdOrThrow(productID);
        var category = selectCategoryByIdOrThrow(request.categoryID());

        putDataToProduct(request, category, product);

        return productDAO
                .updateProduct(product)
                .map(productDTOMapper)
                .orElseThrow(
                        () -> new FailedOperationException(
                                "Failed to update product"
                        ));
    }

    private void checkIfOtherProductExistsBySlugOrThrow(
            String slug,
            BigInteger productID
    ) {
        var isExisted = productDAO.existsOtherProductBySlug(slug, productID);
        if (isExisted) {
            throw new DuplicateResourceException(
                    "Product already exists by slug {%s}".formatted(slug)
            );
        }
    }

    private Product selectProductByIdOrThrow(BigInteger productID) {
        return productDAO
                .selectProductByID(productID)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Product not found by productID {%d}".formatted(productID)
                        )
                );
    }


    private void putDataToProduct(ProductRequest request, Category category, Product product) {
        product.setCategory(category);
        product.setName(request.name());
        product.setSlug(request.slug());
        product.setImage(request.image());
        product.setImageReview1(request.imageReview1());
        product.setImageReview2(request.imageReview2());
        product.setImageReview3(request.imageReview3());
        product.setUnitPrice(request.unitPrice());
        product.setQuantity(request.quantity());
        product.setDescription(request.description());
        product.setYearRelease(request.yearRelease());
        product.setManufacturer(request.manufacturer());
        product.setMonitor(request.monitor());
        product.setCpu(request.cpu());
        product.setRam(request.ram());
        product.setVga(request.vga());
        product.setHardDisk(request.hardDisk());
        product.setCamera(request.camera());
        product.setBattery(request.battery());
        product.setStatus(request.status());
    }
}
