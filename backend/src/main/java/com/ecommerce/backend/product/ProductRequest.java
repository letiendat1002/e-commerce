package com.ecommerce.backend.product;

import java.math.BigInteger;

public record ProductRequest(
        BigInteger CategoryID,
        String Name,
        String Slug,
        String Image,
        String ImageReview1,
        String ImageReview2,
        String ImageReview3,
        BigInteger UnitPrice,
        Long Quantity,
        String Description,
        String YearRelease,
        String Manufacturer,
        String Monitor,
        String CPU,
        String RAM,
        String VGA,
        String HardDisk,
        String Camera,
        String Battery,
        Boolean Status
) {
}
