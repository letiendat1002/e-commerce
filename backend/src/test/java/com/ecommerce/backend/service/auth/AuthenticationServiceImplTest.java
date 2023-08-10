package com.ecommerce.backend.service.auth;

import com.ecommerce.backend.auth.AuthenticationAuthenticateResponse;
import com.ecommerce.backend.auth.AuthenticationChangePasswordRequest;
import com.ecommerce.backend.auth.AuthenticationRequest;
import com.ecommerce.backend.auth.AuthenticationServiceImpl;
import com.ecommerce.backend.auth.enums.ActivateStatus;
import com.ecommerce.backend.util.constants.VariableConstants;
import com.ecommerce.backend.util.email.CustomEmail;
import com.ecommerce.backend.util.email.EmailSenderService;
import com.ecommerce.backend.util.enums.MessageStatus;
import com.ecommerce.backend.util.exception.DuplicateResourceException;
import com.ecommerce.backend.util.exception.FailedOperationException;
import com.ecommerce.backend.util.exception.JwtAuthenticationException;
import com.ecommerce.backend.util.security.jwt.JwtService;
import com.ecommerce.backend.util.security.PasswordGenerator;
import com.ecommerce.backend.user.User;
import com.ecommerce.backend.user.UserDTOMapper;
import com.ecommerce.backend.user.UserRegistrationRequest;
import com.ecommerce.backend.user.UserService;
import com.ecommerce.backend.user.enums.Gender;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.mail.MailSendException;
import org.springframework.security.authentication.*;

import java.math.BigInteger;
import java.util.Collections;
import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthenticationServiceImplTest {
    private AuthenticationServiceImpl authenticationService;
    @Mock
    private AuthenticationManager authenticationManager;
    @Mock
    private JwtService jwtService;
    @Mock
    private UserService userService;
    @Mock
    private UserDTOMapper userDTOMapper;
    @Mock
    private PasswordGenerator passwordGenerator;
    @Mock
    private EmailSenderService emailSenderService;
    @Mock
    private VariableConstants variableConstants;

    @BeforeEach
    void setUp() {
        authenticationService = new AuthenticationServiceImpl(
                authenticationManager,
                jwtService,
                userService,
                userDTOMapper,
                passwordGenerator,
                emailSenderService,
                variableConstants
        );
    }

    @Test
    void register() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new UserRegistrationRequest(
                "test@example.com",
                "test",
                "",
                Gender.OTHER,
                "",
                ""
        );

        var user = new User();
        user.setUserID(id);
        user.setEmail(request.email());

        var expire = new Date();
        var token = "example token";

        // When
        when(userService.addUser(request)).thenReturn(user);
        when(jwtService.generateToken(user.getEmail(), expire))
                .thenReturn(token);

        var generatedToken = jwtService.generateToken(user.getEmail(), expire);
        authenticationService.register(request);

        // Then
        verify(userService).addUser(request);
        verify(jwtService).generateToken(request.email(), expire);
        verify(emailSenderService).sendEmail(any(CustomEmail.class));
        assertThat(generatedToken).isEqualTo(token);
    }

    @Test
    void whenRegister_butSendEmailFailed_thenThrowException() {
        // Given
        var request = new UserRegistrationRequest(
                "test@example.com",
                "test",
                "",
                Gender.OTHER,
                "",
                ""
        );

        var user = new User();

        // When
        doThrow(new MailSendException("Test message"))
                .when(emailSenderService).sendEmail(any());

        // Then
        assertThatThrownBy(() -> emailSenderService
                .sendEmail(any(CustomEmail.class)))
                .isInstanceOf(MailSendException.class);

        assertThatThrownBy(() -> {
            when(userService.addUser(request)).thenReturn(user);
            authenticationService.register(request);
        }).isInstanceOf(FailedOperationException.class);
    }

    @Test
    void authenticate() {
        // Given
        var request = new AuthenticationRequest(
                "test@example.com",
                "testPassword"
        );

        var user = new User();
        user.setEmail(request.email());
        var expire = new Date();
        var token = "example token";

        // When
        when(userService.fetchUserByEmail(user.getEmail())).thenReturn(user);
        when(jwtService.generateToken(user.getEmail(), expire))
                .thenReturn(token);
        var generatedToken = jwtService.generateToken(user.getEmail(), expire);

        var expected = new AuthenticationAuthenticateResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                null,
                Collections.singletonList(
                        userDTOMapper.apply(user)
                )
        );
        var actual = authenticationService.authenticate(request);

        // Then
        verify(userService).fetchUserByEmail(user.getEmail());
        verify(jwtService).generateToken(user.getEmail(), expire);
        verify(authenticationManager)
                .authenticate(any(UsernamePasswordAuthenticationToken.class));
        assertThat(generatedToken).isEqualTo(token);
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void whenAuthenticate_butBadCredentials_thenThrowException() {
        // When
        when(authenticationManager.authenticate(any()))
                .thenThrow(BadCredentialsException.class);

        // Then
        assertThatThrownBy(() -> authenticationManager
                .authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .isInstanceOf(BadCredentialsException.class);
    }

    @Test
    void whenAuthenticate_butAccountIsDisabled_thenThrowException() {
        // When
        when(authenticationManager.authenticate(any()))
                .thenThrow(DisabledException.class);

        // Then
        assertThatThrownBy(() -> authenticationManager
                .authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .isInstanceOf(DisabledException.class);
    }

    @Test
    void whenAuthenticate_butAccountIsLocked_thenThrowException() {
        // When
        when(authenticationManager.authenticate(any()))
                .thenThrow(LockedException.class);

        // Then
        assertThatThrownBy(() -> authenticationManager
                .authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .isInstanceOf(LockedException.class);
    }

    @Test
    void activate() {
        // Given
        var token = "example token";
        var username = "test@example.com";
        var user = new User();

        // When
        when(jwtService.extractUsername(token)).thenReturn(username);
        when(userService.fetchUserByEmail(username)).thenReturn(user);
        var result = authenticationService.activate(token);

        // Then
        verify(jwtService).extractUsername(token);
        verify(userService).fetchUserByEmail(username);
        assertThat(result).isEqualTo(ActivateStatus.ACTIVATED.message());
    }

    @Test
    void whenActivate_butAlreadyActivated() {
        // TODO: Handle user activation
    }

    @Test
    void resetPassword() {
        // Given
        var randomPassword = "random-password";
        var email = "test@example.com";
        var user = new User();

        // When
        when(passwordGenerator.generateRandomPassword())
                .thenReturn(randomPassword);
        when(userService.updateUserPassword(email, randomPassword))
                .thenReturn(user);
        authenticationService.resetPassword(email);

        // Then
        verify(passwordGenerator).generateRandomPassword();
        verify(userService).updateUserPassword(email, randomPassword);
        verify(emailSenderService).sendEmail(any(CustomEmail.class));
    }

    @Test
    void changePassword() {
        // Given
        var email = "test@example.com";
        var token = "example token";
        var oldPassword = "old-password";
        var newPassword = "new-password";
        var request = new AuthenticationChangePasswordRequest(
                email, token, oldPassword, newPassword
        );

        // When
        when(jwtService.extractUsername(token)).thenReturn(email);

        authenticationService.changePassword(request);

        // Then
        verify(jwtService).extractUsername(token);
        verify(authenticationManager)
                .authenticate(any(UsernamePasswordAuthenticationToken.class));
        verify(userService).updateUserPassword(email, newPassword);
    }

    @Test
    void whenChangePassword_butTokenIsNotBelongToUser_thenThrowException() {
        // Given
        var email = "test@example.com";
        var tokenUsername = "realusername@example.com";
        var token = "example token";
        var oldPassword = "old-password";
        var newPassword = "new-password";
        var request = new AuthenticationChangePasswordRequest(
                email, token, oldPassword, newPassword
        );

        // When
        when(jwtService.extractUsername(token)).thenReturn(tokenUsername);

        // Then
        assertThatThrownBy(() -> authenticationService.changePassword(request))
                .isInstanceOf(JwtAuthenticationException.class);
        verify(jwtService).extractUsername(token);
        verify(authenticationManager, never()).authenticate(any());
        verify(userService, never()).updateUserPassword(email, newPassword);
    }

    @Test
    void whenChangePassword_butOldPasswordNotMatch_thenThrowException() {
        // Given
        var email = "test@example.com";
        var token = "example-token";
        var oldPassword = "old-password";
        var newPassword = "new-password";
        var request = new AuthenticationChangePasswordRequest(
                email, token, oldPassword, newPassword
        );


        // When
        when(jwtService.extractUsername(token)).thenReturn(email);
        when(authenticationManager.authenticate(any()))
                .thenThrow(BadCredentialsException.class);

        // Then
        assertThatThrownBy(() -> authenticationService.changePassword(request))
                .isInstanceOf(BadCredentialsException.class);
    }

    @Test
    void whenChangePassword_butNewPasswordIsSameAsOldPassword_thenThrowException() {
        // Given
        var email = "test@example.com";
        var token = "example token";
        var oldPassword = "same-password";
        var newPassword = "same-password";
        var request = new AuthenticationChangePasswordRequest(
                email, token, oldPassword, newPassword
        );

        // Then
        assertThatThrownBy(() -> authenticationService.changePassword(request))
                .isInstanceOf(DuplicateResourceException.class);
        verify(jwtService, never()).extractUsername(token);
        verify(authenticationManager, never()).authenticate(any());
        verify(userService, never())
                .updateUserPassword(request.email(), request.newPassword());
    }
}
