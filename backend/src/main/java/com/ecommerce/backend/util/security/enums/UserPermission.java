package com.ecommerce.backend.util.security.enums;

public enum UserPermission {
    USER_READ_ALL("user:read_all"),
    USER_READ_ONE("user:read_one"),
    USER_CREATE("user:create"),
    USER_UPDATE("user:update"),
    USER_DELETE("user:delete"),
    USER_ADDRESS_READ_ALL("user_address:read_all"),
    USER_ADDRESS_READ_ONE("user_address:read_one"),
    USER_ADDRESS_CREATE("user_address:create"),
    USER_ADDRESS_UPDATE("user_address:update"),
    USER_ADDRESS_DELETE("user_address:delete"),
    PRODUCT_CREATE("product:create"),
    PRODUCT_UPDATE("product:update"),
    PRODUCT_DELETE("product:delete"),
    CATEGORY_CREATE("category:create"),
    CATEGORY_UPDATE("category:update"),
    CATEGORY_DELETE("category:delete"),
    ORDER_READ_ALL("order:read_all"),
    ORDER_READ_ONE("order:read_one"),
    ORDER_CREATE("order:create"),
    ORDER_UPDATE("order:update"),
    ORDER_DELETE("order:delete"),
    ORDER_DETAIL_READ_ALL("order_detail:read_all"),
    ORDER_DETAIL_READ_ONE("order_detail:read_one"),
    ORDER_DETAIL_CREATE("order_detail:create"),
    ORDER_DETAIL_UPDATE("order_detail:update"),
    RATING_CREATE("rating:create"),
    RATING_UPDATE("rating:update"),
    RATING_DELETE("rating:delete"),
    AUTH_CHANGE_PASSWORD("auth:change_password");

    private final String permission;

    UserPermission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
