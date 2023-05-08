package com.ecommerce.backend.shared.email;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class EmailSenderServiceImpl implements EmailSenderService {
    private final JavaMailSender mailSender;

    @Override
    public void sendEmail(CustomEmail customEmail) throws MailException {
        var mail = new SimpleMailMessage();

        mail.setTo(customEmail.email());
        mail.setSubject(customEmail.subject());
        mail.setText(customEmail.message());

        mailSender.send(mail);
    }
}
