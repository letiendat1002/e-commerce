package com.ecommerce.backend.category;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;

@Repository
public interface CategoryRepository extends JpaRepository<Category, BigInteger> {
    boolean existsBySlug(String slug);

    boolean existsBySlugAndCategoryIDNot(String slug, BigInteger categoryID);
}
