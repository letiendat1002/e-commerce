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
    public ResponseEntity<List<Product>> getProducts() {
        return ResponseEntity.ok(productService.getProducts());
    }

    @GetMapping("{productID}")
    public ResponseEntity<Product> getProduct(@PathVariable("productID") BigInteger productID) {
        return ResponseEntity.ok(productService.getProduct(productID));
    }

    @PostMapping
    public ResponseEntity<Product> addProduct(@RequestBody ProductRequest request) {
        var product = productService.addProduct(request);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("{ProductID}")
    public ResponseEntity<?> deleteProduct(@PathVariable("ProductID") BigInteger productID) {
        productService.deleteProduct(productID);
        return ResponseEntity.ok().build();
    }

    @PutMapping("{productID}")
    public ResponseEntity<Product> updateProduct(
            @RequestBody ProductRequest request,
            @PathVariable("productID") BigInteger productID
    ) {
        var product = productService.updateProduct(request, productID);
        return ResponseEntity.ok(product);
    }
}
