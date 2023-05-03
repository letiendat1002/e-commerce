package com.ecommerce.backend.orderdetail;

import jakarta.validation.constraints.NotNull;

import java.math.BigInteger;

public record OrderDetailRequest(
        @NotNull(message = "Order ID must not be null")
        BigInteger orderID,

        @NotNull(message = "Product ID must not be null")
        BigInteger productID,

        @NotNull(message = "Purchase price must not be null")
        BigInteger purchasePrice,

        @NotNull(message = "Quantity must not be null")
        Integer quantity
) {
}
