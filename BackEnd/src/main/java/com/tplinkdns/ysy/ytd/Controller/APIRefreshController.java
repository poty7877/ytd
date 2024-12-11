package com.tplinkdns.ysy.ytd.Controller;

import com.tplinkdns.ysy.ytd.util.CustomJWTException;
import com.tplinkdns.ysy.ytd.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Log4j2
public class APIRefreshController {

    @RequestMapping("/api/user/refresh")
    public Map<String, Object> refresh(@RequestHeader("Authorization") String authHeader, String refreshToken) {
        if (refreshToken == null) {
            throw new CustomJWTException("Refresh token 없음");
        }

        if (authHeader == null || authHeader.length() < 7) {
            throw new CustomJWTException("Bearer 오류");
        }

        String accessToken = authHeader.substring(7);

        // Access 토큰이 만료되지 않았다면
        if (checkExpiredToken(accessToken) == false) {
            return Map.of("accessToken", accessToken, "refreshToken", refreshToken);
        }

        // Refresh 토큰 검증
        Map<String, Object> claims = JWTUtil.validateToken(refreshToken);

        log.info("refresh Token ... claims" + claims);

        String newAccessToken = JWTUtil.generateToken(claims, 10);
        // 시간이 지났다면 리프레쉬토큰 재발급.
        String newRefreshToken = checkTime((Integer) claims.get("exp")) == true ? JWTUtil.generateToken(claims, 60 * 24) : refreshToken;

        return Map.of("accessToken", newAccessToken, "refreshToken", newRefreshToken);
    }

    private boolean checkTime(Integer exp) {
        // JWT exp를 날짜로 변환
        Date expDate = new Date((long) exp * (1000));

        // 현재 시간과의 차이 계산
        long gap = expDate.getTime() - System.currentTimeMillis();

        // 분단위 계산
        long leftMin = gap / (1000 * 60);

        // 1시간 미만?
        return leftMin < 60;
    }

    private boolean checkExpiredToken(String token) {
        try {
            JWTUtil.validateToken(token);
        } catch (CustomJWTException ex) {
            if (ex.getMessage().equals("만료된 JWT")) {
                return true;
            }
        }
        return false;
    }

}
