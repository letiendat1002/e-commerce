package com.ecommerce.backend.order;

import com.ecommerce.backend.order.enums.OrderPaymentType;
import jakarta.validation.constraints.NotNull;

import java.math.BigInteger;

public record OrderAddRequest(
        @NotNull(message = "User ID must not be null")
        BigInteger userID,

        @NotNull(message = "Total must not be null")
        BigInteger total,

        @NotNull(message = "Payment type must not be null")
        OrderPaymentType paymentType,

        @NotNull(message = "Address must not be null")
        String address
) {
}
