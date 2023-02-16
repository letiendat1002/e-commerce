package com.ecommerce.backend.user;

import com.ecommerce.backend.user.enums.Gender;
import com.ecommerce.backend.util.security.enums.UserRole;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record UserUpdateRequest(
        @NotNull(message = "Roles must not be null")
        List<UserRole> roles,

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
