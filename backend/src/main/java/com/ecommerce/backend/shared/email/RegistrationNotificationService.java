package com.ecommerce.backend.shared.email;

import com.ecommerce.backend.shared.constants.VariableConstants;
import com.ecommerce.backend.user.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class RegistrationNotificationService {
    private final JavaMailSender mailSender;

    public void sendEmail(UserDTO user) throws MailException {
        var recipientAddress = user.email();
        var subject = "Registration Confirmation";
        var confirmationUrl = VariableConstants.HOST + "/activate?code="; // + user.getConfirmationToken();
        var signature = "\nKind regards,\nLinkking Team";
        var message = "Hello %s,\n\nThank you for registering for an account at %s. Before we can\nactivate your account, one last step must be taken to complete your\nregistration.\n\nTo confirm your registration, please visit this URL:\n\n%s\n\n%s"
                .formatted(user.email(), "Linkking", confirmationUrl, signature);
        var mail = new SimpleMailMessage();

        mail.setTo(recipientAddress);
        mail.setSubject(subject);
        mail.setText(message);

        mailSender.send(mail);
    }
}
