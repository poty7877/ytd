package com.tplinkdns.ysy.ytd.service;


import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;

import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class MailService {

    private static final String senderEmail = "kuc00623@gmail.com";
    private final JavaMailSender javaMailSender;

    private final Map<String, String> verificationCodes = new ConcurrentHashMap<String, String>();

    // 인증번호 만료 시간 저장소 (이메일 -> 만료 시간)
    private final Map<String, Long> expirationTimes = new ConcurrentHashMap<>();
    private static final long EXPIRATION_TIME = 1800000L; // 30분

    public String createNumber() {
        Random random = new Random();
        StringBuilder key = new StringBuilder();

        for (int i = 0; i < 8; i++) {
            int index = random.nextInt(3);

            switch (index) {
                case 0 -> key.append((char) (random.nextInt(26) + 97)); // 소문자
                case 1 -> key.append((char) (random.nextInt(26) + 65)); // 대문자
                case 2 -> key.append(random.nextInt(10)); // 숫자
            }
        }
        return key.toString();
    }

    public MimeMessage createMail(String mail, String number) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();

        message.setFrom(senderEmail);
        message.setRecipients(MimeMessage.RecipientType.TO, mail);
        message.setSubject("ytd 이메일 인증");
        String body = "";
        body += "<h3>요청하신 인증 번호 입니다.</h3>";
        body += "<h1>" + number + "</h1>";
        body += "<h3>감사합니다.</h3>";
        message.setText(body, "UTF-8", "html");

        return message;
    }

    public String sendSimpleMessage(String sendEmail) throws MessagingException {
        String number = createNumber();
        MimeMessage message = createMail(sendEmail, number);

        try {
            javaMailSender.send(message);
            verificationCodes.put(sendEmail, number);
            expirationTimes.put(sendEmail, System.currentTimeMillis() + EXPIRATION_TIME);
        } catch (MailException e) {
            e.printStackTrace();
            throw new IllegalArgumentException("메일 발송 중 오류가 발생했습니다.");
        }

        return number;
    }

    public boolean verifyCode(String email, String code) {
        if (!verificationCodes.containsKey(email)) {
            return false;
        }

        if (System.currentTimeMillis() > expirationTimes.get(email)) {
            verificationCodes.remove(email);
            expirationTimes.remove(email);
            return false;
        }

        boolean isValid = verificationCodes.get(email).equals(code);
        if (isValid) {
            verificationCodes.remove(email);
            expirationTimes.remove(email);
        }
        return isValid;
    }
}
