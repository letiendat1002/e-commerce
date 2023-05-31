package com.ecommerce.backend.order;

import com.ecommerce.backend.order.enums.OrderPaymentType;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigInteger;

public record OrderAddRequest(
        @NotNull(message = "User ID must not be null")
        BigInteger userID,

        @NotNull(message = "Additional price must not be null")
        @Min(value = 0, message = "Additional price must be greater than or equal to 0")
        BigInteger additionalPrice,

        @NotNull(message = "Payment type must not be null")
        OrderPaymentType paymentType,

        @NotBlank(message = "Address must not be blank")
        String address
) {
}
