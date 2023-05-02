package com.ecommerce.backend.product;

import jakarta.validation.constraints.NotNull;

import java.math.BigInteger;

public record ProductRequest(
        @NotNull(message = "Category ID must not be null")
        BigInteger categoryID,

        @NotNull(message = "Name must not be null")
        String name,

        @NotNull(message = "Slug must not be null")
        String slug,

        @NotNull(message = "Image must not be null")
        String image,

        @NotNull(message = "Image review 1 must not be null")
        String imageReview1,

        @NotNull(message = "Image review 2 must not be null")
        String imageReview2,

        @NotNull(message = "Image review 3 must not be null")
        String imageReview3,

        @NotNull(message = "Unit price must not be null")
        BigInteger unitPrice,

        @NotNull(message = "Quantity must not be null")
        Long quantity,

        @NotNull(message = "Description must not be null")
        String description,

        @NotNull(message = "Year release must not be null")
        Integer yearRelease,

        @NotNull(message = "Manufacturer must not be null")
        String manufacturer,

        @NotNull(message = "Monitor must not be null")
        String monitor,

        @NotNull(message = "CPU must not be null")
        String cpu,

        @NotNull(message = "RAM must not be null")
        String ram,

        @NotNull(message = "VGA must not be null")
        String vga,

        @NotNull(message = "Hard disk must not be null")
        String hardDisk,

        @NotNull(message = "Camera must not be null")
        String camera,

        @NotNull(message = "Battery must not be null")
        String battery,

        @NotNull(message = "Memory must not be null")
        String memory,

        @NotNull(message = "Demand must not be null")
        String demand,

        @NotNull(message = "Status must not be null")
        Boolean status
) {
}