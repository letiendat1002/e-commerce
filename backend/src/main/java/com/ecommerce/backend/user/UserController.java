package com.ecommerce.backend.user;

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
@RequestMapping("/api/v1/users")
@RestController
public class UserController {
    private final UserService userService;

    @GetMapping
    public UserResponse getUsers() {
        var userDTOList = userService.fetchAllUsers();

        return new UserResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                userDTOList
        );
    }

    @GetMapping("{userID}")
    public UserResponse getUserByUserID(
            @PathVariable("userID") BigInteger userID
    ) {
        var userDTOList = List.of(userService.fetchUserByUserID(userID));

        return new UserResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                userDTOList
        );
    }

    @PostMapping
    public UserResponse postUser(
            @Validated @RequestBody UserRegistrationRequest request,
            BindingResult errors
    ) {
        if (errors.hasErrors()) {
            throw new RequestValidationException(errors);
        }

        var userDTOList = List.of(userService.addUser(request));

        return new UserResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                userDTOList
        );
    }

    @DeleteMapping("{userID}")
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
    public UserResponse putUser(
            @PathVariable("userID") BigInteger userID,
            @Validated @RequestBody UserUpdateRequest request,
            BindingResult errors
    ) {
        if (errors.hasErrors()) {
            throw new RequestValidationException(errors);
        }

        var userDTOList = List.of(userService.updateUser(userID, request));

        return new UserResponse(
                HttpStatus.OK.value(),
                MessageStatus.SUCCESSFUL,
                userDTOList
        );
    }
}
