package com.ecommerce.backend.useraddress;

import com.ecommerce.backend.shared.exception.DuplicateResourceException;
import com.ecommerce.backend.shared.exception.FailedOperationException;
import com.ecommerce.backend.shared.exception.ResourceNotFoundException;
import com.ecommerce.backend.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;

@RequiredArgsConstructor
@Service
public class UserAddressServiceImpl implements UserAddressService {
    private final UserAddressDAO userAddressDAO;
    private final UserService userService;

    @Override
    public List<UserAddress> fetchAllUserAddresses() {
        return userAddressDAO.selectAllUserAddresss();
    }

    @Override
    public List<UserAddress> fetchAllUserAddressesByUserID(BigInteger userID) {
        var user = userService.fetchUserByUserID(userID);

        return userAddressDAO.selectAllUserAddresssByUser(user);
    }

    @Override
    public UserAddress fetchUserAddressByID(BigInteger userAddressID) {
        return userAddressDAO
                .selectUserAddressByID(userAddressID)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "User address not found by userAddressID {%d}"
                                        .formatted(userAddressID)
                        )
                );
    }

    @Override
    public UserAddress addUserAddress(UserAddressRequest request) {
        var user = userService.fetchUserByUserID(request.userID());

        var userAddress = new UserAddress(
                user,
                request.address()
        );

        return userAddressDAO
                .insertUserAddress(userAddress)
                .orElseThrow(
                        () -> new FailedOperationException(
                                "Failed to add user address"
                        )
                );
    }

    @Override
    public UserAddress updateUserAddress(
            BigInteger userAddressID,
            UserAddressRequest request
    ) {
        var userAddress = fetchUserAddressByID(userAddressID);

        checkIfUserExistsByIdOrThrow(request.userID());
        checkAndUpdateChangesOrThrow(request, userAddress);

        return userAddressDAO
                .updateUserAddress(userAddress)
                .orElseThrow(
                        () -> new FailedOperationException(
                                "Failed to update user address"
                        )
                );
    }

    private void checkIfUserExistsByIdOrThrow(BigInteger userID) {
        var isExists = userService.existsUserByID(userID);
        if (!isExists) {
            throw new ResourceNotFoundException(
                    "User not found by userID {%d}".formatted(userID)
            );
        }
    }

    private void checkAndUpdateChangesOrThrow(
            UserAddressRequest request,
            UserAddress userAddress
    ) {
        var isChanged = false;

        if (!request.userID().equals(userAddress.getUser().getUserID())
        ) {
            var user = userService.fetchUserByUserID(request.userID());
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
                    "User address not found by userAddressID {%d}"
                            .formatted(userAddressID)
            );
        }
    }
}
