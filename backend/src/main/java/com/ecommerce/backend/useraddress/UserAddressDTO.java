package com.ecommerce.backend.useraddress;

import java.math.BigInteger;

public record UserAddressDTO(
        BigInteger userAddressID,
        BigInteger userID,
        String address
) {
}