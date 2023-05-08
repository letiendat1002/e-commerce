package com.ecommerce.backend.auth;

import com.ecommerce.backend.user.UserRegistrationRequest;

public interface AuthenticationService {
    void register(UserRegistrationRequest request);

    AuthenticationAuthenticateResponse authenticate(AuthenticationRequest request);

    String activate(String token);
}
