package com.ecommerce.backend.util.security;

import com.ecommerce.backend.util.security.jwt.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    private final AuthenticationProvider authenticationProvider;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final AuthenticationEntryPoint authenticationEntryPoint;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests()
                .requestMatchers(
                        "/",
                        "/swagger-ui/**",
                        "/swagger-ui.html",
                        "/swagger-ui*",
                        "/swagger-ui.css",
                        "/swagger-ui-bundle.js",
                        "/swagger-ui-standalone-preset.js",
                        "/api-docs",
                        "/api-docs/**",
                        "/index.html",
                        "/favicon.ico",
                        "/webjars/**",
                        "/webjars/swagger-ui/3.1.5/**",
                        "/actuator/health"
                )
                .permitAll()
                .requestMatchers(
                        HttpMethod.GET,
                        "/api/v*/products",
                        "/api/v*/categories",
                        "/api/v*/products/**",
                        "/api/v*/categories/**",
                        "/api/v*/ratings",
                        "/api/v*/auth/**",
                        "/api/v*/keep-alive"
                )
                .permitAll()
                .requestMatchers(
                        HttpMethod.POST,
                        "/api/v*/auth/**"
                )
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                )
                .exceptionHandling()
                .authenticationEntryPoint(authenticationEntryPoint);

        return http.build();
    }
}
