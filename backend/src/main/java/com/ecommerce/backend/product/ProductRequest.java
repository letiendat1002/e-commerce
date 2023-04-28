package com.ecommerce.backend.product;

import jakarta.validation.constraints.NotNull;

import java.math.BigInteger;

public record ProductRequest(
        BigInteger categoryID,

        @NotNull
        String name,

        @NotNull
        String slug,

        @NotNull
        String image,

        @NotNull
        String imageReview1,

        @NotNull
        String imageReview2,

        @NotNull
        String imageReview3,

        @NotNull
        BigInteger unitPrice,

        @NotNull
        Long quantity,

        @NotNull
        String description,

        @NotNull
        String yearRelease,

        @NotNull
        String manufacturer,

        @NotNull
        String monitor,

        @NotNull
        String cpu,

        @NotNull
        String ram,

        @NotNull
        String vga,

        @NotNull
        String hardDisk,

        @NotNull
        String camera,

        @NotNull
        String battery,

        @NotNull
        String memory,

        @NotNull
        String demand,

        @NotNull
        Boolean status
) {
}
