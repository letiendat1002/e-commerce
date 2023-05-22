package com.ecommerce.backend.util.email;

import com.ecommerce.backend.util.constants.VariableConstants;
import jakarta.mail.internet.InternetAddress;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class EmailSenderService {
    private final JavaMailSender mailSender;
    private final VariableConstants variableConstants;

    @Async
    public void sendEmail(CustomEmail customEmail) throws MailException {
        var message = new SimpleMailMessage();

        message.setTo(customEmail.email());
        message.setSubject(customEmail.subject());
        message.setText(customEmail.message());

        mailSender.send(message);
    }
}
