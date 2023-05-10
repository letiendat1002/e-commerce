package com.ecommerce.backend.service;

import com.ecommerce.backend.order.OrderService;
import com.ecommerce.backend.shared.exception.DuplicateResourceException;
import com.ecommerce.backend.shared.exception.FailedOperationException;
import com.ecommerce.backend.shared.exception.ResourceNotFoundException;
import com.ecommerce.backend.user.*;
import com.ecommerce.backend.user.enums.Gender;
import com.ecommerce.backend.user.enums.UserRole;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigInteger;
import java.util.Collections;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {
    private final UserDTOMapper userDTOMapper = new UserDTOMapper();
    private UserServiceImpl userService;
    @Mock
    private UserDAO userDAO;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private OrderService orderService;

    @BeforeEach
    void setUp() {
        userService = new UserServiceImpl(userDAO, userDTOMapper, passwordEncoder, orderService);
    }

    @Test
    void fetchAllUsers() {
        // When
        userService.fetchAllUsers();

        // Then
        verify(userDAO).selectAllUsers();
    }

    @Test
    void fetchUserByUserID() {
        // Given
        var id = BigInteger.valueOf(1);
        var user = new User(
                id,
                "admin@linkking.com",
                "admin",
                "string",
                Gender.MALE,
                "",
                "",
                UserRole.ADMIN,
                true
        );

        // When
        when(userDAO.selectUserByID(id)).thenReturn(Optional.of(user));

        var expected = userDTOMapper.apply(user);
        var actual = userService.fetchUserByUserID(id);

        // Then
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void givenID_whenFetchUserByID_butReturnEmptyOptional_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);

        // When
        when(userDAO.selectUserByID(id)).thenReturn(Optional.empty());

        // Then
        assertThatThrownBy(() -> userService.fetchUserByUserID(id))
                .isInstanceOf(ResourceNotFoundException.class);
        verify(userDAO).selectUserByID(id);
    }

    @Test
    void fetchUserByEmail() {
        // Given
        var id = BigInteger.valueOf(1);
        var email = "admin@linkking.com";
        var user = new User(
                id,
                "admin@linkking.com",
                "admin",
                "string",
                Gender.MALE,
                "",
                "",
                UserRole.ADMIN,
                true
        );

        // When
        when(userDAO.selectUserByEmail(email)).thenReturn(Optional.of(user));

        var expected = userDTOMapper.apply(user);
        var actual = userService.fetchUserByEmail(email);

        // Then
        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void givenEmail_whenFetchUserByEmail_butReturnEmptyOptional_thenThrowException() {
        // Given
        var email = "admin@linkking.com";

        // When
        when(userDAO.selectUserByEmail(email)).thenReturn(Optional.empty());

        // Then
        assertThatThrownBy(() -> userService.fetchUserByEmail(email))
                .isInstanceOf(ResourceNotFoundException.class);
        verify(userDAO).selectUserByEmail(email);
    }

    @Test
    void addUser() {
        // Given
        var request = new UserRegistrationRequest(
                "testadd@gmail.com",
                "password",
                "test-add-user",
                Gender.FEMALE,
                "9999999999",
                ""
        );

        var user = new User(
                request.email(),
                passwordEncoder.encode(request.password()),
                request.fullName(),
                request.gender(),
                request.phone(),
                request.image()
        );

        var passwordHash = "¢5554ml;f;lsd";

        // When
        when(userDAO.existsUserByEmail(request.email())).thenReturn(false);
        when(userDAO.existsUserByPhone(request.phone())).thenReturn(false);
        when(passwordEncoder.encode(request.password())).thenReturn(passwordHash);
        when(userDAO.insertUser(user)).thenReturn(Optional.of(user));
        userService.addUser(request);

        // Then
        var captor = ArgumentCaptor.forClass(User.class);
        verify(userDAO).insertUser(captor.capture());
        var capturedUser = captor.getValue();
        assertThat(capturedUser.getUserID()).isNull();
        assertThat(capturedUser.getEmail()).isEqualTo(user.getEmail());
        assertThat(capturedUser.getPassword()).isEqualTo(passwordHash);
        assertThat(capturedUser.getFullName()).isEqualTo(user.getFullName());
        assertThat(capturedUser.getGender()).isEqualTo(user.getGender());
        assertThat(capturedUser.getPhone()).isEqualTo(user.getPhone());
        assertThat(capturedUser.getImage()).isEqualTo(user.getImage());
    }

    @Test
    void givenEmail_whenAddUser_butExistsUserByEmail_thenThrowException() {
        // Given
        var email = "admin@linkking.com";
        var request = new UserRegistrationRequest(
                email,
                "password",
                "test-add-user",
                Gender.FEMALE,
                "9999999999",
                ""
        );

        // When
        when(userDAO.existsUserByEmail(email)).thenReturn(true);

        // Then
        assertThatThrownBy(() -> userService.addUser(request))
                .isInstanceOf(DuplicateResourceException.class);
        verify(userDAO).existsUserByEmail(email);
        verify(userDAO, never()).insertUser(any());
    }

    @Test
    void givenPhone_whenAddUser_butExistsUserByPhone_thenThrowException() {
        // Given
        var phone = "";
        var request = new UserRegistrationRequest(
                "testadd@gmail.com",
                "password",
                "test-add-user",
                Gender.FEMALE,
                phone,
                ""
        );

        // When
        when(userDAO.existsUserByPhone(phone)).thenReturn(true);

        // Then
        assertThatThrownBy(() -> userService.addUser(request))
                .isInstanceOf(DuplicateResourceException.class);
        verify(userDAO).existsUserByPhone(phone);
        verify(userDAO, never()).insertUser(any());
    }

    @Test
    void whenAddFailed_thenThrowException() {
        // Given
        var request = new UserRegistrationRequest(
                "testadd@gmail.com",
                "password",
                "test-add-user",
                Gender.FEMALE,
                "9999999999",
                ""
        );

        // When
        when(userDAO.existsUserByEmail(request.email())).thenReturn(false);
        when(userDAO.existsUserByPhone(request.phone())).thenReturn(false);

        // Then
        assertThatThrownBy(() -> userService.addUser(request))
                .isInstanceOf(FailedOperationException.class);
    }

    @Test
    void updateUser() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new UserUpdateRequest(
                Collections.singletonList(UserRole.ADMIN),
                "admin-update",
                Gender.MALE,
                "",
                ""
        );

        // When
        var user = new User(
                id,
                null,
                null,
                "Admin",
                Gender.MALE,
                "",
                "",
                UserRole.ADMIN,
                true
        );

        when(userDAO.selectUserByID(id)).thenReturn(Optional.of(user));
        when(userDAO.existsOtherUserByPhone(request.phone(), id)).thenReturn(false);
        when(userDAO.updateUser(user)).thenReturn(Optional.of(user));
        userService.updateUser(id, request);

        // Then
        var captor = ArgumentCaptor.forClass(User.class);
        verify(userDAO).updateUser(captor.capture());
        var capturedUser = captor.getValue();
        assertThat(capturedUser.getUserID()).isEqualTo(id);
        assertThat(capturedUser.getEmail()).isNull();
        assertThat(capturedUser.getPassword()).isNull();
        assertThat(capturedUser.getFullName()).isEqualTo(request.fullName());
        assertThat(capturedUser.getGender()).isEqualTo(request.gender());
        assertThat(capturedUser.getPhone()).isEqualTo(request.phone());
        assertThat(capturedUser.getImage()).isEqualTo(request.image());
        assertThat(capturedUser.getRole()).isEqualTo(request.roles().get(0));
        assertThat(capturedUser.isEnabled()).isTrue();
    }

    @Test
    void whenUpdateUser_butHasNoChanges_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new UserUpdateRequest(
                Collections.singletonList(UserRole.ADMIN),
                "admin-update",
                Gender.MALE,
                "",
                ""
        );

        // When
        var user = new User(
                id,
                null,
                null,
                request.fullName(),
                request.gender(),
                request.phone(),
                request.image(),
                request.roles().get(0),
                true
        );

        when(userDAO.selectUserByID(id)).thenReturn(Optional.of(user));
        when(userDAO.existsOtherUserByPhone(request.phone(), id)).thenReturn(false);

        // Then
        assertThatThrownBy(() -> userService.updateUser(id, request))
                .isInstanceOf(DuplicateResourceException.class);
        verify(userDAO, never()).updateUser(any());
    }

    @Test
    void deleteUser() {
        // Given
        var id = BigInteger.valueOf(1);

        // When
        when(userDAO.existsUserByID(id)).thenReturn(true);

        userService.deleteUser(id);

        // Then
        verify(userDAO).deleteUserByID(id);
    }

    @ParameterizedTest
    @ValueSource(strings = {"admin@linkking.com"})
    void enableUser(String username) {
        // When
        userService.enableUser(username);

        // Then
        verify(userDAO).enableUser(username);
    }

    @Test
    void updateUserPassword() {
        // Given
        var email = "admin@linkking.com";
        var newPassword = "testPassword";
        var passwordHash = "¢5554ml;f;lsd";

        // When
        var user = new User(
                email,
                passwordEncoder.encode(newPassword),
                null,
                null,
                null,
                null
        );

        when(userDAO.existsUserByEmail(email)).thenReturn(true);
        when(userDAO.selectUserByEmail(email)).thenReturn(Optional.of(user));
        when(passwordEncoder.encode(newPassword)).thenReturn(passwordHash);

        userService.updateUserPassword(email, newPassword);

        // Then
        verify(userDAO).updateUserPassword(email, passwordHash);
    }
}