package com.tplinkdns.ysy.ytd.util;


import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.log4j.Log4j2;

import javax.crypto.SecretKey;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.Map;

@Log4j2
public class JWTUtil {

    private static String key = "1029384756102938475610293847561029384756";

    public static String generateToken(Map<String, Object> valueMap, int min) {
        SecretKey key = null;
        try {
            key = Keys.hmacShaKeyFor(JWTUtil.key.getBytes("UTF-8"));
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

        String jwtStr = Jwts.builder()
                .claims(valueMap)
                .issuedAt(Date.from(ZonedDateTime.now().toInstant()))
                .expiration(Date.from(ZonedDateTime.now().plusMinutes(min).toInstant()))
                .signWith(key)
                .compact();

        return jwtStr;
    }

    public static Map<String, Object> validateToken(String token) {
        Map<String, Object> claim = null;

        try {
            SecretKey key = Keys.hmacShaKeyFor(JWTUtil.key.getBytes("UTF-8"));

            claim = Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token).getPayload();
        } catch (MalformedJwtException malformedJwtException) {
            throw new CustomJWTException("잘못된 형식의 JWT");
        } catch (ExpiredJwtException expiredJwtException) {
            throw new CustomJWTException("만료된 JWT");
        } catch (InvalidClaimException invalidClaimException){
            throw new CustomJWTException("인증되지 않은 JWT");
        } catch (JwtException jwtException) {
            throw new CustomJWTException("JWT 에러");
        } catch (Exception e) {
            throw new CustomJWTException("JWT 검증 에러발생");
        }

        return claim;
    }
}
