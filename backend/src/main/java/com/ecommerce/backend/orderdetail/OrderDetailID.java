package com.ecommerce.backend.orderdetail;

import lombok.*;

import java.io.Serializable;
import java.math.BigInteger;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class OrderDetailID implements Serializable {
    private BigInteger orderID;
    private BigInteger productID;
}
