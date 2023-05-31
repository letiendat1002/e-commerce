package com.ecommerce.backend.order;

import com.ecommerce.backend.order.enums.OrderPaymentType;
import com.ecommerce.backend.order.enums.OrderStatus;

import java.math.BigInteger;
import java.time.LocalDate;

public record OrderDTO(
        BigInteger orderID,
        BigInteger userID,
        BigInteger additionalPrice,
        OrderPaymentType paymentType,
        OrderStatus status,
        LocalDate dateOrder,
        String address,
        boolean isPreparing,
        LocalDate datePreparing,
        boolean isShipping,
        LocalDate dateShipping,
        boolean isCompleted,
        LocalDate dateCompleted,
        BigInteger workerID
) {
}
