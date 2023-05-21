package com.ecommerce.backend.useraddress;

import jakarta.validation.constraints.NotBlank;

public record UserAddressUpdateRequest(
        @NotBlank(message = "Address must not be blank")
        String address
) {
}
