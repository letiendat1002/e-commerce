package com.ecommerce.backend.user;

import jakarta.validation.constraints.NotNull;

public record UserUpdateRequest (
        @NotNull
        String email,
        @NotNull
        String fullName,
        @NotNull
        Gender gender,
        @NotNull
        String phone,
        @NotNull
        String image
){
}
