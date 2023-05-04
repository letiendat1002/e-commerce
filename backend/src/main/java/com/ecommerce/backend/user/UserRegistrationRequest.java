package com.ecommerce.backend.user;

import com.ecommerce.backend.user.enums.Gender;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UserRegistrationRequest(
        @Email(
                message = "Email is not valid",
                regexp = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$"
        )
        String email,

        @NotBlank(message = "Password must not be blank")
        String password,

        @NotBlank(message = "Full name must not be blank")
        String fullName,

        @NotNull(message = "Gender must not be null")
        Gender gender,

        @NotBlank(message = "Phone number must not be blank")
        String phone,

        @NotNull(message = "Image must not be null")
        String image
) {
}
