package com.ecommerce.backend.user;

import com.ecommerce.backend.shared.enums.Gender;
import jakarta.validation.constraints.NotNull;

public record UserRegistrationRequest(
        @NotNull
        String email,
        @NotNull
        String password,
        @NotNull
        String fullName,
        Gender gender,
        String phone,
        String image
) {
}
