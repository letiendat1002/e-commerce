package com.ecommerce.backend.product;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Range;

import java.math.BigInteger;

public record ProductRequest(
        @NotNull(message = "Category ID must not be null")
        BigInteger categoryID,

        @NotBlank(message = "Name must not be blank")
        String name,

        @NotBlank(message = "Slug must not be blank")
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
        @Min(value = 0, message = "Unit price must be greater than or equal to 0")
        BigInteger unitPrice,

        @Range(min = 0, max = 100, message = "Discount must be between 0 and 100")
        Integer discount,

        @NotNull(message = "Quantity must not be null")
        @Min(value = 0, message = "Quantity must be greater than or equal to 0")
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
