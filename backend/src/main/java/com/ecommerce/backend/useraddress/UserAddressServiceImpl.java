package com.ecommerce.backend.useraddress;

import com.ecommerce.backend.shared.exception.DuplicateResourceException;
import com.ecommerce.backend.shared.exception.FailedOperationException;
import com.ecommerce.backend.shared.exception.ResourceNotFoundException;
import com.ecommerce.backend.user.User;
import com.ecommerce.backend.user.UserDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class UserAddressServiceImpl implements UserAddressService {
    private final UserAddressDAO userAddressDAO;
    private final UserAddressDTOMapper userAddressDTOMapper;
    private final UserDAO userDAO;

    @Override
    public List<UserAddressDTO> fetchAllUserAddresses() {
        return userAddressDAO
                .selectAllUserAddresss()
                .stream()
                .map(userAddressDTOMapper)
                .collect(Collectors.toList());
    }

    @Override
    public List<UserAddressDTO> fetchAllUserAddressesByUserID(BigInteger userID) {
        var user = selectUserByIdOrThrow(userID);

        return userAddressDAO
                .selectAllUserAddresssByUser(user)
                .stream()
                .map(userAddressDTOMapper)
                .collect(Collectors.toList());
    }

    private User selectUserByIdOrThrow(BigInteger userID) {
        return userDAO
                .selectUserByID(userID)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "User not found by userID {%d}".formatted(userID)
                        )
                );
    }

    @Override
    public UserAddressDTO fetchUserAddressByID(BigInteger userAddressID) {
        return userAddressDTOMapper
                .apply(selectUserAddressByIdOrThrow(userAddressID));
    }

    private UserAddress selectUserAddressByIdOrThrow(BigInteger userAddressID) {
        return userAddressDAO
                .selectUserAddressByID(userAddressID)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "User address not found by userAddressID {%d}".formatted(userAddressID)
                        )
                );
    }

    @Override
    public UserAddressDTO addUserAddress(UserAddressRequest request) {
        var user = selectUserByIdOrThrow(request.userID());

        var userAddress = new UserAddress(
                user,
                request.address()
        );

        return userAddressDAO
                .insertUserAddress(userAddress)
                .map(userAddressDTOMapper)
                .orElseThrow(
                        () -> new FailedOperationException(
                                "Failed to add user address"
                        )
                );
    }

    @Override
    public UserAddressDTO updateUserAddress(BigInteger userAddressID, UserAddressRequest request) {
        var userAddress = selectUserAddressByIdOrThrow(userAddressID);

        checkIfUserExistsByIdOrThrow(request.userID());
        checkAndUpdateChangesOrThrow(request, userAddress);

        return userAddressDAO
                .updateUserAddress(userAddress)
                .map(userAddressDTOMapper)
                .orElseThrow(
                        () -> new FailedOperationException(
                                "Failed to update user address"
                        )
                );
    }

    private void checkIfUserExistsByIdOrThrow(BigInteger userID) {
        var isExists = userDAO.existsUserByID(userID);
        if (!isExists) {
            throw new ResourceNotFoundException(
                    "User not found by userID {%d}".formatted(userID)
            );
        }
    }

    private void checkAndUpdateChangesOrThrow(UserAddressRequest request, UserAddress userAddress) {
        var isChanged = false;

        if (!request.userID().equals(userAddress.getUser().getUserID())
        ) {
            var user = selectUserByIdOrThrow(request.userID());
            userAddress.setUser(user);
            isChanged = true;
        }

        if (!request.address().equals(userAddress.getAddress())) {
            userAddress.setAddress(request.address());
            isChanged = true;
        }

        if (!isChanged) {
            throw new DuplicateResourceException(
                    "No data changes detected"
            );
        }
    }

    @Override
    public void deleteUserAddress(BigInteger userAddressID) {
        checkIfUserAddressExistsByIdOrThrow(userAddressID);
        userAddressDAO.deleteUserAddressByID(userAddressID);
    }

    private void checkIfUserAddressExistsByIdOrThrow(BigInteger userAddressID) {
        var isExists = userAddressDAO.existsUserAddressByID(userAddressID);
        if (!isExists) {
            throw new ResourceNotFoundException(
                    "User address not found by userAddressID {%d}".formatted(userAddressID)
            );
        }
    }
}
