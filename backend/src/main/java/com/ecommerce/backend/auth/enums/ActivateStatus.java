package com.ecommerce.backend.auth.enums;

public enum ActivateStatus {
    ACTIVATED("Account activated successfully. You can close this tab"),
    ALREADY_ACTIVATED("Account already activated. You can close this tab");

    private final String message;

    ActivateStatus(String message) {
        this.message = message;
    }

    public String message() {
        return message;
    }
}
