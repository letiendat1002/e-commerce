package com.ecommerce.backend.order;

import com.ecommerce.backend.order.enums.OrderPaymentType;
import com.ecommerce.backend.order.enums.OrderStatus;
import com.ecommerce.backend.orderdetail.OrderDetail;

import java.math.BigInteger;
import java.time.LocalDate;
import java.util.List;

public record OrderDTO(
        BigInteger orderID,
        BigInteger userID,
        BigInteger additionalPrice,
        OrderPaymentType paymentType,
        OrderStatus status,
        LocalDate dateOrder,
        String address
) {
}
