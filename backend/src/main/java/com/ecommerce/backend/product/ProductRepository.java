package com.ecommerce.backend.product;

import com.ecommerce.backend.category.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, BigInteger> {
    List<Product> findAllByCategory(Category category);

    boolean existsBySlug(String slug);

    boolean existsBySlugAndProductIDNot(String slug, BigInteger productID);
}
