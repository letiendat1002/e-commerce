package com.ecommerce.backend.shared.email;

public record CustomEmail(
        String email,
        String subject,
        String message
) {
}
