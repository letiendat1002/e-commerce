package com.ecommerce.backend.util.constants;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Data
public class VariableConstants {
    @Value("${env-variable.api-url}")
    private final String API_URL;
}
