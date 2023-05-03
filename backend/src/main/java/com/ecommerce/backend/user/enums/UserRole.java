package com.ecommerce.backend.user.enums;

import com.google.common.collect.Sets;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;

import static com.ecommerce.backend.user.enums.UserPermission.*;

public enum UserRole {
    CUSTOMER(Sets.newHashSet(
            USER_ADDRESS_READ, USER_ADDRESS_WRITE,
            PRODUCT_READ,
            CATEGORY_READ,
            ORDER_READ, ORDER_WRITE
//            ORDER_DETAIL_READ,
//            RATING_READ, RATING_WRITE
    )),
    EMPLOYEE(Sets.newHashSet(
            USER_ADDRESS_READ, USER_ADDRESS_WRITE,
            PRODUCT_READ, PRODUCT_WRITE,
            CATEGORY_READ, CATEGORY_WRITE,
            ORDER_READ, ORDER_WRITE
//            ORDER_DETAIL_READ,
//            RATING_READ, RATING_WRITE
    )),
    ADMIN(Sets.newHashSet(
            USER_READ, USER_WRITE,
            USER_ADDRESS_READ, USER_ADDRESS_WRITE,
            PRODUCT_READ, PRODUCT_WRITE,
            CATEGORY_READ, CATEGORY_WRITE,
            ORDER_READ, ORDER_WRITE,
            ORDER_DETAIL_READ, ORDER_DETAIL_WRITE,
            RATING_READ, RATING_WRITE
    ));

    private final Set<UserPermission> permissions;

    UserRole(Set<UserPermission> permissions) {
        this.permissions = permissions;
    }

    public Set<UserPermission> getPermissions() {
        return permissions;
    }

    public Set<SimpleGrantedAuthority> getGrantedAuthorities() {
        var permissions = getPermissions()
                .stream()
                .map(
                        permission -> new SimpleGrantedAuthority(
                                permission.getPermission()
                        )
                )
                .collect(Collectors.toSet());

        permissions.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return permissions;
    }
}
