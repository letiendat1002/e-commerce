package com.ecommerce.backend.util.email;

import java.util.regex.Pattern;

public class EmailPatternMatcher {
    private static final String regexPattern = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$";

    public static boolean patternMatches(String email) {
        return Pattern.compile(regexPattern)
                .matcher(email)
                .matches();
    }
}
