package com.ecommerce.backend.user;

import com.ecommerce.backend.user.enums.Gender;
import com.ecommerce.backend.user.enums.UserRole;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record UserUpdateRequest(
        @NotNull(message = "Roles must not be null")
        List<UserRole> roles,
        @NotNull(message = "Full name must not be null")
        String fullName,
        @NotNull(message = "Gender must not be null")
        Gender gender,
        @NotNull(message = "Phone number must not be null")
        String phone,
        @NotNull(message = "Image must not be null")
        String image
) {
}
