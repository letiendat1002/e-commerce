package com.ecommerce.backend.shared.email;

public class EmailTemplate {
    public static final String REGISTRATION_SUBJECT = "Registration Confirmation";
    public static final String SIGNATURE = "--\nKind regards,\nLinkking Team";

    public static String getRegistrationMessage(String name, String registrationUrl) {
        return "Hello %s,\n\nThank you for registering for an account at %s. Before we can\nactivate your account, one last step must be taken to complete your\nregistration.\n\nTo confirm your registration, please visit this URL:\n\n%s\n\n%s"
                .formatted(name,
                        "Linkking",
                        registrationUrl,
                        SIGNATURE
                );
    }

    public static String createRegistrationUrl(String url, String token) {
        return url + "/activate?token=" + token;
    }
}
