package com.ecommerce.backend.auth;

import com.ecommerce.backend.auth.enums.ActivateStatus;
import com.ecommerce.backend.util.constants.VariableConstants;
import com.ecommerce.backend.util.email.CustomEmail;
import com.ecommerce.backend.util.email.EmailSenderService;
import com.ecommerce.backend.util.email.EmailTemplate;
import com.ecommerce.backend.util.enums.MessageStatus;
import com.ecommerce.backend.util.exception.DuplicateResourceException;
import com.ecommerce.backend.util.exception.FailedOperationException;
import com.ecommerce.backend.util.exception.JwtAuthenticationException;
import com.ecommerce.backend.util.security.jwt.JwtService;
import com.ecommerce.backend.util.security.PasswordGenerator;
import com.ecommerce.backend.user.UserDTOMapper;
import com.ecommerce.backend.user.UserRegistrationRequest;
import com.ecommerce.backend.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.mail.MailException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    private final UserDTOMapper userDTOMapper;
    private final PasswordGenerator passwordGenerator;
    private final EmailSenderService emailSenderService;
    private final VariableConstants variableConstants;

    @Override
    public void register(UserRegistrationRequest request) {
        var user = userService.addUser(request);

        var token = jwtService.generateToken(
                user.getEmail(),
                Date.from(
                        Instant.now().plus(15, MINUTES)
                )
        );

        var registrationUrl = EmailTemplate.createRegistrationUrl(
                variableConstants.getAPI_URL(),
                token
        );

        sendEmail(
                user.getEmail(),
                EmailTemplate.REGISTRATION_SUBJECT,
                EmailTemplate.getRegistrationMessage(
                        user.getFullName(),
                        registrationUrl
                )
        );
    }

    private void sendEmail(String email, String subject, String message) {
        try {
            emailSenderService.sendEmail(
                    new CustomEmail(
                            email,
                            subject,
                            message
                    )
            );
        } catch (MailException e) {
            throw new FailedOperationException(
                    "Failed to send email to user"
            );
        }
    }

    @Override
    public AuthenticationAuthenticateResponse authenticate(
            AuthenticationRequest request
    ) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        var user = userService.fetchUserByEmail(request.email());
        var token = jwtService.generateToken(
                user.getEmail(),
                Date.from(
                        Instant.now().plus(1, DAYS)
                )
        );

        return new AuthenticationAuthenticateResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                token,
                Collections.singletonList(
                        userDTOMapper.apply(user)
                )
        );
    }

    @Override
    public String activate(String token) {
        var username = jwtService.extractUsername(token);
        var user = userService.fetchUserByEmail(username);
        if (!user.isEnabled()) {
            return ActivateStatus.ALREADY_ACTIVATED.message();
        }
        userService.enableUser(username);
        return ActivateStatus.ACTIVATED.message();
    }

    @Override
    @Transactional
    public void resetPassword(String email) {
        var randomPassword = passwordGenerator.generateRandomPassword();

        var user = userService.updateUserPassword(
                email,
                randomPassword
        );

        sendEmail(
                email,
                EmailTemplate.RESET_PASSWORD_SUBJECT,
                EmailTemplate.getResetPasswordMessage(
                        user.getFullName(),
                        randomPassword
                )
        );
    }

    @Override
    public void changePassword(AuthenticationChangePasswordRequest request) {
        if (request.oldPassword().equals(request.newPassword())) {
            throw new DuplicateResourceException(
                    "New password cannot be same as old password"
            );
        }

        var username = jwtService.extractUsername(request.token());
        if (!request.email().equals(username)) {
            throw new JwtAuthenticationException(
                    "JWT token is not belonging to the user"
            );
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        username,
                        request.oldPassword()
                )
        );

        userService.updateUserPassword(username, request.newPassword());
    }
}
