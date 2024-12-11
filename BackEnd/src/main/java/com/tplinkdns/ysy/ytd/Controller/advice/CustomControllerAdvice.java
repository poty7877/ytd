package com.tplinkdns.ysy.ytd.Controller.advice;

import com.tplinkdns.ysy.ytd.util.CustomJWTException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class CustomControllerAdvice {

    @ExceptionHandler
    protected ResponseEntity<?> handleJWTException(CustomJWTException e) {
        String msg = e.getMessage();

        return ResponseEntity.ok().body(Map.of("error", msg));
    }
}
