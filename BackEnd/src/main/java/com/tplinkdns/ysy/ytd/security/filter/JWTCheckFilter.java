package com.tplinkdns.ysy.ytd.security.filter;

import com.google.gson.Gson;
import com.tplinkdns.ysy.ytd.dto.UserDTO;
import com.tplinkdns.ysy.ytd.util.JWTUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

@Log4j2
public class JWTCheckFilter extends OncePerRequestFilter {


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("=============== JWT Check Filter 실행 ===============");

        String authHeaderStr = request.getHeader("Authorization");

        try {
            //Bearer accessToken
            String accessToken = authHeaderStr.substring(7); // Bearer
            Map<String, Object> claims = JWTUtil.validateToken(accessToken); // 검증

            log.info("JWT Claims : " + claims);

            String email = (String) claims.get("email");
            String pw = (String) claims.get("pw");
            String nickName = (String) claims.get("nickName");
            Boolean social = (Boolean) claims.get("social");
            List<String> roleNames = (List<String>) claims.get("roleNames");

            UserDTO userDTO = new UserDTO(email, pw, nickName, social, roleNames);

            log.info("========================");
            log.info("userDTO 확인 : " + userDTO );
            log.info(userDTO.getAuthorities());

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDTO, pw, userDTO.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);

            filterChain.doFilter(request, response);

        } catch (Exception e) {
            log.error("JWT Check 에러 발생");
            log.error(e.getMessage());

            Gson gson = new Gson();
            String msg = gson.toJson(Map.of("error", "ERROR_ACCESS_TOKEN"));

            response.setContentType("application/json");
            PrintWriter printWriter = response.getWriter();
            printWriter.write(msg);
            printWriter.close();
        }


    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws  ServletException{
        String path = request.getRequestURI();

        // ajax 통신
        if(request.getMethod().equals("OPTIONS")){
            return true;
        }
        log.info("URI 체크 :" + path);

        // 나중에 필요한 부분만 설정하도록.
        if(path.startsWith("/")) {
            return true;
        }

        return false;
    }
}
