package com.ecommerce.backend.useraddress;

import com.ecommerce.backend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;

@Repository
public interface UserAddressRepository extends JpaRepository<UserAddress, BigInteger> {
    List<UserAddress> findAllByUserID(BigInteger userID);
}