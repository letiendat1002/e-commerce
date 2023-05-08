package com.ecommerce.backend.user;

import java.math.BigInteger;
import java.util.List;

public interface UserService {
    List<UserDTO> fetchAllUsers();

    UserDTO fetchUserByUserID(BigInteger userID);

    UserDTO fetchUserByEmail(String email);

    UserDTO addUser(UserRegistrationRequest request);

    UserDTO updateUser(BigInteger userID, UserUpdateRequest request);

    void deleteUser(BigInteger userID);

    void enableUser(String username);
}
