package com.ecommerce.backend.rating;

import java.math.BigInteger;
import java.util.List;

public interface RatingService {
    List<RatingDTO> fetchAllRatings();

    List<RatingDTO> fetchRatingsByUserID(BigInteger userID);

    List<RatingDTO> fetchRatingsByProductID(BigInteger productID);

    List<RatingDTO> fetchRatingsByUserIDAndProductID(BigInteger userID, BigInteger productID);

    RatingDTO fetchRatingByOrderID(BigInteger orderID);

    RatingDTO fetchRatingByUserIdAndOrderId(BigInteger userID, BigInteger orderID);

    RatingDTO fetchRatingByProductIdAndOrderId(BigInteger productID, BigInteger orderID);

    RatingDTO fetchRatingByID(RatingID ratingID);

    RatingDTO addRating(RatingRequest request);

    RatingDTO updateRating(RatingRequest request);

    void deleteRatingByID(RatingID ratingID);
}
