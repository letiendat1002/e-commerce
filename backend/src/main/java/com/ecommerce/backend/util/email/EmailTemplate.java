package com.ecommerce.backend.util.email;

public class EmailTemplate {
    public static final String REGISTRATION_SUBJECT = "Registration Confirmation";
    public static final String RESET_PASSWORD_SUBJECT = "Password Reset Request";
    public static final String SIGNATURE = "--\nKind regards,\nLinkking Team";

    public static String getRegistrationMessage(String name, String registrationUrl) {
        return "Hello %s,\n\nThank you for registering account at %s. Before we can activate your account, one last step must be taken to complete your registration.\n\nTo confirm your registration, please visit this URL:\n\n%s\n\nThis link will expire in 15 minutes.\n\n%s"
                .formatted(name,
                        "Linkking",
                        registrationUrl,
                        SIGNATURE
                );
    }

    public static String getResetPasswordMessage(String name, String password) {
        var warning = "For security, you should change your password after logging in!";
        return "Hello %s,\n\nWe received a request to reset the password for your %s account.\n\nPlease use the password below to login:\n\n%s\n\n%s\n\n%s"
                .formatted(name,
                        "Linkking",
                        password,
                        warning,
                        SIGNATURE
                );
    }

    public static String createRegistrationUrl(String url, String token) {
        return url + "/api/v1/auth/activate?token=" + token;
    }
}
