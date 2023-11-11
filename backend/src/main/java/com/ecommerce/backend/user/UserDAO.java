package com.ecommerce.backend.user;

import com.ecommerce.backend.util.security.enums.UserRole;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

public interface UserDAO {
    List<User> selectAllUsers();

    Optional<User> selectUserByID(BigInteger userID);

    Optional<User> selectUserByEmail(String email);

    boolean existsUserByEmail(String email);

    boolean existsUserByID(BigInteger userID);

    boolean existsUserByPhone(String phone);

    boolean existsOtherUserByPhone(String phone, BigInteger userID);

    Optional<User> insertUser(User user);

    void deleteUserByID(BigInteger userID);

    Optional<User> updateUser(User update);

    int enableUser(String email);

    int updateUserPassword(String email, String randomPassword);

    List<User> selectUsersByRole(UserRole role);

    List<BigInteger> selectUserIDsByRole(UserRole role);
}
