package com.ecommerce.backend.useraddress;

import java.math.BigInteger;

/**
 * A DTO for the {@link UserAddress} entity
 */
public record UserAddressDTO(
        BigInteger userAddressID,
        BigInteger userUserID,
        String address
) {
}