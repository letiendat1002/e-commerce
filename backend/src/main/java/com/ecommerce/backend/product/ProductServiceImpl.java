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
    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getProduct(BigInteger productID) {
        return productRepository
                .findById(productID)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Product not found")
                );
    }

    @Override
    public Product addProduct(ProductRequest request) {
        var product = new Product();
        var formedProduct = addRequestDataToProduct(request, product);
        return productRepository.save(formedProduct);
    }

    @Override
    public void deleteProduct(BigInteger productID) {
        productRepository.deleteById(productID);
    }

    @Override
    public Product updateProduct(ProductRequest request, BigInteger productID) {
        return productRepository
                .findById(productID)
                .map(
                        product -> productRepository.save(addRequestDataToProduct(request, product))
                )
                .orElseThrow(
                        () -> new ResourceNotFoundException("Product not found")
                );
    }

    private Product addRequestDataToProduct(ProductRequest request, Product product) {
        product.setCategoryID(request.categoryID());
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
        return product;
    }
}
