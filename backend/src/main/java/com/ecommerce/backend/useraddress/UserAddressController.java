package com.ecommerce.backend.useraddress;


import com.ecommerce.backend.shared.enums.MessageStatus;
import com.ecommerce.backend.shared.exception.RequestValidationException;
import com.ecommerce.backend.shared.response.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/v1/useraddresses")
@RestController
public class UserAddressController {
    private final UserAddressService userAddressService;

    @GetMapping
    public UserAddressResponse getUserAddresses(
            @RequestParam(value = "userID", required = false) BigInteger userID
    ) {
        List<UserAddressDTO> userAddressDTOList = null;

        if (userID == null) {
            userAddressDTOList = userAddressService.fetchAllUserAddresses();
        } else {
            userAddressDTOList = userAddressService.fetchAllUserAddressesByUserID(userID);
        }

        return new UserAddressResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                userAddressDTOList
        );
    }

    @GetMapping("{userAddressID}")
    public UserAddressResponse getUserAddressByID(
            @PathVariable("userAddressID") BigInteger userAddressID
    ) {
        var userAddressDTOList = List.of(userAddressService.fetchUserAddressByID(userAddressID));

        return new UserAddressResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                userAddressDTOList
        );
    }

    @PostMapping
    public UserAddressResponse postUserAddress(
            @Validated @RequestBody UserAddressRequest request,
            BindingResult errors
    ) {
        if (errors.hasErrors()) {
            throw new RequestValidationException(errors);
        }

        var userAddressDTOList = List.of(userAddressService.addUserAddress(request));

        return new UserAddressResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                userAddressDTOList
        );
    }

    @DeleteMapping("{userAddressID}")
    public BaseResponse deleteUserAddress(
            @PathVariable("userAddressID") BigInteger userAddressID
    ) {
        userAddressService.deleteUserAddress(userAddressID);

        return new BaseResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL
        );
    }

    @PutMapping("{userAddressID}")
    public UserAddressResponse putUserAddress(
            @PathVariable("userAddressID") BigInteger userAddressID,
            @Validated @RequestBody UserAddressRequest request,
            BindingResult errors
    ) {
        if (errors.hasErrors()) {
            throw new RequestValidationException(errors);
        }

        var userAddressDTOList = List.of(userAddressService.updateUserAddress(userAddressID, request));

        return new UserAddressResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                userAddressDTOList
        );
    }
}
