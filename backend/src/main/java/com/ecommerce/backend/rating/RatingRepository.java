package com.ecommerce.backend.rating;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;

@Repository
public interface RatingRepository extends JpaRepository<Rating, RatingID> {
    List<Rating> findAllByProductID(BigInteger productID);

    List<Rating> findAllByUserID(BigInteger userID);

    List<Rating> findAllByUserIDAndProductID(BigInteger userID, BigInteger productID);

    Rating findByOrderID(BigInteger orderID);

    Rating findByUserIDAndOrderID(BigInteger userID, BigInteger orderID);

    Rating findByProductIDAndOrderID(BigInteger productID, BigInteger orderID);

    boolean existsByOrderIDAndProductID(BigInteger orderID, BigInteger productID);
}
