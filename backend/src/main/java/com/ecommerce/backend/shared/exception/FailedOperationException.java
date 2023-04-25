package com.ecommerce.backend.shared.exception;

public class FailedOperationException extends RuntimeException {
    public FailedOperationException(String message) {
        super(message);
    }
}
