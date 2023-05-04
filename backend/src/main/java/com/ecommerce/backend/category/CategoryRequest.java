package com.ecommerce.backend.category;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CategoryRequest(
        @NotBlank(message = "Name must not be blank")
        String name,

        @NotBlank(message = "Slug must not be blank")
        String slug,

        @NotNull(message = "Image must not be null")
        String image
) {
}
