package com.ecommerce.backend.util.constants;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Data
public class VariableConstants {
    @Value("${env-variable.fe-url}")
    private String feUrl;

    @Value("${env-variable.be-url}")
    private String beUrl;
}
