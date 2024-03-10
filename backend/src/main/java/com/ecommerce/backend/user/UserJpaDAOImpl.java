package com.ecommerce.backend.user;


import com.ecommerce.backend.util.security.enums.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class UserJpaDAOImpl implements UserDAO {
    private final UserRepository userRepository;

    @Override
    public List<User> selectAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> selectUserByID(BigInteger userID) {
        return userRepository.findById(userID);
    }

    @Override
    public Optional<User> selectUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public boolean existsUserByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public boolean existsUserByID(BigInteger userID) {
        return userRepository.existsById(userID);
    }

    @Override
    public boolean existsUserByPhone(String phone) {
        return userRepository.existsByPhone(phone);
    }

    @Override
    public boolean existsOtherUserByPhone(String phone, BigInteger userID) {
        return userRepository.existsByPhoneAndUserIDNot(phone, userID);
    }

    @Override
    public Optional<User> insertUser(User user) {
        return Optional.of(userRepository.save(user));
    }

    @Override
    public void deleteUserByID(BigInteger userID) {
        userRepository.deleteById(userID);
    }

    @Override
    public Optional<User> updateUser(User update) {
        return Optional.of(userRepository.save(update));
    }

    @Override
    public int enableUser(String email) {
        return userRepository.enableUser(email);
    }

    @Override
    public int updateUserPassword(String email, String randomPassword) {
        return userRepository.updateUserPassword(email, randomPassword);
    }

    @Override
    public List<User> selectUsersByRole(UserRole role) {
        return userRepository.findAllByRole(role);
    }

    @Override
    public List<BigInteger> selectUserIDsByRole(UserRole role) {
        return userRepository.findAllUserIDsByRole(role);
    }
}
