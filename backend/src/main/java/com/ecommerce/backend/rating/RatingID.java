package com.ecommerce.backend.rating;

import lombok.*;

import java.io.Serializable;
import java.math.BigInteger;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class RatingID implements Serializable {
    private BigInteger userID;
    private BigInteger orderID;
    private BigInteger productID;
}
