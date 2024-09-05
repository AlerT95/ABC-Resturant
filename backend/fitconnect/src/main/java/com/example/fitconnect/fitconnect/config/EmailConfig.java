package com.example.fitconnect.fitconnect.config;


import java.util.Properties;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

@Configuration
public class EmailConfig {

    @Value("thequizofyear@outlook.com")
    private String username;

    @Value("Sasidu5000")
    private String password;

    @Value("smtp.office365.com")
    private String host;

    @Value("587")
    private int port;

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(host);
        mailSender.setPort(port);
        mailSender.setUsername(username);
        mailSender.setPassword(password);

        mailSender.setJavaMailProperties(getMailProperties());

        return mailSender;
    }

    private Properties getMailProperties() {
        Properties properties = new Properties();
        properties.setProperty("mail.transport.protocol", "smtp");
        properties.setProperty("mail.smtp.auth", "true");
        properties.setProperty("mail.smtp.starttls.enable", "true"); 
        properties.setProperty("mail.smtp.starttls.required", "true"); // Required STARTTLS
        properties.setProperty("mail.smtp.ssl.enable", "false"); // Disable SSL if STARTTLS is enabled
        properties.setProperty("mail.debug", "true");
        return properties;
    }
}