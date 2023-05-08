package com.ecommerce.backend.user;

import com.ecommerce.backend.order.OrderService;
import com.ecommerce.backend.shared.exception.DuplicateResourceException;
import com.ecommerce.backend.shared.exception.FailedOperationException;
import com.ecommerce.backend.shared.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {
    private final UserDAO userDAO;
    private final UserDTOMapper userDTOMapper;
    private final PasswordEncoder passwordEncoder;
    private final OrderService orderService;

    @Override
    public List<UserDTO> fetchAllUsers() {
        return userDAO.selectAllUsers()
                .stream()
                .map(userDTOMapper)
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO fetchUserByUserID(BigInteger userID) {
        return userDTOMapper.apply(selectUserByUserIdOrThrow(userID));
    }

    @Override
    public UserDTO fetchUserByEmail(String email) {
        return userDTOMapper.apply(selectUserByEmailOrThrow(email));
    }

    private User selectUserByEmailOrThrow(String email) {
        return userDAO
                .selectUserByEmail(email)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "User not found by email {%s}".formatted(email)
                        )
                );
    }

    private User selectUserByUserIdOrThrow(BigInteger userID) {
        return userDAO
                .selectUserByID(userID)
                .orElseThrow(
                        () -> new ResourceNotFoundException(
                                "User not found by userID {%d}".formatted(userID)
                        )
                );
    }

    @Override
    public UserDTO addUser(UserRegistrationRequest request) {
        checkIfUserNotExistsByEmailOrThrow(request.email());
        checkIfUserNotExistsByPhoneOrThrow(request.phone());

        var user = new User(
                request.email(),
                passwordEncoder.encode(request.password()),
                request.fullName(),
                request.gender(),
                request.phone(),
                request.image()
        );

        return userDAO
                .insertUser(user)
                .map(userDTOMapper)
                .orElseThrow(
                        () -> new FailedOperationException(
                                "Failed to add user"
                        )
                );
    }

    private void checkIfUserNotExistsByEmailOrThrow(String email) {
        var isExisted = userDAO.existsUserByEmail(email);
        if (isExisted) {
            throw new DuplicateResourceException(
                    "Email {%s} is already taken".formatted(email)
            );
        }
    }

    private void checkIfUserNotExistsByPhoneOrThrow(String phone) {
        var isExisted = userDAO.existsUserByPhone(phone);
        if (isExisted) {
            throw new DuplicateResourceException(
                    "Phone {%s} is already taken".formatted(phone)
            );
        }
    }

    @Override
    public UserDTO updateUser(BigInteger userID, UserUpdateRequest request) {
        var user = selectUserByUserIdOrThrow(userID);

        checkIfOtherUserExistsByPhoneOrThrow(request.phone(), userID);
        checkAndUpdateChangesOrThrow(request, user);

        return userDAO
                .updateUser(user)
                .map(userDTOMapper)
                .orElseThrow(
                        () -> new FailedOperationException(
                                "Failed to update user"
                        )
                );
    }

    private void checkIfOtherUserExistsByPhoneOrThrow(String phone, BigInteger userID) {
        var isExisted = userDAO.existsOtherUserByPhone(phone, userID);
        if (isExisted) {
            throw new DuplicateResourceException(
                    "Phone {%s} is already taken".formatted(phone)
            );
        }
    }

    private void checkAndUpdateChangesOrThrow(UserUpdateRequest request, User user) {
        var isChanged = false;

        if (!request.fullName().equals(user.getFullName())
        ) {
            user.setFullName(request.fullName());
            isChanged = true;
        }

        if (!request.gender().equals(user.getGender())
        ) {
            user.setGender(request.gender());
            isChanged = true;
        }

        if (!request.phone().equals(user.getPhone())
        ) {
            user.setPhone(request.phone());
            isChanged = true;
        }

        if (!request.image().equals(user.getImage())
        ) {
            user.setImage(request.image());
            isChanged = true;
        }

        if (!request.roles().get(0).equals(user.getRole())
        ) {
            user.setRole(request.roles().get(0));
            isChanged = true;
        }

        if (!isChanged) {
            throw new DuplicateResourceException(
                    "No data changes detected"
            );
        }
    }

    @Override
    @Transactional
    public void deleteUser(BigInteger userID) {
        checkIfUserExistsByIdOrThrow(userID);

        orderService
                .fetchAllOrdersByUserID(userID)
                .forEach(
                        order -> orderService.deleteOrder(order.orderID())
                );

        userDAO.deleteUserByID(userID);
    }

    private void checkIfUserExistsByIdOrThrow(BigInteger userID) {
        var isExisted = userDAO.existsUserByID(userID);
        if (!isExisted) {
            throw new ResourceNotFoundException(
                    "User not found by userID {%d}".formatted(userID)
            );
        }
    }
}
