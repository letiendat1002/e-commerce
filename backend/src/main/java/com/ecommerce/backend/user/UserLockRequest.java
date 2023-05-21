package com.ecommerce.backend.user;

import com.ecommerce.backend.user.enums.LockDurationType;

public record UserLockRequest(
        LockDurationType lockDurationType,
        int duration
) {
}
