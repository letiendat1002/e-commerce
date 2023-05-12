package com.ecommerce.backend.user;

import java.math.BigInteger;
import java.util.List;

public interface UserService {
    List<User> fetchAllUsers();

    User fetchUserByUserID(BigInteger userID);

    User fetchUserByEmail(String email);

    User addUser(UserRegistrationRequest request);

    User updateUser(BigInteger userID, UserUpdateRequest request);

    void deleteUser(BigInteger userID);

    void enableUser(String email);

    User updateUserPassword(String email, String newPassword);

    boolean existsUserByID(BigInteger userID);
}
