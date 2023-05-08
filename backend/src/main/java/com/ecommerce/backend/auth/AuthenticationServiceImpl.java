package com.ecommerce.backend.auth;

import com.ecommerce.backend.shared.constants.VariableConstants;
import com.ecommerce.backend.shared.email.CustomEmail;
import com.ecommerce.backend.shared.email.EmailSenderService;
import com.ecommerce.backend.shared.email.EmailTemplate;
import com.ecommerce.backend.shared.enums.MessageStatus;
import com.ecommerce.backend.shared.exception.FailedOperationException;
import com.ecommerce.backend.shared.response.BaseResponse;
import com.ecommerce.backend.shared.security.jwt.JwtService;
import com.ecommerce.backend.user.UserRegistrationRequest;
import com.ecommerce.backend.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.mail.MailException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Collections;
import java.util.Date;

import static java.time.temporal.ChronoUnit.DAYS;
import static java.time.temporal.ChronoUnit.MINUTES;


@RequiredArgsConstructor
@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserService userService;
    private final EmailSenderService notificationService;
    private final VariableConstants variableConstants;

    @Override
    public BaseResponse register(UserRegistrationRequest request) {
        var userDTO = userService.addUser(request);

        var token = jwtService.generateToken(
                userDTO.email(),
                Date.from(
                        Instant.now().plus(15, MINUTES)
                )
        );

        var registrationUrl = EmailTemplate.createRegistrationUrl(
                variableConstants.getUrl(),
                token
        );

        try {
            notificationService.sendEmail(
                    new CustomEmail(
                            userDTO.email(),
                            EmailTemplate.REGISTRATION_SUBJECT,
                            EmailTemplate.getRegistrationMessage(
                                    userDTO.fullName(),
                                    registrationUrl
                            )
                    )
            );
        } catch (MailException e) {
            throw new FailedOperationException(
                    "Failed to send email to user"
            );
        }

        return new AuthenticationRegisterResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                registrationUrl
        );
    }

    @Override
    public AuthenticationAuthenticateResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        var userDTO = userService.fetchUserByEmail(request.email());
        var token = jwtService.generateToken(
                userDTO.email(),
                Date.from(
                        Instant.now().plus(1, DAYS)
                )
        );

        return new AuthenticationAuthenticateResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                token,
                Collections.singletonList(userDTO)
        );
    }
}
