package com.ecommerce.backend.product;

import java.math.BigInteger;

public record ProductDTO(
        BigInteger productID,
        BigInteger categoryID,
        String name,
        String slug,
        String image,
        String imageReview1,
        String imageReview2,
        String imageReview3,
        BigInteger unitPrice,
        Integer discount,
        Long quantity,
        String description,
        Integer yearRelease,
        String manufacturer,
        String monitor,
        String cpu,
        String ram,
        String vga,
        String hardDisk,
        String camera,
        String battery,
        String memory,
        String demand,
        Boolean status
) {
}
