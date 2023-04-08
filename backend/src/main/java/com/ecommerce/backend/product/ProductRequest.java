package com.ecommerce.backend.product;

import java.math.BigInteger;

public record ProductRequest(
        BigInteger CategoryID,
        String Name,
        String Slug,
        String Image,
        BigInteger UnitPrice,
        Long Quantity,
        String Description,
        Boolean Status,
        String YearRelease,
        String Manufacturer,
        String Monitor,
        String CPU,
        String RAM,
        String VGA,
        String HardDisk,
        String Camera,
        String Battery
) {
}
