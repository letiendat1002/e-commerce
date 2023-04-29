package com.ecommerce.backend.shared.openapi;


import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("Ecommerce Application API")
                        .description("OpenAPI 3.0")
                        .license(new License()
                                .name("MIT")
                                .url("https://github.com/letiendat1002/e-commerce/blob/master/LICENSE")
                        ));
    }
}
