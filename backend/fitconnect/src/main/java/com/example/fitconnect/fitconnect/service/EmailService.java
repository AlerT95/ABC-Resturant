package com.example.fitconnect.fitconnect.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendVerificationCode(String to, String verificationCode) {
        if (to == null || to.trim().isEmpty()) {
            throw new IllegalArgumentException("Email address cannot be null or empty");
        }
        if (verificationCode == null || verificationCode.trim().isEmpty()) {
            throw new IllegalArgumentException("Verification code cannot be null or empty");
        }

        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(to);
        mail.setFrom("thequizofyear@outlook.com");
        mail.setSubject("Verification Code");
        mail.setText("Your verification code is: " + verificationCode);

        try {
            javaMailSender.send(mail);
        } catch (MailException e) {
            throw new RuntimeException("Failed to send verification code", e);
        } catch (Exception e) {
            throw new RuntimeException("An unexpected error occurred while sending verification code", e);
        }
    }
}