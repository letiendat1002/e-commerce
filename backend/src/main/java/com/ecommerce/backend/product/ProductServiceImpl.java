package com.ecommerce.backend.product;

import com.ecommerce.backend.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProduct(BigInteger productID) {
        return productRepository
                .findById(productID)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "product with id [%s] not found".formatted(productID)
                        )
                );
    }

    @Override
    public void addProduct(ProductAddRequest request) {
        var product = new Product(
                request.categoryID(),
                request.name(),
                request.slug(),
                request.image(),
                request.imageReview1(),
                request.imageReview2(),
                request.imageReview3(),
                request.unitPrice(),
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
                request.status()
        );
        productRepository.save(product);
    }

    @Override
    public void deleteProduct(BigInteger productID) {
//        checkIfProductExistsOrThrow(productID);
        productRepository.deleteById(productID);
    }

//    private void checkIfProductExistsOrThrow(BigInteger productID) {
//        if (!ProductDAO.existsProductById(productID)) {
//            throw new ResourceNotFoundException(
//                    "product with id [%s] not found".formatted(productID)
//            );
//        }
//    }

    @Override
    public void updateProduct(ProductUpdateRequest request, BigInteger productID) {
        productRepository
                .findById(productID)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "product with id [%s] not found".formatted(productID)
                        )
                );
    }
}
