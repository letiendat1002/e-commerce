package com.ecommerce.backend.user;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class UserDTOMapper implements Function<User, UserDTO> {
    @Override
    public UserDTO apply(User user) {
        return new UserDTO(
                user.getUserID(),
                user.getEmail(),
                user.getAuthorities()
                        .stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList()),
                user.getFullName(),
                user.getGender(),
                user.getPhone(),
                user.getImage(),
                user.isLocked(),
                user.isEnabled()
        );
    }
}
