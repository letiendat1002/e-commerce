package com.ecommerce.backend.user;

import com.ecommerce.backend.user.enums.Gender;

import java.math.BigInteger;
import java.util.List;

public record UserDTO(
        BigInteger userID,
        String email,
        List<String> roles,
        String fullName,
        Gender gender,
        String phone,
        String image,
        Boolean locked,
        Boolean enabled
) {
}