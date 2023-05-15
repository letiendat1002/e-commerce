package com.ecommerce.backend.useraddress;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigInteger;

public record UserAddressAddRequest(
        @NotNull(message = "User ID must not be null")
        BigInteger userID,

        @NotBlank(message = "Address must not be blank")
        String address
) {
}
