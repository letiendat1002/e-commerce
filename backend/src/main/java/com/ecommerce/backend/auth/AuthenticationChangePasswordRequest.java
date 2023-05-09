package com.ecommerce.backend.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record AuthenticationChangePasswordRequest(
        @Email(
                message = "Email is not valid",
                regexp = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$"
        )
        String email,

        @NotBlank(message = "Token must not be blank")
        String token,

        @NotBlank(message = "Old password must not be blank")
        String oldPassword,

        @NotBlank(message = "New password must not be blank")
        String newPassword
) {
}
