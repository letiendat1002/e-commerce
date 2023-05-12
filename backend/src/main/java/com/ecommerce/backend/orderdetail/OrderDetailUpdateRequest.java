package com.ecommerce.backend.orderdetail;

import com.ecommerce.backend.orderdetail.enums.OrderDetailStatus;
import jakarta.validation.constraints.NotNull;

import java.math.BigInteger;

public record OrderDetailUpdateRequest(
        @NotNull(message = "Order ID must not be null")
        BigInteger orderID,

        @NotNull(message = "Product ID must not be null")
        BigInteger productID,

        OrderDetailStatus status
) {
}
