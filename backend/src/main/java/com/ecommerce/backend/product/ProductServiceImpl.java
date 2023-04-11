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
    public void addProduct(@RequestBody ProductRequest request) {
        var product = new Product();
        var formedProduct = addRequestDataToProduct(request, product);
        productRepository.save(formedProduct);
    }

    @Override
    public void deleteProduct(BigInteger productID) {
        productRepository.deleteById(productID);
    }

    @Override
    public void updateProduct(@RequestBody ProductRequest request, BigInteger productID) {
        var product = productRepository
                .findById(productID)
                .orElseThrow(
                        () -> new ApiRequestException("Product not found")
                );
        var formedProduct = addRequestDataToProduct(request, product);
        productRepository.save(formedProduct);
    }

    private Product addRequestDataToProduct(ProductRequest request, Product product) {
        product.setCategoryID(request.CategoryID());
        product.setName(request.Name());
        product.setSlug(request.Slug());
        product.setImage(request.Image());
        product.setImageReview1(request.ImageReview1());
        product.setImageReview2(request.ImageReview2());
        product.setImageReview3(request.ImageReview3());
        product.setUnitPrice(request.UnitPrice());
        product.setQuantity(request.Quantity());
        product.setDescription(request.Description());
        product.setYearRelease(request.YearRelease());
        product.setManufacturer(request.Manufacturer());
        product.setMonitor(request.Monitor());
        product.setCPU(request.CPU());
        product.setRAM(request.RAM());
        product.setVGA(request.VGA());
        product.setHardDisk(request.HardDisk());
        product.setCamera(request.Camera());
        product.setBattery(request.Battery());
        product.setStatus(request.Status());
        return product;
    }
}
