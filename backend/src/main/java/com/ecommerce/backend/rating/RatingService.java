package com.ecommerce.backend.rating;

import java.math.BigInteger;
import java.util.List;

public interface RatingService {
    List<Rating> fetchAllRatings();

    List<Rating> fetchRatingsByUserID(BigInteger userID);

    List<Rating> fetchRatingsByProductID(BigInteger productID);

    List<Rating> fetchRatingsByUserIDAndProductID(BigInteger userID, BigInteger productID);

    Rating fetchRatingByOrderID(BigInteger orderID);

    Rating fetchRatingByUserIdAndOrderId(BigInteger userID, BigInteger orderID);

    Rating fetchRatingByOrderIdAndProductId(BigInteger productID, BigInteger orderID);

    Rating fetchRatingByID(RatingID ratingID);

    Rating addRating(RatingRequest request);

    Rating updateRating(RatingRequest request);

    void deleteRatingByID(RatingID ratingID);
}
