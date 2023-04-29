package com.ecommerce.backend.useraddress;

import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigInteger;

public interface UserAddressRepository extends JpaRepository<UserAddress, BigInteger> {
}