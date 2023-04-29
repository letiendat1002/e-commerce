package com.ecommerce.backend.auth;

import com.ecommerce.backend.user.UserRegistrationRequest;

public interface AuthenticationService {
    String register(UserRegistrationRequest request);

    String authenticate(AuthenticationRequest request);
}
