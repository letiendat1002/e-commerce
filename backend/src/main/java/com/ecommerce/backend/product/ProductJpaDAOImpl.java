package com.ecommerce.backend.product;

import com.ecommerce.backend.category.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class ProductJpaDAOImpl implements ProductDAO {
    private final ProductRepository productRepository;

    @Override
    public List<Product> selectAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> selectAllProductsByCategory(Category category) {
        return productRepository.findAllByCategory(category);
    }

    @Override
    public Optional<Product> selectProductByID(BigInteger productID) {
        return productRepository.findById(productID);
    }

    @Override
    public Optional<Product> insertProduct(Product product) {
        return Optional.of(productRepository.save(product));
    }

    @Override
    public void deleteProductByID(BigInteger productID) {
        productRepository.deleteById(productID);
    }

    @Override
    public Optional<Product> updateProduct(Product update) {
        return Optional.of(productRepository.save(update));
    }

    @Override
    public boolean existsProductByID(BigInteger productID) {
        return productRepository.existsById(productID);
    }

    @Override
    public boolean existsAnyProductBySlug(String slug) {
        return productRepository.existsBySlug(slug);
    }

    @Override
    public boolean existsOtherProductBySlug(String slug, BigInteger productID) {
        return productRepository.existsBySlugAndProductIDNot(slug, productID);
    }
}
