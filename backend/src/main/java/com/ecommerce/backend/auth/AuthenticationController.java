package com.ecommerce.backend.auth;

import com.ecommerce.backend.shared.enums.MessageStatus;
import com.ecommerce.backend.shared.exception.RequestValidationException;
import com.ecommerce.backend.shared.response.BaseResponse;
import com.ecommerce.backend.user.UserRegistrationRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public BaseResponse register(
            @Validated @RequestBody UserRegistrationRequest request,
            BindingResult errors
    ) {
        if (errors.hasErrors()) {
            throw new RequestValidationException(errors);
        }

        authenticationService.register(request);

        return new BaseResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL
        );
    }

    @PostMapping("/authenticate")
    public AuthenticationAuthenticateResponse authenticate(
            @Validated @RequestBody AuthenticationRequest request,
            BindingResult errors
    ) {
        if (errors.hasErrors()) {
            throw new RequestValidationException(errors);
        }

        return authenticationService.authenticate(request);
    }

    @GetMapping("/activate")
    public ResponseEntity<String> activate(
            @RequestParam("token") String token
    ) {
        return ResponseEntity.ok(authenticationService.activate(token));
    }


}
