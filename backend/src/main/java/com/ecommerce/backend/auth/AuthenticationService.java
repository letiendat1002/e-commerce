package com.ecommerce.backend.auth;

import com.ecommerce.backend.shared.response.BaseResponse;
import com.ecommerce.backend.user.UserRegistrationRequest;

public interface AuthenticationService {
    BaseResponse register(UserRegistrationRequest request);

    AuthenticationAuthenticateResponse authenticate(AuthenticationRequest request);
}
