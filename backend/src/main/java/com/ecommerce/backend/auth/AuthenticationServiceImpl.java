package com.ecommerce.backend.auth;

import com.ecommerce.backend.shared.security.jwt.JwtService;
import com.ecommerce.backend.user.UserDAO;
import com.ecommerce.backend.user.UserRegistrationRequest;
import com.ecommerce.backend.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthenticationServiceImpl implements AuthenticationService{
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserService userService;

    @Override
    public String register(UserRegistrationRequest request) {
        var userDTO = userService.addUser(request);

        return jwtService.generateToken(userDTO.email());
    }

    @Override
    public String authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        var userDTO = userService.fetchUserByEmail(request.email());

        return jwtService.generateToken(userDTO.email());
    }
}
