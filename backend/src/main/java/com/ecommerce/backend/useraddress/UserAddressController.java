package com.ecommerce.backend.useraddress;


import com.ecommerce.backend.util.enums.MessageStatus;
import com.ecommerce.backend.util.exception.RequestValidationException;
import com.ecommerce.backend.util.response.BaseResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/api/v1/useraddresses")
@RestController
public class UserAddressController {
    private final UserAddressService userAddressService;
    private final UserAddressDTOMapper userAddressDTOMapper;

    @GetMapping
    @PreAuthorize("hasAuthority('user_address:read_all')")
    public UserAddressResponse getUserAddresses(
            @RequestParam(value = "userID", required = false) BigInteger userID
    ) {
        List<UserAddressDTO> userAddressDTOList;

        if (userID == null) {
            userAddressDTOList = userAddressService
                    .fetchAllUserAddresses()
                    .stream()
                    .map(userAddressDTOMapper)
                    .toList();
        } else {
            userAddressDTOList = userAddressService
                    .fetchAllUserAddressesByUserID(userID)
                    .stream()
                    .map(userAddressDTOMapper)
                    .toList();
        }

        return new UserAddressResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                userAddressDTOList
        );
    }

    @GetMapping("{userAddressID}")
    @PreAuthorize("hasAuthority('user_address:read_one')")
    public UserAddressResponse getUserAddressByID(
            @PathVariable("userAddressID") BigInteger userAddressID
    ) {
        var userAddressDTOList = Collections.singletonList(
                userAddressDTOMapper.apply(
                        userAddressService.fetchUserAddressByID(userAddressID)
                )
        );

        return new UserAddressResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                userAddressDTOList
        );
    }

    @PostMapping
    @PreAuthorize("hasAuthority('user_address:create')")
    public UserAddressResponse postUserAddress(
            @Validated @RequestBody UserAddressAddRequest request,
            BindingResult errors
    ) {
        if (errors.hasErrors()) {
            throw new RequestValidationException(errors);
        }

        var userAddressDTOList = Collections.singletonList(
                userAddressDTOMapper.apply(
                        userAddressService.addUserAddress(request)
                )
        );

        return new UserAddressResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                userAddressDTOList
        );
    }

    @PutMapping("{userAddressID}")
    @PreAuthorize("hasAuthority('user_address:update')")
    public UserAddressResponse putUserAddress(
            @PathVariable("userAddressID") BigInteger userAddressID,
            @Validated @RequestBody UserAddressUpdateRequest request,
            BindingResult errors
    ) {
        if (errors.hasErrors()) {
            throw new RequestValidationException(errors);
        }

        var userAddressDTOList = Collections.singletonList(
                userAddressDTOMapper.apply(
                        userAddressService
                                .updateUserAddress(userAddressID, request)
                )
        );

        return new UserAddressResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                userAddressDTOList
        );
    }

    @DeleteMapping("{userAddressID}")
    @PreAuthorize("hasAuthority('user_address:delete')")
    public BaseResponse deleteUserAddress(
            @PathVariable("userAddressID") BigInteger userAddressID
    ) {
        userAddressService.deleteUserAddress(userAddressID);

        return new BaseResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL
        );
    }
}
