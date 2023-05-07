package com.ecommerce.backend.rating;

import java.math.BigInteger;
import java.time.LocalDate;

public record RatingDTO(
        BigInteger userID,
        BigInteger orderID,
        BigInteger productID,
        Integer rateAmount,
        String comment,
        LocalDate dateRating
) {
}
