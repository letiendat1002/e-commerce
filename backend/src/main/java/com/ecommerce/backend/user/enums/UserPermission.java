package com.ecommerce.backend.user.enums;

public enum UserPermission {
    USER_READ("user:read"),
    USER_WRITE("user:write"),
    USER_ADDRESS_READ("user_address:read"),
    USER_ADDRESS_WRITE("user_address:write"),
    PRODUCT_READ("product:read"),
    PRODUCT_WRITE("product:write"),
    CATEGORY_READ("category:read"),
    CATEGORY_WRITE("category:write"),
    ORDER_READ("order:read"),
    ORDER_WRITE("order:write"),
    ORDER_DETAIL_READ("order_detail:read"),
    ORDER_DETAIL_WRITE("order_detail:write"),
    RATING_READ("rating:read"),
    RATING_WRITE("rating:write");

    private final String permission;

    UserPermission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
