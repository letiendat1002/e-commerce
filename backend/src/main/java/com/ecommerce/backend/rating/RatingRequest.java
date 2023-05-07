package com.ecommerce.backend.rating;

import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Range;

import java.math.BigInteger;

public record RatingRequest(
        @NotNull(message = "User ID must not be null")
        BigInteger userID,

        @NotNull(message = "Order ID must not be null")
        BigInteger orderID,

        @NotNull(message = "Product ID must not be null")
        BigInteger productID,

        @NotNull(message = "Rate amount must not be null")
        @Range(min = 1, max = 5, message = "Rate amount must be between 1 and 5")
        Integer rateAmount,

        @NotNull(message = "Comment must not be null")
        String comment
) {
}
