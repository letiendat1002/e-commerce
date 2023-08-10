package com.ecommerce.backend.util.email;

public record CustomEmail(
        String email,
        String subject,
        String message
) {
}
