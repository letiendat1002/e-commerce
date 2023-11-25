package com.ecommerce.backend.util.security.enums;

import com.google.common.collect.Sets;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;

import static com.ecommerce.backend.util.security.enums.UserPermission.*;

public enum UserRole {
    CUSTOMER(Sets.newHashSet(
            USER_READ_ONE,
            USER_UPDATE,
            USER_ADDRESS_READ_ALL, USER_ADDRESS_READ_ONE,
            USER_ADDRESS_CREATE, USER_ADDRESS_UPDATE, USER_ADDRESS_DELETE,
            ORDER_READ_ALL, ORDER_READ_ONE,
            ORDER_CREATE, ORDER_UPDATE, ORDER_DELETE,
            ORDER_DETAIL_READ_ALL, ORDER_DETAIL_READ_ONE,
            ORDER_DETAIL_CREATE, ORDER_DETAIL_UPDATE,
            RATING_CREATE, RATING_UPDATE, RATING_DELETE,
            AUTH_CHANGE_PASSWORD
    )),
    SHIPPER(Sets.newHashSet(
            USER_READ_ONE,
            USER_UPDATE,
            USER_ADDRESS_READ_ALL, USER_ADDRESS_READ_ONE,
            USER_ADDRESS_CREATE, USER_ADDRESS_UPDATE, USER_ADDRESS_DELETE,
            ORDER_READ_ALL, ORDER_READ_ONE,
            ORDER_CREATE, ORDER_UPDATE, ORDER_DELETE,
            ORDER_DETAIL_READ_ALL, ORDER_DETAIL_READ_ONE,
            ORDER_DETAIL_CREATE, ORDER_DETAIL_UPDATE,
            RATING_CREATE, RATING_UPDATE, RATING_DELETE,
            AUTH_CHANGE_PASSWORD
    )),
    EMPLOYEE(Sets.newHashSet(
            USER_READ_ONE,
            USER_UPDATE,
            PRODUCT_CREATE, PRODUCT_UPDATE, PRODUCT_DELETE,
            CATEGORY_CREATE, CATEGORY_UPDATE, CATEGORY_DELETE,
            ORDER_READ_ALL, ORDER_READ_ONE,
            ORDER_UPDATE, ORDER_DELETE,
            ORDER_DETAIL_READ_ALL, ORDER_DETAIL_READ_ONE,
            AUTH_CHANGE_PASSWORD
    )),
    ADMIN(Sets.newHashSet(
            USER_READ_ALL, USER_READ_ONE,
            USER_CREATE, USER_UPDATE, USER_DELETE,
            USER_ADDRESS_READ_ALL, USER_ADDRESS_READ_ONE,
            USER_ADDRESS_CREATE, USER_ADDRESS_UPDATE, USER_ADDRESS_DELETE,
            PRODUCT_CREATE, PRODUCT_UPDATE, PRODUCT_DELETE,
            CATEGORY_CREATE, CATEGORY_UPDATE, CATEGORY_DELETE,
            ORDER_READ_ALL, ORDER_READ_ONE,
            ORDER_CREATE, ORDER_UPDATE, ORDER_DELETE,
            ORDER_DETAIL_READ_ALL, ORDER_DETAIL_READ_ONE,
            ORDER_DETAIL_CREATE, ORDER_DETAIL_UPDATE,
            RATING_CREATE, RATING_UPDATE, RATING_DELETE,
            AUTH_CHANGE_PASSWORD
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
