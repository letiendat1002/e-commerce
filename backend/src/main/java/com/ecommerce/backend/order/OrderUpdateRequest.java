package com.ecommerce.backend.order;

import com.ecommerce.backend.order.enums.OrderStatus;
import jakarta.validation.constraints.NotNull;

import java.math.BigInteger;

public record OrderUpdateRequest(
        @NotNull(message = "Status must not be null")
        OrderStatus status,

        @NotNull(message = "Worker ID must not be null")
        BigInteger workerID
) {
}
