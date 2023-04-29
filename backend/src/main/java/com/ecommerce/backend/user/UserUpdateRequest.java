package com.ecommerce.backend.user;

import com.ecommerce.backend.user.enums.Gender;
import com.ecommerce.backend.user.enums.UserRole;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record UserUpdateRequest(
        @NotNull
        List<UserRole> roles,
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
