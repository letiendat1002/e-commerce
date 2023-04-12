package com.ecommerce.backend.product;

import com.ecommerce.backend.exception.ApiRequestException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.math.BigInteger;
import java.util.List;

@AllArgsConstructor
@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    public Product getProduct(BigInteger productID) {
        return productRepository
                .findById(productID)
                .orElseThrow(
                        () -> new ApiRequestException("Product not found")
                );
    }

    @Override
    public void addProduct(ProductRequest request) {
        var product = new Product();
        var formedProduct = addRequestDataToProduct(request, product);
        productRepository.save(formedProduct);
    }

    @Override
    public void deleteProduct(BigInteger productID) {
        productRepository.deleteById(productID);
    }

    @Override
    public void updateProduct(ProductRequest request, BigInteger productID) {
        var product = productRepository
                .findById(productID)
                .orElseThrow(
                        () -> new ApiRequestException("Product not found")
                );
        var formedProduct = addRequestDataToProduct(request, product);
        productRepository.save(formedProduct);
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
