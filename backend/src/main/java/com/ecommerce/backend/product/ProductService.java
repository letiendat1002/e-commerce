package com.ecommerce.backend.product;

import java.math.BigInteger;
import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();

    Product getProduct(BigInteger productID);

    void addProduct(ProductAddRequest request);

    void updateProduct(ProductUpdateRequest request, BigInteger productID);

    void deleteProduct(BigInteger productID);
}
