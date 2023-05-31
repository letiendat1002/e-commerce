package com.ecommerce.backend.useraddress;

import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class UserAddressDTOMapper implements Function<UserAddress, UserAddressDTO> {
    @Override
    public UserAddressDTO apply(UserAddress userAddress) {
        return new UserAddressDTO(
                userAddress.getUserAddressID(),
                userAddress.getUserID(),
                userAddress.getAddress()
        );
    }
}
