package com.ecommerce.backend.service.user;

import com.ecommerce.backend.order.OrderService;
import com.ecommerce.backend.util.exception.DuplicateResourceException;
import com.ecommerce.backend.util.exception.FailedOperationException;
import com.ecommerce.backend.util.exception.ResourceNotFoundException;
import com.ecommerce.backend.util.security.enums.UserRole;
import com.ecommerce.backend.user.*;
import com.ecommerce.backend.user.enums.Gender;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {
    private UserServiceImpl userService;
    @Mock
    private UserDAO userDAO;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private OrderService orderService;

    @BeforeEach
    void setUp() {
        userService = new UserServiceImpl(userDAO, passwordEncoder, orderService);
    }

    @Test
    void fetchAllUsers() {
        // When
        userService.fetchAllUsers();

        // Then
        verify(userDAO).selectAllUsers();
    }

    @Test
    void fetchUsersByRole() {
        // Given
        var id = BigInteger.valueOf(1);
        var user = new User(
                id,
                "test@example.com",
                "test",
                "string",
                Gender.MALE,
                "",
                ""
        );
        var role = UserRole.CUSTOMER;

        // When
        when(userDAO.selectUsersByRole(role))
                .thenReturn(List.of(user));

        var actual = userService.fetchUsersByRole(role);

        // Then
        verify(userDAO).selectUsersByRole(role);
        assertThat(actual).isEqualTo(List.of(user));
    }

    @Test
    void fetchUserByUserID() {
        // Given
        var id = BigInteger.valueOf(1);
        var user = new User(
                id,
                "test@example.com",
                "test",
                "string",
                Gender.MALE,
                "",
                ""
        );

        // When
        when(userDAO.selectUserByID(id)).thenReturn(Optional.of(user));

        var actual = userService.fetchUserByUserID(id);

        // Then
        assertThat(actual).isEqualTo(user);
    }

    @Test
    void whenFetchUserByID_butReturnEmptyOptional_thenThrowException() {
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
        var email = "test@example.com";
        var user = new User(
                id,
                email,
                "test",
                "string",
                Gender.MALE,
                "",
                ""
        );

        // When
        when(userDAO.selectUserByEmail(email)).thenReturn(Optional.of(user));

        var actual = userService.fetchUserByEmail(email);

        // Then
        assertThat(actual).isEqualTo(user);
    }

    @Test
    void whenFetchUserByEmail_butReturnEmptyOptional_thenThrowException() {
        // Given
        var email = "test@example.com";

        // When
        when(userDAO.selectUserByEmail(email))
                .thenReturn(Optional.empty());

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
    void whenAddUser_butExistsUserByEmail_thenThrowException() {
        // Given
        var email = "test@example.com";
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
    void whenAddUser_butExistsUserByPhone_thenThrowException() {
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
                Collections.singletonList(UserRole.EMPLOYEE),
                "test-update",
                Gender.MALE,
                "",
                ""
        );

        var user = new User(
                id,
                null,
                null,
                "test-user",
                Gender.MALE,
                "",
                ""
        );

        // When
        when(userDAO.selectUserByID(id)).thenReturn(Optional.of(user));
        when(userDAO.existsOtherUserByPhone(request.phone(), id))
                .thenReturn(false);
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
    }

    @Test
    void whenUpdateUser_butExistsOtherUserByPhone_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new UserUpdateRequest(
                Collections.singletonList(UserRole.EMPLOYEE),
                "test-update",
                Gender.MALE,
                "",
                ""
        );
        var user = new User();

        // When
        when(userDAO.selectUserByID(id)).thenReturn(Optional.of(user));
        when(userDAO
                .existsOtherUserByPhone(any(String.class), any(BigInteger.class)))
                .thenReturn(true);

        // Then
        assertThatThrownBy(() -> userService
                .updateUser(id, request))
                .isInstanceOf(DuplicateResourceException.class);
    }

    @Test
    void whenUpdateFailed_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new UserUpdateRequest(
                Collections.singletonList(UserRole.ADMIN),
                "test-update",
                Gender.MALE,
                "",
                ""
        );

        // When
        var user = new User();

        when(userDAO.selectUserByID(id)).thenReturn(Optional.of(user));
        when(userDAO.existsOtherUserByPhone(request.phone(), id))
                .thenReturn(false);
        when(userDAO.updateUser(user)).thenReturn(Optional.empty());

        // Then
        assertThatThrownBy(() -> userService.updateUser(id, request))
                .isInstanceOf(FailedOperationException.class);
    }

    @Test
    void whenUpdate_butHasNoChange_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new UserUpdateRequest(
                Collections.singletonList(UserRole.ADMIN),
                "test-update",
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
        when(userDAO.existsOtherUserByPhone(request.phone(), id))
                .thenReturn(false);

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

    @Test
    void whenDeleteUser_butUserNotExistsByID_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);

        // When
        when(userDAO.existsUserByID(id)).thenReturn(false);

        // Then
        assertThatThrownBy(() -> userService.deleteUser(id))
                .isInstanceOf(ResourceNotFoundException.class);
        verify(userDAO, never()).deleteUserByID(id);
    }

    @Test
    void enableUser() {
        // Given
        var username = "test@example.com";

        // When
        when(userDAO.enableUser(username)).thenReturn(1);
        userService.enableUser(username);

        // Then
        verify(userDAO).enableUser(username);
    }

    @Test
    void whenEnableUserFailed_thenThrowException() {
        // Given
        var username = "test@example.com";

        // When
        when(userDAO.enableUser(username)).thenReturn(0);

        // Then
        assertThatThrownBy(() -> userService.enableUser(username))
                .isInstanceOf(FailedOperationException.class);
    }

    @Test
    void updateUserPassword() {
        // Given
        var email = "test@example.com";
        var newPassword = "testPassword";
        var passwordHash = "¢5554ml;f;lsd";
        var user = new User();

        // When
        when(userDAO.existsUserByEmail(email)).thenReturn(true);
        when(userDAO.selectUserByEmail(email)).thenReturn(Optional.of(user));
        when(passwordEncoder.encode(newPassword)).thenReturn(passwordHash);
        when(userDAO.updateUserPassword(email, passwordHash)).thenReturn(1);
        when(userDAO.selectUserByEmail(email)).thenReturn(Optional.of(user));

        userService.updateUserPassword(email, newPassword);

        // Then
        verify(userDAO).updateUserPassword(email, passwordHash);
    }

    @Test
    void whenUpdatePassword_butUserNotExistsByEmail_thenThrowException() {
        // Given
        var email = "user@example.com";
        var newPassword = "testPassword";

        // When
        when(userDAO.existsUserByEmail(email)).thenReturn(false);

        // Then
        assertThatThrownBy(() -> userService
                .updateUserPassword(email, newPassword))
                .isInstanceOf(ResourceNotFoundException.class);
        verify(userDAO, never()).updateUserPassword(any(), any());
    }

    @Test
    void whenUpdatePasswordFailed_thenThrowException() {
        // Given
        var email = "test@example.com";
        var newPassword = "testPassword";
        var passwordHash = "¢5554ml;f;lsd";

        // When
        when(userDAO.existsUserByEmail(email)).thenReturn(true);
        when(passwordEncoder.encode(newPassword)).thenReturn(passwordHash);
        when(userDAO.updateUserPassword(email, passwordHash)).thenReturn(0);

        // Then
        assertThatThrownBy(() -> userService
                .updateUserPassword(email, newPassword))
                .isInstanceOf(FailedOperationException.class);
        verify(userDAO).updateUserPassword(email, passwordHash);
    }

    @Test
    void existsUserByID() {
        // Given
        var id = BigInteger.valueOf(1);

        // When
        when(userDAO.existsUserByID(id)).thenReturn(true);
        var result = userService.existsUserByID(id);

        // Then
        verify(userDAO).existsUserByID(id);
        assertThat(result).isTrue();
    }

    @Test
    void notExistsUserByID() {
        // Given
        var id = BigInteger.valueOf(1);

        // When
        when(userDAO.existsUserByID(id)).thenReturn(false);
        var result = userService.existsUserByID(id);

        // Then
        verify(userDAO).existsUserByID(id);
        assertThat(result).isFalse();
    }

    @Test
    void fetchShippersWithOrderCountASC() {
        // Given
        var shipperId1 = BigInteger.ONE;
        var shipperId2 = BigInteger.TWO;
        var shipperList = new ArrayList<BigInteger>();
        shipperList.add(shipperId1);
        shipperList.add(shipperId2);

        // When
        when(userDAO.selectUserIDsByRole(UserRole.SHIPPER)).thenReturn(shipperList);
        when(orderService.fetchOrderCountByWorkerID(shipperId1))
                .thenReturn(2);
        when(orderService.fetchOrderCountByWorkerID(shipperId2))
                .thenReturn(1);
        var result = userService.fetchShippersWithOrderCountASC();

        // Then
        verify(userDAO).selectUserIDsByRole(UserRole.SHIPPER);
        verify(orderService).fetchOrderCountByWorkerID(shipperId1);
        verify(orderService).fetchOrderCountByWorkerID(shipperId2);

        assertThat(result).hasSize(2);
        assertThat(result.get(0)).isEqualTo(shipperId2);
        assertThat(result.get(1)).isEqualTo(shipperId1);
    }
}