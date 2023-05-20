package com.ecommerce.backend.user;

import com.ecommerce.backend.util.security.enums.UserRole;

import java.math.BigInteger;
import java.util.List;

public interface UserService {
    List<User> fetchAllUsers();

    List<User> fetchUsersByRole(UserRole role);

    User fetchUserByUserID(BigInteger userID);

    User fetchUserByEmail(String email);

    User addUser(UserRegistrationRequest request);

    User updateUser(BigInteger userID, UserUpdateRequest request);

    void deleteUser(BigInteger userID);

    void enableUser(String email);

    User updateUserPassword(String email, String newPassword);

    boolean existsUserByID(BigInteger userID);

    boolean isUserEnabledByEmail(String username);

    void unlockUser(BigInteger userID);

    void lockUserPermanent(BigInteger userID);

    void lockUserTemporary(BigInteger userID, UserLockRequest request);
}
