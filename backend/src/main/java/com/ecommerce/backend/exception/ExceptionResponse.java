package com.ecommerce.backend.exception;

import java.time.LocalDateTime;

public record ExceptionResponse(
        String path,
        String message,
        int httpStatusCode,
        LocalDateTime localDateTime
) {
}
