package com.ecommerce.backend.product;

import java.math.BigInteger;
import java.util.List;

public interface ProductService {
    List<ProductDTO> fetchAllProducts();

    List<ProductDTO> fetchAllProductsByCategory(BigInteger categoryID);

    ProductDTO fetchProductByProductID(BigInteger productID);

    ProductDTO fetchProductBySlug(String slug);

    ProductDTO addProduct(ProductRequest request);

    ProductDTO updateProduct(BigInteger productID, ProductRequest request);

    void deleteProduct(BigInteger productID);
}
