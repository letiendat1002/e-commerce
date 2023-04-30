package com.ecommerce.backend.category;

import jakarta.validation.constraints.NotNull;

public record CategoryRequest(
        @NotNull(message = "Name must not be null")
        String name,

        @NotNull(message = "Slug must not be null")
        String slug,

        @NotNull(message = "Image must not be null")
        String image
) {
}
