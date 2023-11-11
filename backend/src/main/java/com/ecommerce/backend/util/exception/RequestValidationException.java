package com.ecommerce.backend.util.exception;

import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;

@RequiredArgsConstructor
public class RequestValidationException extends RuntimeException {
    private final BindingResult errors;

    private static String getValidationMessage(ObjectError error) {
        if (error instanceof FieldError fieldError) {
            var message = fieldError.getDefaultMessage();
            var invalidValue = fieldError.getRejectedValue();
            return "%s, but it was {%s}".formatted(message, invalidValue);
        }
        return error.getDefaultMessage();
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
