package com.ecommerce.backend.shared.exception;

import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;

@RequiredArgsConstructor
public class RequestValidationException extends RuntimeException {
    private final BindingResult errors;

    private static String getValidationMessage(ObjectError error) {
        if (error instanceof FieldError fieldError) {
            String className = fieldError.getObjectName();
            String property = fieldError.getField();
            Object invalidValue = fieldError.getRejectedValue();
            String message = fieldError.getDefaultMessage();
            return String.format(
                    "%s.%s %s, but it was {%s}",
                    className,
                    property,
                    message,
                    invalidValue);
        }
        return String.format("%s: %s", error.getObjectName(), error.getDefaultMessage());
    }

    public String getMessage() {
        return errors
                .getAllErrors()
                .stream()
                .map(RequestValidationException::getValidationMessage)
                .toList()
                .toString();
    }
}
