package com.ecommerce.backend.util.config;


import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Ecommerce Application API",
                version = "1.0"
        ),
        servers = {
                @Server(
                        description = "Local Server",
                        url = "http://localhost:8080/prod"
                ),
                @Server(
                        description = "Production Server",
                        url = "https://5i5iavxp88.execute-api.ap-southeast-1.amazonaws.com/prod"
                )
        }
)
public class OpenApiConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        final String securitySchemeName = "bearerAuth";
        return new OpenAPI()
                .addSecurityItem(
                        new SecurityRequirement()
                                .addList(securitySchemeName)
                )
                .components(
                        new Components()
                                .addSecuritySchemes(
                                        securitySchemeName,
                                        new SecurityScheme()
                                                .name(securitySchemeName)
                                                .type(SecurityScheme.Type.HTTP)
                                                .scheme("bearer")
                                                .bearerFormat("JWT")
                                )
                );
    }
}
