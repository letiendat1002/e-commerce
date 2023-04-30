package com.ecommerce.backend.useraddress;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigInteger;

public record UserAddressRequest(
        @NotNull(message = "User ID must not be null")
        BigInteger userID,
        @NotNull(message = "Address must not be null")
        String address
) {
}
