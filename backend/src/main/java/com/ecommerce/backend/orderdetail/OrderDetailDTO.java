package com.ecommerce.backend.orderdetail;

import java.math.BigInteger;

public record OrderDetailDTO(
        BigInteger orderID,
        BigInteger productID,
        BigInteger purchasePrice,
        Integer quantity
) {
}
