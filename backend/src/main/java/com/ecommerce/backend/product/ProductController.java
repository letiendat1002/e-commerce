package com.ecommerce.backend.product;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;

@AllArgsConstructor
@RequestMapping("/api/v1/products")
@RestController
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public List<Product> getProducts() {
        return productService.getProducts();
    }

    @GetMapping("{productID}")
    public Product getProduct(@PathVariable("productID") BigInteger productID) {
        return productService.getProduct(productID);
    }

    @PostMapping
    public void addProduct(@RequestBody ProductRequest request) {
        productService.addProduct(request);
    }

    @DeleteMapping("{ProductID}")
    public void deleteProduct(@PathVariable("ProductID") BigInteger productID) {
        productService.deleteProduct(productID);
    }

    @PutMapping("{productID}")
    public void updateProduct(
            @RequestBody ProductRequest request,
            @PathVariable("productID") BigInteger productID
    ) {
        productService.updateProduct(request, productID);
    }
}
