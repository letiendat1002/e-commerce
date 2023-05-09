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
import com.ecommerce.backend.user.UserRegistrationRequest;
import com.ecommerce.backend.user.UserService;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.mail.MailException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Collections;
import java.util.Date;
import java.util.stream.Collectors;

import static java.time.temporal.ChronoUnit.DAYS;
import static java.time.temporal.ChronoUnit.MINUTES;


@RequiredArgsConstructor
@Service
public class AuthenticationServiceImpl implements AuthenticationService {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserService userService;
    private final EmailSenderService emailSenderService;
    private final VariableConstants variableConstants;

    @Override
    @Transactional
    public void register(UserRegistrationRequest request) {
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

        sendEmail(
                userDTO.email(),
                EmailTemplate.REGISTRATION_SUBJECT,
                EmailTemplate.getRegistrationMessage(
                        userDTO.fullName(),
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

    @Override
    public String activate(String token) {
        var username = jwtService.extractUsername(token);
        var user = userService.fetchUserByEmail(username);
        if (!user.enabled()) {
            userService.enableUser(username);
            return "User activated successfully. You can close this tab";
        }
        return "User already activated. You can close this tab";
    }

    @Override
    @Transactional
    public void resetPassword(String email) {
        var randomPassword = generateRandomPassword();

        var userDTO = userService.updateUserPassword(
                email,
                randomPassword
        );

        sendEmail(
                email,
                EmailTemplate.RESET_PASSWORD_SUBJECT,
                EmailTemplate.getResetPasswordMessage(
                        userDTO.fullName(),
                        randomPassword
                )
        );
    }

    private String generateRandomPassword() {
        var upperCaseLetters = RandomStringUtils.random(4, 65, 90, true, true);
        var lowerCaseLetters = RandomStringUtils.random(4, 97, 122, true, true);
        var numbers = RandomStringUtils.randomNumeric(4);
        var totalChars = RandomStringUtils.randomAlphanumeric(4);
        var combinedChars = upperCaseLetters
                .concat(lowerCaseLetters)
                .concat(numbers)
                .concat(totalChars);
        var pwdChars = combinedChars.chars()
                .mapToObj(c -> (char) c)
                .collect(Collectors.toList());
        Collections.shuffle(pwdChars);
        return pwdChars
                .stream()
                .collect(
                        StringBuilder::new,
                        StringBuilder::append,
                        StringBuilder::append
                )
                .toString();
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
