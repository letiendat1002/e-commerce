package com.ecommerce.backend.product;

import com.ecommerce.backend.category.Category;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

public interface ProductDAO {
    List<Product> selectAllProducts();

    List<Product> selectAllProductsByCategory(Category category);

    Optional<Product> selectProductByID(BigInteger productID);

    Optional<Product> insertProduct(Product product);

    void deleteProductByID(BigInteger productID);

    Optional<Product> updateProduct(Product update);

    boolean existsProductByID(BigInteger productID);

    boolean existsAnyProductBySlug(String slug);

    boolean existsOtherProductBySlug(String slug, BigInteger productID);
}
