package com.ecommerce.backend.user;

import jakarta.validation.constraints.NotNull;

public record UserRegistrationRequest(
        @NotNull
        String email,
        @NotNull
        String password,
        @NotNull
        String fullName,
        @NotNull
        Gender gender,
        @NotNull
        String phone,
        @NotNull
        String image
) {
}
