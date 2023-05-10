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
        return productDAO
                .selectAllProducts()
                .stream()
                .map(productDTOMapper)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDTO> fetchAllProductsByCategoryID(BigInteger categoryID) {
        var category = selectCategoryByIdOrThrow(categoryID);

        return productDAO
                .selectAllProductsByCategory(category)
                .stream()
                .map(productDTOMapper)
                .collect(Collectors.toList());
    }

    @Override
    public ProductDTO fetchProductByProductID(BigInteger productID) {
        return productDTOMapper
                .apply(selectProductByIdOrThrow(productID));
    }

    @Override
    public ProductDTO addProduct(ProductRequest request) {
        var category = selectCategoryByIdOrThrow(request.categoryID());

        checkIfProductNotExistsBySlugOrThrow(request.slug());

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

        return productDAO
                .insertProduct(product)
                .map(productDTOMapper)
                .orElseThrow(
                        () -> new FailedOperationException(
                                "Failed to add product"
                        )
                );
    }

    private void checkIfProductNotExistsBySlugOrThrow(String slug) {
        var isExisted = productDAO.existsAnyProductBySlug(slug);
        if (isExisted) {
            throw new DuplicateResourceException(
                    "Product with slug {%s} is already existed".formatted(slug)
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
        var product = selectProductByIdOrThrow(productID);

        checkIfCategoryExistsByIdOrThrow(request.categoryID());
        checkIfOtherProductNotExistsBySlugOrThrow(request.slug(), productID);
        checkAndUpdateChangesOrThrow(request, product);

        return productDAO
                .updateProduct(product)
                .map(productDTOMapper)
                .orElseThrow(
                        () -> new FailedOperationException(
                                "Failed to update product"
                        ));
    }

    private void checkIfCategoryExistsByIdOrThrow(BigInteger categoryID) {
        var isExisted = categoryDAO.existsCategoryByID(categoryID);
        if (!isExisted) {
            throw new ResourceNotFoundException(
                    "Category not found by categoryID {%d}".formatted(categoryID)
            );
        }
    }

    private void checkAndUpdateChangesOrThrow(ProductRequest request, Product product) {
        var isChanged = false;

        if (product.getCategory() != null) {
            if (!request.categoryID().equals(product.getCategory().getCategoryID())
            ) {
                var category = selectCategoryByIdOrThrow(request.categoryID());
                product.setCategory(category);
                isChanged = true;
            }
        } else {
            var category = selectCategoryByIdOrThrow(request.categoryID());
            product.setCategory(category);
            isChanged = true;
        }

        if (!request.name().equals(product.getName())
        ) {
            product.setName(request.name());
            isChanged = true;
        }

        if (!request.slug().equals(product.getSlug())
        ) {
            product.setSlug(request.slug());
            isChanged = true;
        }

        if (!request.image().equals(product.getImage())
        ) {
            product.setImage(request.image());
            isChanged = true;
        }

        if (!request.imageReview1().equals(product.getImageReview1())
        ) {
            product.setImageReview1(request.imageReview1());
            isChanged = true;
        }

        if (!request.imageReview2().equals(product.getImageReview2())
        ) {
            product.setImageReview2(request.imageReview2());
            isChanged = true;
        }

        if (!request.imageReview3().equals(product.getImageReview3())
        ) {
            product.setImageReview3(request.imageReview3());
            isChanged = true;
        }

        if (!request.unitPrice().equals(product.getUnitPrice())
        ) {
            product.setUnitPrice(request.unitPrice());
            isChanged = true;
        }

        if (!request.discount().equals(product.getDiscount())
        ) {
            product.setDiscount(request.discount());
            isChanged = true;
        }

        if (!request.quantity().equals(product.getQuantity())
        ) {
            product.setQuantity(request.quantity());
            isChanged = true;
        }

        if (!request.description().equals(product.getDescription())
        ) {
            product.setDescription(request.description());
            isChanged = true;
        }

        if (!request.yearRelease().equals(product.getYearRelease())
        ) {
            product.setYearRelease(request.yearRelease());
            isChanged = true;
        }

        if (!request.manufacturer().equals(product.getManufacturer())
        ) {
            product.setManufacturer(request.manufacturer());
            isChanged = true;
        }

        if (!request.monitor().equals(product.getMonitor())
        ) {
            product.setMonitor(request.monitor());
            isChanged = true;
        }

        if (!request.cpu().equals(product.getCpu())
        ) {
            product.setCpu(request.cpu());
            isChanged = true;
        }

        if (!request.ram().equals(product.getRam())
        ) {
            product.setRam(request.ram());
            isChanged = true;
        }

        if (!request.vga().equals(product.getVga())
        ) {
            product.setVga(request.vga());
            isChanged = true;
        }

        if (!request.hardDisk().equals(product.getHardDisk())
        ) {
            product.setHardDisk(request.hardDisk());
            isChanged = true;
        }

        if (!request.camera().equals(product.getCamera())
        ) {
            product.setCamera(request.camera());
            isChanged = true;
        }

        if (!request.battery().equals(product.getBattery())
        ) {
            product.setBattery(request.battery());
            isChanged = true;
        }

        if (!request.memory().equals(product.getMemory())
        ) {
            product.setMemory(request.memory());
            isChanged = true;
        }

        if (!request.demand().equals(product.getDemand())
        ) {
            product.setDemand(request.demand());
            isChanged = true;
        }

        if (!isChanged) {
            throw new DuplicateResourceException(
                    "No data changes detected"
            );
        }
    }

    private void checkIfOtherProductNotExistsBySlugOrThrow(
            String slug,
            BigInteger productID
    ) {
        var isExisted = productDAO.existsOtherProductBySlug(slug, productID);
        if (isExisted) {
            throw new DuplicateResourceException(
                    "Product with slug {%s} is already existed".formatted(slug)
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
}
