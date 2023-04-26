package com.ecommerce.backend.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, BigInteger> {
    boolean existsByEmail(String email);

    boolean existsByEmailAndUserIDNot(String email, BigInteger userID);

    boolean existsByUserID(BigInteger userID);

    Optional<User> findByEmail(String email);
}