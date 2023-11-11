package com.ecommerce.backend.util.security;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Collections;
import java.util.stream.Collectors;

@Configuration
public class PasswordGenerator {
    @Bean
    public String generateRandomPassword() {
        var upperCaseLetters = RandomStringUtils.random(
                4,
                65,
                90,
                true,
                true
        );
        var lowerCaseLetters = RandomStringUtils.random(
                4,
                97,
                122,
                true,
                true
        );
        var numbers = RandomStringUtils.randomNumeric(4);
        var totalChars = RandomStringUtils.randomAlphanumeric(4);

        var builder = new StringBuilder();
        var combinedChars = builder
                .append(upperCaseLetters)
                .append(lowerCaseLetters)
                .append(numbers)
                .append(totalChars);
        var pwdChars = combinedChars.chars()
                .mapToObj(c -> (char) c)
                .collect(Collectors.toList());

        Collections.shuffle(pwdChars);

        return pwdChars
                .stream()
                .collect(
                        StringBuilder::new,
                        StringBuilder::append,
                        StringBuilder::append
                )
                .toString();
    }
}
