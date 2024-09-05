package com.example.fitconnect.fitconnect.service;

import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class VerificationCode {

    private static final int CODE_LENGTH = 16; // length of the verification code

    public String generateCode() {
        Random random = new Random();
        StringBuilder code = new StringBuilder();

        for (int i = 0; i < CODE_LENGTH; i++) {
            int randomType = random.nextInt(2); // 0 for digit, 1 for letter

            if (randomType == 0) {
                code.append(random.nextInt(10)); // generate a random digit
            } else {
                char randomChar = (char) ('A' + random.nextInt(26)); // generate a random uppercase letter
                code.append(randomChar);
            }
        }

        return code.toString();
    }
}