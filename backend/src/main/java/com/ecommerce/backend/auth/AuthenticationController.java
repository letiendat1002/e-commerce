package com.ecommerce.backend.auth;

import com.ecommerce.backend.user.UserRegistrationRequest;
import com.ecommerce.backend.util.enums.MessageStatus;
import com.ecommerce.backend.util.exception.RequestValidationException;
import com.ecommerce.backend.util.response.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
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
    public AuthenticationActivateResponse activate(
            @RequestParam("token") String token
    ) {
        var message = authenticationService.activate(token);

        return new AuthenticationActivateResponse(
                HttpStatus.OK.value(),
                message
        );
    }

    @PostMapping("/resetPassword")
    public BaseResponse resetPassword(
            @RequestParam("email") String email
    ) {
        authenticationService.resetPassword(email);

        return new BaseResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL
        );
    }

    @PutMapping("/changePassword")
    @PreAuthorize("hasAuthority('auth:change_password')")
    public BaseResponse changePassword(
            @Validated @RequestBody AuthenticationChangePasswordRequest request,
            BindingResult errors
    ) {
        if (errors.hasErrors()) {
            throw new RequestValidationException(errors);
        }

        authenticationService.changePassword(request);

        return new BaseResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL
        );
    }

    @GetMapping("/resend/email-verification")
    public BaseResponse resendEmailVerification(
            @RequestParam("email") String email
    ) {
        authenticationService.sendEmailVerification(email);

        return new BaseResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL
        );
    }
}
