package com.ecommerce.backend.shared.exception;

public class InvalidArgumentException extends RuntimeException {
    public InvalidArgumentException(String message) {
        super(message);
    }
}
