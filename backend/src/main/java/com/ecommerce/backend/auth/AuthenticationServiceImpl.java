package com.ecommerce.backend.auth;

import com.ecommerce.backend.shared.constants.VariableConstants;
import com.ecommerce.backend.shared.email.CustomEmail;
import com.ecommerce.backend.shared.email.EmailSenderService;
import com.ecommerce.backend.shared.email.EmailTemplate;
import com.ecommerce.backend.shared.enums.MessageStatus;
import com.ecommerce.backend.shared.exception.DuplicateResourceException;
import com.ecommerce.backend.shared.exception.FailedOperationException;
import com.ecommerce.backend.shared.exception.JwtAuthenticationException;
import com.ecommerce.backend.shared.security.jwt.JwtService;
import com.ecommerce.backend.shared.util.PasswordGenerator;
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
    @Transactional
    public void register(UserRegistrationRequest request) {
        var user = userService.addUser(request);

        var token = jwtService.generateToken(
                user.getEmail(),
                Date.from(
                        Instant.now().plus(15, MINUTES)
                )
        );

        var registrationUrl = EmailTemplate.createRegistrationUrl(
                variableConstants.getUrl(),
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
            return "User already activated. You can close this tab";
        }
        userService.enableUser(username);
        return "User activated successfully. You can close this tab";
    }

    @Override
    @Transactional
    public void resetPassword(String email) {
        var randomPassword = passwordGenerator.generateRandomPassword();

        var userDTO = userService.updateUserPassword(
                email,
                randomPassword
        );

        sendEmail(
                email,
                EmailTemplate.RESET_PASSWORD_SUBJECT,
                EmailTemplate.getResetPasswordMessage(
                        userDTO.getFullName(),
                        randomPassword
                )
        );
    }

    @Override
    public void changePassword(AuthenticationChangePasswordRequest request) {
        var username = jwtService.extractUsername(request.token());
        if (!request.email().equals(username)) {
            throw new JwtAuthenticationException(
                    "JWT token is not belonging to the user"
            );
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.oldPassword()
                )
        );

        if (request.oldPassword().equals(request.newPassword())) {
            throw new DuplicateResourceException(
                    "New password cannot be same as old password"
            );
        }

        userService.updateUserPassword(request.email(), request.newPassword());
    }
}
