package com.ecommerce.backend.useraddress;

import java.math.BigInteger;
import java.util.List;

public interface UserAddressService {
    List<UserAddressDTO> fetchAllUserAddresses();

    List<UserAddressDTO> fetchAllUserAddressesByUserID(BigInteger userID);

    UserAddressDTO fetchUserAddressByID(BigInteger userAddressID);

    UserAddressDTO addUserAddress(UserAddressRequest request);

    UserAddressDTO updateUserAddress(BigInteger userAddressID, UserAddressRequest request);

    void deleteUserAddress(BigInteger userAddressID);
}
