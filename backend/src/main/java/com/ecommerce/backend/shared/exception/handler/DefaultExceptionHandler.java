package com.ecommerce.backend.shared.exception.handler;

import com.ecommerce.backend.shared.exception.*;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class DefaultExceptionHandler {
    @ExceptionHandler(ResourceNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiResponse handleException(
            ResourceNotFoundException exception,
            HttpServletRequest request) {
        return new ApiResponse(
                request.getRequestURI(),
                HttpStatus.NOT_FOUND.value(),
                exception.getMessage(),
                LocalDateTime.now()
        );
    }

    @ExceptionHandler(InvalidArgumentException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResponse handleException(
            InvalidArgumentException exception,
            HttpServletRequest request) {
        return new ApiResponse(
                request.getRequestURI(),
                HttpStatus.BAD_REQUEST.value(),
                exception.getMessage(),
                LocalDateTime.now()
        );
    }

    @ExceptionHandler(RequestValidationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResponse handleException(
            RequestValidationException exception,
            HttpServletRequest request) {
        return new ApiResponse(
                request.getRequestURI(),
                HttpStatus.BAD_REQUEST.value(),
                exception.getMessage(),
                LocalDateTime.now()
        );
    }

    @ExceptionHandler(DuplicateResourceException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ApiResponse handleException(
            DuplicateResourceException exception,
            HttpServletRequest request) {
        return new ApiResponse(
                request.getRequestURI(),
                HttpStatus.CONFLICT.value(),
                exception.getMessage(),
                LocalDateTime.now()
        );
    }

    @ExceptionHandler(FailedOperationException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiResponse handleException(
            FailedOperationException exception,
            HttpServletRequest request) {
        return new ApiResponse(
                request.getRequestURI(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                exception.getMessage(),
                LocalDateTime.now()
        );
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiResponse handleException(
            MethodArgumentNotValidException exception,
            HttpServletRequest request) {
        return new ApiResponse(
                request.getRequestURI(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                exception.getMessage(),
                LocalDateTime.now()
        );
    }


    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiResponse handleException(
            Exception exception,
            HttpServletRequest request) {
        return new ApiResponse(
                request.getRequestURI(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                exception.getMessage(),
                LocalDateTime.now()
        );
    }
}
