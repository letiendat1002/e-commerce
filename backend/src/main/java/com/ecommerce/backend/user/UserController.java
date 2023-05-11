package com.ecommerce.backend.user;

import com.ecommerce.backend.shared.enums.MessageStatus;
import com.ecommerce.backend.shared.exception.RequestValidationException;
import com.ecommerce.backend.shared.response.BaseResponse;
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
    @PreAuthorize("hasAuthority('user:read')")
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
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_CUSTOMER')")
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

    @PostMapping
    @PreAuthorize("hasAuthority('user:write')")
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

    @DeleteMapping("{userID}")
    @PreAuthorize("hasAuthority('user:write')")
    public BaseResponse deleteUser(
            @PathVariable("userID") BigInteger userID
    ) {
        userService.deleteUser(userID);

        return new BaseResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL
        );
    }

    @PutMapping("{userID}")
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_CUSTOMER')")
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
}
