package com.ecommerce.backend.user;

import com.ecommerce.backend.util.enums.MessageStatus;
import com.ecommerce.backend.util.exception.RequestValidationException;
import com.ecommerce.backend.util.response.BaseResponse;
import com.ecommerce.backend.util.security.enums.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.Collections;

@RequiredArgsConstructor
@RequestMapping("/api/v1/users")
@RestController
public class UserController {
    private final UserService userService;
    private final UserDTOMapper userDTOMapper;

    @GetMapping
    @PreAuthorize("hasAuthority('user:read_all')")
    public UserResponse getUsers() {
        var userDTOList = userService
                .fetchAllUsers()
                .stream()
                .map(userDTOMapper)
                .toList();

        return new UserResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                userDTOList
        );
    }

    @GetMapping("{userID}")
    @PreAuthorize("hasAuthority('user:read_one')")
    public UserResponse getUserByUserID(
            @PathVariable("userID") BigInteger userID
    ) {
        var userDTOList = Collections.singletonList(
                userDTOMapper.apply(userService.fetchUserByUserID(userID))
        );

        return new UserResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                userDTOList
        );
    }

    @GetMapping("/shipper/asc")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_EMPLOYEE')")
    public UserShipperResponse getShippersWithOrderCountASC() {
        var shipperList = userService.fetchShippersWithOrderCountASC();

        return new UserShipperResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                shipperList
        );
    }

    @GetMapping("/role")
    @PreAuthorize("hasAuthority('user:read_all')")
    public UserResponse getUsersByRole(
            @RequestParam(value = "role") UserRole role
    ) {
        var userDTOList = userService
                .fetchUsersByRole(role)
                .stream()
                .map(userDTOMapper)
                .toList();

        return new UserResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                userDTOList
        );
    }

    @PostMapping
    @PreAuthorize("hasAuthority('user:create')")
    public UserResponse postUser(
            @Validated @RequestBody UserRegistrationRequest request,
            BindingResult errors
    ) {
        if (errors.hasErrors()) {
            throw new RequestValidationException(errors);
        }

        var userDTOList = Collections.singletonList(
                userDTOMapper.apply(userService.addUser(request))
        );

        return new UserResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                userDTOList
        );
    }

    @PutMapping("{userID}")
    @PreAuthorize("hasAuthority('user:update')")
    public UserResponse putUser(
            @PathVariable("userID") BigInteger userID,
            @Validated @RequestBody UserUpdateRequest request,
            BindingResult errors
    ) {
        if (errors.hasErrors()) {
            throw new RequestValidationException(errors);
        }

        var userDTOList = Collections.singletonList(
                userDTOMapper.apply(userService.updateUser(userID, request))
        );

        return new UserResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                userDTOList
        );
    }

    @DeleteMapping("{userID}")
    @PreAuthorize("hasAuthority('user:delete')")
    public BaseResponse deleteUser(
            @PathVariable("userID") BigInteger userID
    ) {
        userService.deleteUser(userID);

        return new BaseResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL
        );
    }
}
