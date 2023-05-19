package com.ecommerce.backend.useraddress;

import java.math.BigInteger;
import java.util.List;

public interface UserAddressService {
    List<UserAddress> fetchAllUserAddresses();

    List<UserAddress> fetchAllUserAddressesByUserID(BigInteger userID);

    UserAddress fetchUserAddressByID(BigInteger userAddressID);

    UserAddress addUserAddress(UserAddressAddRequest request);

    UserAddress updateUserAddress(BigInteger userAddressID, UserAddressUpdateRequest request);

    void deleteUserAddress(BigInteger userAddressID);
}
