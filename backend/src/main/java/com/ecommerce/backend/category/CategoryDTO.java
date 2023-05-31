package com.ecommerce.backend.category;

import java.math.BigInteger;

public record CategoryDTO(
        BigInteger categoryID,
        String name,
        String slug,
        String image
) {
}
