package com.ecommerce.backend.util.exception;

public class FailedOperationException extends RuntimeException {
    public FailedOperationException(String message) {
        super(message);
    }
}
