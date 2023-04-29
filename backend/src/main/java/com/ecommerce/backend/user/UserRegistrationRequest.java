package com.ecommerce.backend.user;

import com.ecommerce.backend.user.enums.Gender;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UserRegistrationRequest(
        @NotBlank
        @Email(
                message = "Email is not valid",
                regexp = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$"
        )
        String email,
        @NotBlank
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
