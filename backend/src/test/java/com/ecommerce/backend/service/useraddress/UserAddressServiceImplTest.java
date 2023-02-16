package com.ecommerce.backend.service.useraddress;

import com.ecommerce.backend.util.exception.DuplicateResourceException;
import com.ecommerce.backend.util.exception.FailedOperationException;
import com.ecommerce.backend.util.exception.ResourceNotFoundException;
import com.ecommerce.backend.user.UserService;
import com.ecommerce.backend.useraddress.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserAddressServiceImplTest {
    private UserAddressServiceImpl userAddressService;
    @Mock
    private UserAddressDAO userAddressDAO;
    @Mock
    private UserService userService;

    @BeforeEach
    void setUp() {
        userAddressService = new UserAddressServiceImpl(
                userAddressDAO,
                userService
        );
    }

    @Test
    void fetchAllUserAddresses() {
        // When
        userAddressService.fetchAllUserAddresses();

        // Then
        verify(userAddressDAO).selectAllUserAddresses();
    }

    @Test
    void fetchAllUserAddressesByUserID() {
        // Given
        var id = BigInteger.valueOf(1);
        var userAddress = new UserAddress(
                id,
                id,
                "string"
        );

        // When
        when(userService.existsUserByID(id)).thenReturn(true);
        when(userAddressDAO.selectAllUserAddressesByUserID(id))
                .thenReturn(List.of(userAddress));

        var actual = userAddressService.fetchAllUserAddressesByUserID(id);

        // Then
        assertThat(actual).isEqualTo(List.of(userAddress));
    }

    @Test
    void whenFetchAllUserAddressesByUserID_butUserIdNotExist_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);

        // When
        when(userService.existsUserByID(id)).thenReturn(false);

        // Then
        assertThatThrownBy(() -> userAddressService
                .fetchAllUserAddressesByUserID(id))
                .isInstanceOf(ResourceNotFoundException.class);
        verify(userAddressDAO, never()).selectAllUserAddressesByUserID(id);
    }

    @Test
    void fetchUserAddressByID() {
        // Given
        var id = BigInteger.valueOf(1);
        var userAddress = new UserAddress(
                id,
                id,
                "string"
        );

        // When
        when(userAddressDAO.selectUserAddressByID(id))
                .thenReturn(Optional.of(userAddress));

        var actual = userAddressService.fetchUserAddressByID(id);

        // Then
        assertThat(actual).isEqualTo(userAddress);
    }

    @Test
    void whenFetchUserAddressByID_butReturnEmptyOptional_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);

        // When
        when(userAddressDAO.selectUserAddressByID(id))
                .thenReturn(Optional.empty());

        // Then
        assertThatThrownBy(() -> userAddressService
                .fetchUserAddressByID(id))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void addUserAddress() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new UserAddressAddRequest(
                id,
                "string"
        );

        var userAddress = new UserAddress(
                request.userID(),
                request.address()
        );

        // When
        when(userService.existsUserByID(request.userID()))
                .thenReturn(true);
        when(userAddressDAO.insertUserAddress(userAddress))
                .thenReturn(Optional.of(userAddress));
        userAddressService.addUserAddress(request);

        // Then
        var captor = ArgumentCaptor.forClass(UserAddress.class);
        verify(userAddressDAO).insertUserAddress(captor.capture());
        var capturedUserAddress = captor.getValue();
        assertThat(capturedUserAddress).isEqualTo(userAddress);
    }

    @Test
    void whenAddUserAddress_butUserIdNotExist_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new UserAddressAddRequest(
                id,
                "string"
        );

        // When
        when(userService.existsUserByID(request.userID())).thenReturn(false);

        // Then
        assertThatThrownBy(() -> userAddressService.addUserAddress(request))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void whenAddFailed_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new UserAddressAddRequest(
                id,
                "string"
        );

        // When
        when(userService.existsUserByID(request.userID()))
                .thenReturn(true);
        when(userAddressDAO.insertUserAddress(any(UserAddress.class)))
                .thenReturn(Optional.empty());

        // Then
        assertThatThrownBy(() -> userAddressService.addUserAddress(request))
                .isInstanceOf(FailedOperationException.class);
        verify(userAddressDAO).insertUserAddress(any(UserAddress.class));
    }

    @Test
    void updateUserAddress() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new UserAddressUpdateRequest(
                "test-update"
        );

        var userAddress = new UserAddress(
                id,
                id,
                "string"
        );

        // When
        when(userAddressDAO.selectUserAddressByID(id))
                .thenReturn(Optional.of(userAddress));
        when(userAddressDAO.updateUserAddress(userAddress))
                .thenReturn(Optional.of(userAddress));
        userAddressService.updateUserAddress(id, request);

        // Then
        var captor = ArgumentCaptor.forClass(UserAddress.class);
        verify(userAddressDAO).updateUserAddress(captor.capture());

        var capturedUserAddress = captor.getValue();
        assertThat(capturedUserAddress.getUserAddressID()).isEqualTo(id);
        assertThat(capturedUserAddress.getAddress())
                .isEqualTo(request.address());
    }

    @Test
    void whenUpdateFailed_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new UserAddressUpdateRequest(
                "test-update"
        );

        var userAddress = new UserAddress(
                id,
                id,
                "string"
        );

        // When
        when(userAddressDAO.selectUserAddressByID(id))
                .thenReturn(Optional.of(userAddress));
        when(userAddressDAO.updateUserAddress(userAddress))
                .thenReturn(Optional.empty());

        // Then
        assertThatThrownBy(() -> userAddressService
                .updateUserAddress(id, request))
                .isInstanceOf(FailedOperationException.class);
    }

    @Test
    void whenUpdate_butHasNoChange_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);
        var request = new UserAddressUpdateRequest(
                "string"
        );

        var userAddress = new UserAddress(
                id,
                id,
                request.address()
        );

        // When
        when(userAddressDAO.selectUserAddressByID(id))
                .thenReturn(Optional.of(userAddress));

        // Then
        assertThatThrownBy(() -> userAddressService
                .updateUserAddress(id, request))
                .isInstanceOf(DuplicateResourceException.class);
    }

    @Test
    void deleteUserAddress() {
        // Given
        var id = BigInteger.valueOf(1);

        // When
        when(userAddressDAO.existsUserAddressByID(id)).thenReturn(true);
        userAddressService.deleteUserAddress(id);

        // Then
        verify(userAddressDAO).deleteUserAddressByID(id);
    }

    @Test
    void whenDeleteUserAddress_butNotExistUserAddressID_thenThrowException() {
        // Given
        var id = BigInteger.valueOf(1);

        // Then
        assertThatThrownBy(() -> userAddressService.deleteUserAddress(id))
                .isInstanceOf(ResourceNotFoundException.class);
    }
}
