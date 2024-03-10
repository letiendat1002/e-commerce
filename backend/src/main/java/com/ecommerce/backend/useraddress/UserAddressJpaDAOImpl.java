package com.ecommerce.backend.useraddress;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class UserAddressJpaDAOImpl implements UserAddressDAO {
    private final UserAddressRepository userAddressRepository;

    @Override
    public List<UserAddress> selectAllUserAddresses() {
        return userAddressRepository.findAll();
    }

    @Override
    public List<UserAddress> selectAllUserAddressesByUserID(BigInteger userID) {
        return userAddressRepository.findAllByUserID(userID);
    }

    @Override
    public Optional<UserAddress> selectUserAddressByID(BigInteger userAddressID) {
        return userAddressRepository.findById(userAddressID);
    }

    @Override
    public Optional<UserAddress> insertUserAddress(UserAddress userAddress) {
        return Optional.of(userAddressRepository.save(userAddress));
    }

    @Override
    public void deleteUserAddressByID(BigInteger userAddressID) {
        userAddressRepository.deleteById(userAddressID);
    }

    @Override
    public Optional<UserAddress> updateUserAddress(UserAddress update) {
        return Optional.of(userAddressRepository.save(update));
    }

    @Override
    public boolean existsUserAddressByID(BigInteger userAddressID) {
        return userAddressRepository.existsById(userAddressID);
    }
}
