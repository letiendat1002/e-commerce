package com.ecommerce.backend.auth;

public record AuthenticationRequest(
        String email,
        String password
) {
}
