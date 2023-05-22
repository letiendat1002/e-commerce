package com.ecommerce.backend.util.security.util;

import org.apache.commons.lang3.RandomStringUtils;

import java.util.Collections;
import java.util.stream.Collectors;

public class PasswordGenerator {
    public String generateRandomPassword() {
        var upperCaseLetters = RandomStringUtils.random(
                3,
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
        var numbers = RandomStringUtils.randomNumeric(3);
        var specialChar = RandomStringUtils.random(3, "!#$%&()*+,-./");
        var totalChars = RandomStringUtils.randomAlphanumeric(3);

        var builder = new StringBuilder();
        var combinedChars = builder
                .append(upperCaseLetters)
                .append(lowerCaseLetters)
                .append(numbers)
                .append(specialChar)
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
