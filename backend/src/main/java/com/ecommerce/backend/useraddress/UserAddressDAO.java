package com.ecommerce.backend.useraddress;

import com.ecommerce.backend.user.User;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

public interface UserAddressDAO {
    List<UserAddress> selectAllUserAddresss();

    List<UserAddress> selectAllUserAddresssByUser(User user);

    Optional<UserAddress> selectUserAddressByID(BigInteger userAddressID);

    Optional<UserAddress> insertUserAddress(UserAddress userAddress);

    void deleteUserAddressByID(BigInteger userAddressID);

    Optional<UserAddress> updateUserAddress(UserAddress update);

    boolean existsUserAddressByID(BigInteger userAddressID);
}
