package com.ecommerce.backend.user;

public record UserLockRequest(
        LockType lockType,
        int duration
) {
}
