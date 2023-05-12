package com.ecommerce.backend.orderdetail;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.math.BigInteger;

public record OrderDetailAddRequest(
        @NotNull(message = "Order ID must not be null")
        BigInteger orderID,

        @NotNull(message = "Product ID must not be null")
        BigInteger productID,

        @NotNull(message = "Purchase price must not be null")
        @Min(value = 0, message = "Purchase price must be greater than or equal to 0")
        BigInteger purchasePrice,

        @NotNull(message = "Quantity must not be null")
        @Min(value = 1, message = "Quantity must be greater than or equal to 1")
        Integer quantity
) {
}
