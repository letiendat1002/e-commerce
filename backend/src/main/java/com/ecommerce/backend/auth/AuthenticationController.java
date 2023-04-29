package com.ecommerce.backend.auth;

import com.ecommerce.backend.shared.enums.MessageStatus;
import com.ecommerce.backend.shared.exception.RequestValidationException;
import com.ecommerce.backend.user.UserRegistrationRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public AuthenticationResponse register(
            @Validated @RequestBody UserRegistrationRequest request,
            BindingResult errors
    ) {
        if (errors.hasErrors()) {
            throw new RequestValidationException(errors);
        }

        var data = authenticationService.register(request);

        return new AuthenticationResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                data
        );
    }

    @PostMapping("/authenticate")
    public AuthenticationResponse authenticate(
            @Validated @RequestBody AuthenticationRequest request,
            BindingResult errors
    ) {
        if (errors.hasErrors()) {
            throw new RequestValidationException(errors);
        }

        var data = authenticationService.authenticate(request);

        return new AuthenticationResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                data
        );
    }
}
