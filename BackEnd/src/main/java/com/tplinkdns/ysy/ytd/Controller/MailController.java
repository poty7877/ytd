package com.tplinkdns.ysy.ytd.Controller;

import com.tplinkdns.ysy.ytd.dto.MailDTO;
import com.tplinkdns.ysy.ytd.service.MailService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@RestController
@RequiredArgsConstructor
public class MailController {

    private final MailService mailService;

    @ResponseBody
    @PostMapping("/sendEmail")
    public ResponseEntity<String> emailCheck(@RequestBody MailDTO mailDTO) throws MessagingException{
        mailService.sendSimpleMessage(mailDTO.getEmail());
        return ResponseEntity.ok("SUCCESS");
    }

    @ResponseBody
    @PostMapping("/sendEmail2")
    public ResponseEntity<String> emailCheck2(@RequestBody MailDTO mailDTO) throws MessagingException {
        mailService.sendSimpleMessage2(mailDTO.getEmail());
        return ResponseEntity.ok("SUCCESS");
    }

    // 인증번호 검증
    @PostMapping("/verifyCode")
    public ResponseEntity<String> verifyCode(@RequestBody MailDTO mailDTO) {
        boolean isValid = mailService.verifyCode(mailDTO.getEmail(), mailDTO.getCode());
        return isValid ? ResponseEntity.ok("인증 성공") : ResponseEntity.badRequest().body("인증 실패");
    }
}
