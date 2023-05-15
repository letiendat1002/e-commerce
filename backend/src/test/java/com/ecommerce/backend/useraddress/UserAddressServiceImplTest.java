package com.ecommerce.backend.useraddress;

import com.ecommerce.backend.shared.exception.DuplicateResourceException;
import com.ecommerce.backend.shared.exception.FailedOperationException;
import com.ecommerce.backend.shared.exception.ResourceNotFoundException;
import com.ecommerce.backend.user.User;
import com.ecommerce.backend.user.UserService;
import com.ecommerce.backend.user.enums.Gender;
import com.ecommerce.backend.user.enums.UserRole;
import com.ecommerce.backend.useraddress.UserAddress;
import com.ecommerce.backend.useraddress.UserAddressDAO;
import com.ecommerce.backend.useraddress.UserAddressRequest;
import com.ecommerce.backend.useraddress.UserAddressServiceImpl;
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
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class UserAddressServiceImplTest {
//    private UserAddressServiceImpl userAddressService;
//    @Mock
//    private UserAddressDAO userAddressDAO;
//    @Mock
//    private UserService userService;
//
//    @BeforeEach
//    void setUp() {
//        userAddressService = new UserAddressServiceImpl(
//                userAddressDAO,
//                userService
//        );
//    }
//
//    @Test
//    void fetchAllUserAddresses() {
//        // When
//        userAddressService.fetchAllUserAddresses();
//
//        // Then
//        verify(userAddressDAO).selectAllUserAddresss();
//    }
//
//    @Test
//    void fetchAllUserAddressesByUserID() {
//        // Given
//        var id = BigInteger.valueOf(1);
//        var user = new User(
//                id,
//                "admin@linkking.com",
//                "admin",
//                "string",
//                Gender.MALE,
//                "",
//                "",
//                UserRole.ADMIN,
//                true
//        );
//        var userAddress = new UserAddress(
//                id,
//                user,
//                "string"
//        );
//
//        // When
//        when(userDAO.selectUserByID(id)).thenReturn(Optional.of(user));
//        when(userAddressDAO.selectAllUserAddresssByUser(user)).thenReturn(List.of(userAddress));
//
//        var expected = List.of(userAddressDTOMapper.apply(userAddress));
//        var actual = userAddressService.fetchAllUserAddressesByUserID(id);
//
//        // Then
//        assertThat(actual).isEqualTo(expected);
//    }
//
//    @Test
//    void givenUserID_whenfetchAllUserAddressesByUserID_butUserReturnEmptyOptional_thenThrowException() {
//        // Given
//        var id = BigInteger.valueOf(1);
//
//        var user = new User(
//                id,
//                "admin@linkking.com",
//                "admin",
//                "string",
//                Gender.MALE,
//                "",
//                "",
//                UserRole.ADMIN,
//                true
//        );
//        var userAddress = new UserAddress(
//                id,
//                user,
//                "string"
//        );
//
//        // When
//        when(userDAO.selectUserByID(id)).thenReturn(Optional.empty());
//
//        // Then
//        assertThatThrownBy(() -> userAddressService.fetchAllUserAddressesByUserID(id))
//                .isInstanceOf(ResourceNotFoundException.class);
//    }
//
//    @Test
//    void fetchUserAddressByID() {
//        // Given
//        var id = BigInteger.valueOf(1);
//        var userAddress = new UserAddress(
//                id,
//                new User(),
//                "string"
//        );
//
//        // When
//        when(userAddressDAO.selectUserAddressByID(id)).thenReturn(Optional.of(userAddress));
//
//        var expected = userAddressDTOMapper.apply(userAddress);
//        var actual = userAddressService.fetchUserAddressByID(id);
//
//        // Then
//        assertThat(actual).isEqualTo(expected);
//    }
//
//    @Test
//    void givenID_whenFetchUserAddressByID_butReturnEmptyOptional_thenThrowException() {
//        // Given
//        var id = BigInteger.valueOf(1);
//
//        // When
//        when(userAddressDAO.selectUserAddressByID(id)).thenReturn(Optional.empty());
//
//        // Then
//        assertThatThrownBy(() -> userAddressService.fetchUserAddressByID(id))
//                .isInstanceOf(ResourceNotFoundException.class);
//    }
//
//    @Test
//    void givenID_whenFetchUserAddressByID_butNotExistUserAddressID_thenThrowException() {
//        // Given
//        var id = BigInteger.valueOf(9_999_999);
//
//        // Then
//        assertThatThrownBy(() -> userAddressService.fetchUserAddressByID(id))
//                .isInstanceOf(ResourceNotFoundException.class);
//    }
//
//    @Test
//    void addUserAddress() {
//        // Given
//        var id = BigInteger.valueOf(1);
//        var request = new UserAddressRequest(
//                id,
//                "string"
//        );
//        var user = new User(
//                id,
//                "admin@linkking.com",
//                "admin",
//                "string",
//                Gender.MALE,
//                "",
//                "",
//                UserRole.ADMIN,
//                true
//        );
//
//        // When
//        var userAddress = new UserAddress(
//                user,
//                request.address()
//        );
//
//        when(userDAO.selectUserByID(request.userID())).thenReturn(Optional.of(user));
//        when(userAddressDAO.insertUserAddress(userAddress)).thenReturn(Optional.of(userAddress));
//        userAddressService.addUserAddress(request);
//
//        // Then
//        var captor = ArgumentCaptor.forClass(UserAddress.class);
//        verify(userAddressDAO).insertUserAddress(captor.capture());
//        var capturedUserAddress = captor.getValue();
//        assertThat(capturedUserAddress).isEqualTo(userAddress);
//    }
//
//    @Test
//    void givenUserID_whenAddUserAddress_butUserReturnEmptyOptional_thenThrowException() {
//        // Given
//        var id = BigInteger.valueOf(1);
//        var request = new UserAddressRequest(
//                id,
//                "string"
//        );
//
//        // When
//        when(userDAO.selectUserByID(request.userID())).thenReturn(Optional.empty());
//
//        // Then
//        assertThatThrownBy(() -> userAddressService.addUserAddress(request))
//                .isInstanceOf(ResourceNotFoundException.class);
//    }
//
//    @Test
//    void whenAddFailed_thenThrowException() {
//        // Given
//        var id = BigInteger.valueOf(1);
//        var request = new UserAddressRequest(
//                id,
//                "string"
//        );
//
//        var user = new User(
//                id,
//                "admin@linkking.com",
//                "admin",
//                "string",
//                Gender.MALE,
//                "",
//                "",
//                UserRole.ADMIN,
//                true
//        );
//
//        // When
//        when(userDAO.selectUserByID(request.userID())).thenReturn(Optional.of(user));
//
//        // Then
//        assertThatThrownBy(() -> userAddressService.addUserAddress(request))
//                .isInstanceOf(FailedOperationException.class);
//    }
//
//    @Test
//    void updateUserAddress() {
//        // Given
//        var id = BigInteger.valueOf(1);
//        var request = new UserAddressRequest(
//                id,
//                "test-update"
//        );
//
//        var user = new User(
//                id,
//                "admin@linkking.com",
//                "admin",
//                "string",
//                Gender.MALE,
//                "",
//                "",
//                UserRole.ADMIN,
//                true
//        );
//
//        // When
//        var userAddress = new UserAddress(
//                id,
//                user,
//                "string"
//        );
//
//        when(userAddressDAO.selectUserAddressByID(id)).thenReturn(Optional.of(userAddress));
//        when(userAddressDAO.updateUserAddress(userAddress)).thenReturn(Optional.of(userAddress));
//        when(userDAO.existsUserByID(id)).thenReturn(true);
//        userAddressService.updateUserAddress(id, request);
//
//        // Then
//        var captor = ArgumentCaptor.forClass(UserAddress.class);
//        verify(userAddressDAO).updateUserAddress(captor.capture());
//        var capturedUserAddress = captor.getValue();
//        assertThat(capturedUserAddress.getUserAddressID()).isEqualTo(id);
//        assertThat(capturedUserAddress.getUser()).isEqualTo(user);
//        assertThat(capturedUserAddress.getUser().getUserID()).isEqualTo(request.userID());
//        assertThat(capturedUserAddress.getAddress()).isEqualTo(request.address());
//    }
//
//    @Test
//    void whenUpdateFailed_thenThrowException() {
//        // Given
//        var id = BigInteger.valueOf(1);
//        var request = new UserAddressRequest(
//                id,
//                "test-update"
//        );
//
//        var user = new User(
//                id,
//                "admin@linkking.com",
//                "admin",
//                "string",
//                Gender.MALE,
//                "",
//                "",
//                UserRole.ADMIN,
//                true
//        );
//
//        // When
//        var userAddress = new UserAddress(
//                id,
//                user,
//                "string"
//        );
//
//        when(userAddressDAO.selectUserAddressByID(id)).thenReturn(Optional.of(userAddress));
//        when(userDAO.existsUserByID(id)).thenReturn(true);
//
//        // Then
//        assertThatThrownBy(() -> userAddressService.updateUserAddress(id, request))
//                .isInstanceOf(FailedOperationException.class);
//    }
//
//    @Test
//    void whenUpdate_butHasNoChanges_thenThrowException() {
//        // Given
//        var id = BigInteger.valueOf(1);
//        var request = new UserAddressRequest(
//                id,
//                "string"
//        );
//        var user = new User(
//                id,
//                "admin@linkking.com",
//                "admin",
//                "string",
//                Gender.MALE,
//                "",
//                "",
//                UserRole.ADMIN,
//                true
//        );
//
//        // When
//        var userAddress = new UserAddress(
//                id,
//                user,
//                request.address()
//        );
//
//        when(userAddressDAO.selectUserAddressByID(id)).thenReturn(Optional.of(userAddress));
//        when(userDAO.existsUserByID(id)).thenReturn(true);
//
//        // Then
//        assertThatThrownBy(() -> userAddressService.updateUserAddress(id, request))
//                .isInstanceOf(DuplicateResourceException.class);
//    }
//
//    @Test
//    void deleteUserAddress() {
//        // Given
//        var id = BigInteger.valueOf(1);
//
//        // When
//        when(userAddressDAO.existsUserAddressByID(id)).thenReturn(true);
//        userAddressService.deleteUserAddress(id);
//
//        // Then
//        verify(userAddressDAO).deleteUserAddressByID(id);
//    }
//
//    @Test
//    void givenID_whenDeleteUserAddress_butNotExistUserAddressID_thenThrowException() {
//        // Given
//        var id = BigInteger.valueOf(9_999_999);
//
//        // Then
//        assertThatThrownBy(() -> userAddressService.deleteUserAddress(id))
//                .isInstanceOf(ResourceNotFoundException.class);
//    }
}