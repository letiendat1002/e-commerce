package com.ecommerce.backend.order;

import com.ecommerce.backend.order.enums.OrderPaymentType;
import com.ecommerce.backend.order.enums.OrderStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record OrderUpdateRequest(
        @NotNull(message = "Payment type must not be null")
        OrderPaymentType paymentType,

        @NotNull(message = "Status must not be null")
        OrderStatus status,

        @NotBlank(message = "Address must not be blank")
        String address
) {
}
