package com.ecommerce.backend.product;

import com.ecommerce.backend.category.CategoryService;
import com.ecommerce.backend.util.exception.DuplicateResourceException;
import com.ecommerce.backend.util.exception.FailedOperationException;
import com.ecommerce.backend.util.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements ProductService {
    private final ProductDAO productDAO;
    private final CategoryService categoryService;

    @Override
    public List<Product> fetchAllProducts() {
        return productDAO.selectAllProducts();
    }

    @Override
    public List<Product> fetchAllProductsByCategoryID(BigInteger categoryID) {
        var category = categoryService.fetchCategoryByID(categoryID);

        return productDAO.selectAllProductsByCategory(category);
    }

    @Override
    public Product fetchProductByProductID(BigInteger productID) {
        return productDAO
                .selectProductByID(productID)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "Product not found by productID {%d}"
                                        .formatted(productID)
                        )
                );
    }

    @Override
    public Product addProduct(ProductRequest request) {
        var category = categoryService.fetchCategoryByID(request.categoryID());

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
    public boolean existsProductByID(BigInteger productID) {
        return productDAO.existsProductByID(productID);
    }

    @Override
    public void updateProductQuantityByAmount(
            BigInteger productID,
            int amount
    ) {
        var product = fetchProductByProductID(productID);

        var absoluteAmount = Math.abs(amount);
        if (amount < 0) {
            if (product.getQuantity() < absoluteAmount) {
                throw new DataIntegrityViolationException(
                        "Product quantity is {%d} but amount needed is {%d}"
                                .formatted(product.getQuantity(), absoluteAmount)
                );
            }
        }
        product.setQuantity(product.getQuantity() + amount);

        productDAO
                .updateProduct(product)
                .orElseThrow(
                        () -> new FailedOperationException(
                                "Failed to update product"
                        ));
    }

    @Override
    public Product updateProduct(BigInteger productID, ProductRequest request) {
        var product = fetchProductByProductID(productID);

        checkIfCategoryExistsByIdOrThrow(request.categoryID());
        checkIfOtherProductNotExistsBySlugOrThrow(request.slug(), productID);
        checkAndUpdateChangesOrThrow(request, product);

        return productDAO
                .updateProduct(product)
                .orElseThrow(
                        () -> new FailedOperationException(
                                "Failed to update product"
                        ));
    }

    private void checkIfCategoryExistsByIdOrThrow(BigInteger categoryID) {
        var isExisted = categoryService.existsCategoryByID(categoryID);
        if (!isExisted) {
            throw new ResourceNotFoundException(
                    "Category not found by categoryID {%d}".formatted(categoryID)
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

    private void checkAndUpdateChangesOrThrow(ProductRequest request,
                                              Product product) {
        var isChanged = false;

        if (product.getCategory() != null) {
            if (!request.categoryID().equals(product.getCategory().getCategoryID())
            ) {
                var category = categoryService.fetchCategoryByID(
                        request.categoryID()
                );
                product.setCategory(category);
                isChanged = true;
            }
        } else {
            var category = categoryService.fetchCategoryByID(request.categoryID());
            product.setCategory(category);
            isChanged = true;
        }

        if (product.getDiscount() != null && request.discount() != null) {
            if (!request.discount().equals(product.getDiscount())
            ) {
                product.setDiscount(request.discount());
                isChanged = true;
            }
        } else if (product.getDiscount() == null && request.discount() == null) {
            isChanged = false;
        } else {
            product.setDiscount(request.discount());
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
}
