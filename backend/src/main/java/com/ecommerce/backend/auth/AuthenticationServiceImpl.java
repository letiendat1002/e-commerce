package com.ecommerce.backend.auth;

import com.ecommerce.backend.shared.enums.MessageStatus;
import com.ecommerce.backend.shared.response.BaseResponse;
import com.ecommerce.backend.shared.security.jwt.JwtService;
import com.ecommerce.backend.user.UserRegistrationRequest;
import com.ecommerce.backend.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.Collections;

@RequiredArgsConstructor
@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserService userService;

    @Override
    public BaseResponse register(UserRegistrationRequest request) {
        userService.addUser(request);

        return new BaseResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL
        );
    }

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        var userDTO = userService.fetchUserByEmail(request.email());
        var token = jwtService.generateToken(userDTO.email());

        return new AuthenticationResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                token,
                Collections.singletonList(userDTO)
        );
    }
}
