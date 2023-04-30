package com.ecommerce.backend.category;

import jakarta.validation.constraints.NotNull;

public record CategoryRequest(
        @NotNull
        String name,

        @NotNull
        String slug,

        @NotNull
        String image
) {
}
