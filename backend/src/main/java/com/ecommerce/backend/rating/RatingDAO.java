package com.ecommerce.backend.rating;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

public interface RatingDAO {
    List<Rating> selectAllRatings();

    List<Rating> selectRatingsByUserID(BigInteger userID);

    List<Rating> selectRatingsByProductID(BigInteger productID);

    List<Rating> selectRatingsByUserIDAndProductID(BigInteger userID, BigInteger productID);

    Optional<Rating> selectRatingByOrderID(BigInteger orderID);

    Optional<Rating> selectRatingByID(RatingID ratingID);

    Optional<Rating> insertRating(Rating rating);

    Optional<Rating> updateRating(Rating update);

    void deleteRatingByID(RatingID ratingID);

    boolean existsRatingByID(RatingID ratingID);

    Optional<Rating> selectRatingByUserIDAndOrderID(BigInteger userID, BigInteger orderID);

    Optional<Rating> selectRatingByProductIDAndOrderID(BigInteger productID, BigInteger orderID);

    boolean existsRatingByOrderIDAndProductID(BigInteger orderID, BigInteger productID);
}
