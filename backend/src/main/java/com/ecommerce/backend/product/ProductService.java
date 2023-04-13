package com.ecommerce.backend.product;

import java.math.BigInteger;
import java.util.List;

public interface ProductService {
    List<Product> getProducts();

    Product getProduct(BigInteger productID);

    Product addProduct(ProductRequest request);

    Product updateProduct(ProductRequest request, BigInteger productID);

    void deleteProduct(BigInteger productID);
}
