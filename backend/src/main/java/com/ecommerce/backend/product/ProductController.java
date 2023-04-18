package com.ecommerce.backend.product;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/v1/products")
@RestController
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public List<Product> getProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("{productID}")
    public Product getProduct(
            @PathVariable("productID") BigInteger productID) {
        return productService.getProduct(productID);
    }

    @PostMapping
    public ResponseEntity<?> addProduct(@RequestBody ProductAddRequest request) {
        productService.addProduct(request);
        return ResponseEntity
                .ok()
                .build();
    }

    @DeleteMapping("{ProductID}")
    public ResponseEntity<?> deleteProduct(@PathVariable("ProductID") BigInteger productID) {
        productService.deleteProduct(productID);
        return ResponseEntity
                .noContent()
                .build();
    }

    @PutMapping("{productID}")
    public ResponseEntity<?> updateProduct(
            @RequestBody ProductUpdateRequest request,
            @PathVariable("productID") BigInteger productID
    ) {
        productService.updateProduct(request, productID);
        return ResponseEntity
                .noContent()
                .build();
    }
}
