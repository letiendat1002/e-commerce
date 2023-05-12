package com.ecommerce.backend.orderdetail;

import com.ecommerce.backend.orderdetail.enums.OrderDetailStatus;

import java.math.BigInteger;

public record OrderDetailDTO(
        BigInteger orderID,
        BigInteger productID,
        BigInteger purchasePrice,
        Integer quantity,
        OrderDetailStatus status
) {
}
