package com.ecommerce.backend.product;

import java.math.BigInteger;
import java.util.List;

public interface ProductService {
    List<Product> getProducts();

    Product getProduct(BigInteger productID);

    void addProduct(ProductRequest request);

    void deleteProduct(BigInteger productID);

    void updateProduct(ProductRequest request, BigInteger productID);
}
