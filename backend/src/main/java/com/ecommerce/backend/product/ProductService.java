package com.ecommerce.backend.product;

import java.math.BigInteger;
import java.util.List;

public interface ProductService {
    List<Product> fetchAllProducts();

    List<Product> fetchAllProductsByCategoryID(BigInteger categoryID);

    Product fetchProductByProductID(BigInteger productID);

    Product addProduct(ProductRequest request);

    Product updateProduct(BigInteger productID, ProductRequest request);

    void deleteProduct(BigInteger productID);

    boolean existsProductByID(BigInteger productID);

    void updateProductQuantityByAmount(BigInteger productID, int quantity);
}
