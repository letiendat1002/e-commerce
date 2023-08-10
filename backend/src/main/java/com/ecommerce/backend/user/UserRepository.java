package com.ecommerce.backend.user;

import com.ecommerce.backend.util.security.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, BigInteger> {
    List<User> findAllByRole(UserRole role);

    @Query("SELECT a.userID FROM User a WHERE a.role = ?1")
    List<BigInteger> findAllUserIDsByRole(UserRole role);

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

    boolean existsByPhoneAndUserIDNot(String phone, BigInteger userID);

    Optional<User> findByEmail(String email);

    @Transactional
    @Modifying
    @Query("UPDATE User a " +
            "SET a.enabled = TRUE WHERE a.email = ?1")
    int enableUser(String email);

    @Transactional
    @Modifying
    @Query("UPDATE User a " +
            "SET a.password = ?2 WHERE a.email = ?1")
    int updateUserPassword(String email, String password);
}
