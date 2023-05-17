package com.ecommerce.backend.useraddress;

import com.ecommerce.backend.util.exception.DuplicateResourceException;
import com.ecommerce.backend.util.exception.FailedOperationException;
import com.ecommerce.backend.util.exception.ResourceNotFoundException;
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
        return userAddressDAO.selectAllUserAddresses();
    }

    @Override
    public List<UserAddress> fetchAllUserAddressesByUserID(BigInteger userID) {
        checkIfUserExistsByIdOrThrow(userID);

        return userAddressDAO.selectAllUserAddressesByUserID(userID);
    }

    private void checkIfUserExistsByIdOrThrow(BigInteger userID) {
        var isExists = userService.existsUserByID(userID);
        if (!isExists) {
            throw new ResourceNotFoundException(
                    "User not found by userID {%d}".formatted(userID)
            );
        }
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
    public UserAddress addUserAddress(UserAddressAddRequest request) {
        checkIfUserExistsByIdOrThrow(request.userID());

        var userAddress = new UserAddress(
                request.userID(),
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
            UserAddressUpdateRequest request
    ) {
        var userAddress = fetchUserAddressByID(userAddressID);

        checkAndUpdateChangesOrThrow(request, userAddress);

        return userAddressDAO
                .updateUserAddress(userAddress)
                .orElseThrow(
                        () -> new FailedOperationException(
                                "Failed to update user address"
                        )
                );
    }

    private void checkAndUpdateChangesOrThrow(
            UserAddressUpdateRequest request,
            UserAddress userAddress
    ) {
        var isChanged = false;

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
