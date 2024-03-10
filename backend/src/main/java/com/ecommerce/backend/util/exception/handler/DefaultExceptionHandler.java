package com.ecommerce.backend.util.exception.handler;

import com.ecommerce.backend.util.exception.*;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.UnexpectedTypeException;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.InvalidDataAccessResourceUsageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.io.IOException;
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

    @ExceptionHandler(NoHandlerFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ApiResponse handleException(
            NoHandlerFoundException exception,
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

    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResponse handleException(
            DataIntegrityViolationException exception,
            HttpServletRequest request) {

        var message = exception.getCause() != null
                ? (exception.getCause().getCause() != null
                ? exception.getCause().getCause().getMessage()
                : exception.getCause().getMessage())
                : exception.getMessage();

        return new ApiResponse(
                request.getRequestURI(),
                HttpStatus.BAD_REQUEST.value(),
                message,
                LocalDateTime.now()
        );
    }

    @ExceptionHandler(InvalidDataAccessResourceUsageException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResponse handleException(
            InvalidDataAccessResourceUsageException exception,
            HttpServletRequest request) {
        return new ApiResponse(
                request.getRequestURI(),
                HttpStatus.BAD_REQUEST.value(),
                exception.getCause().getCause().getMessage(),
                LocalDateTime.now()
        );
    }

    @ExceptionHandler(DuplicateResourceException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResponse handleException(
            DuplicateResourceException exception,
            HttpServletRequest request) {
        return new ApiResponse(
                request.getRequestURI(),
                HttpStatus.BAD_REQUEST.value(),
                exception.getMessage(),
                LocalDateTime.now()
        );
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResponse handleException(
            HttpMessageNotReadableException exception,
            HttpServletRequest request) {
        return new ApiResponse(
                request.getRequestURI(),
                HttpStatus.BAD_REQUEST.value(),
                exception.getMessage(),
                LocalDateTime.now()
        );
    }

    @ExceptionHandler(UnexpectedTypeException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResponse handleException(
            UnexpectedTypeException exception,
            HttpServletRequest request) {
        return new ApiResponse(
                request.getRequestURI(),
                HttpStatus.BAD_REQUEST.value(),
                exception.getMessage(),
                LocalDateTime.now()
        );
    }

    @ExceptionHandler(InsufficientAuthenticationException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ApiResponse handleException(
            InsufficientAuthenticationException exception,
            HttpServletRequest request) {
        return new ApiResponse(
                request.getRequestURI(),
                HttpStatus.FORBIDDEN.value(),
                exception.getMessage(),
                LocalDateTime.now()
        );
    }

    @ExceptionHandler(PasswordException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiResponse handleException(
            PasswordException exception,
            HttpServletRequest request) {
        return new ApiResponse(
                request.getRequestURI(),
                HttpStatus.BAD_REQUEST.value(),
                exception.getMessage(),
                LocalDateTime.now()
        );
    }

    @ExceptionHandler(BadCredentialsException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ApiResponse handleException(
            BadCredentialsException exception,
            HttpServletRequest request) {
        return new ApiResponse(
                request.getRequestURI(),
                HttpStatus.UNAUTHORIZED.value(),
                exception.getMessage(),
                LocalDateTime.now()
        );
    }

    @ExceptionHandler(AccessDeniedException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ApiResponse handleException(
            AccessDeniedException exception,
            HttpServletRequest request) {
        return new ApiResponse(
                request.getRequestURI(),
                HttpStatus.UNAUTHORIZED.value(),
                exception.getMessage(),
                LocalDateTime.now()
        );
    }

    @ExceptionHandler(JwtAuthenticationException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ApiResponse handleException(
            JwtAuthenticationException exception,
            HttpServletRequest request) {
        return new ApiResponse(
                request.getRequestURI(),
                HttpStatus.UNAUTHORIZED.value(),
                exception.getMessage(),
                LocalDateTime.now()
        );
    }

    @ExceptionHandler(ExpiredJwtException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ApiResponse handleException(
            ExpiredJwtException exception,
            HttpServletRequest request) {
        return new ApiResponse(
                request.getRequestURI(),
                HttpStatus.UNAUTHORIZED.value(),
                "JWT token is expired",
                LocalDateTime.now()
        );
    }

    @ExceptionHandler(MalformedJwtException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ApiResponse handleException(
            MalformedJwtException exception,
            HttpServletRequest request) {
        return new ApiResponse(
                request.getRequestURI(),
                HttpStatus.UNAUTHORIZED.value(),
                "JWT token is invalid",
                LocalDateTime.now()
        );
    }

    @ExceptionHandler(UnsupportedJwtException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ApiResponse handleException(
            UnsupportedJwtException exception,
            HttpServletRequest request) {
        return new ApiResponse(
                request.getRequestURI(),
                HttpStatus.UNAUTHORIZED.value(),
                "JWT token is unsupported",
                LocalDateTime.now()
        );
    }

    @ExceptionHandler(SignatureException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ApiResponse handleException(
            SignatureException exception,
            HttpServletRequest request) {
        return new ApiResponse(
                request.getRequestURI(),
                HttpStatus.UNAUTHORIZED.value(),
                "JWT token signature is invalid",
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

    @ExceptionHandler(NullPointerException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiResponse handleException(
            NullPointerException exception,
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

    @ExceptionHandler(IOException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiResponse handleException(
            IOException exception,
            HttpServletRequest request) {
        return new ApiResponse(
                request.getRequestURI(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                exception.getMessage(),
                LocalDateTime.now()
        );
    }

    @ExceptionHandler(HttpMessageNotWritableException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiResponse handleException(
            HttpMessageNotWritableException exception,
            HttpServletRequest request) {
        return new ApiResponse(
                request.getRequestURI(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                exception.getMessage(),
                LocalDateTime.now()
        );
    }

    @ExceptionHandler(DataAccessException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiResponse handleException(
            RuntimeException exception,
            HttpServletRequest request) {
        return new ApiResponse(
                request.getRequestURI(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                exception.getMessage(),
                LocalDateTime.now()
        );
    }

    @ExceptionHandler(Exception.class)
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
