package com.tplinkdns.ysy.ytd.dto;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.time.LocalDateTime;
import java.util.*;

@Getter
@Setter
@ToString
// 스프링 시큐리티에서 이용하는 타입의 객체로 만들기 위해 Userdetails.User 클래스를 상속
public class UserDTO extends User {

    private Long mno;

    private String nickName;

    private String email;

    private String pw;

    private boolean social;

    private List<String> roleNames = new ArrayList<>();


    public UserDTO(String email, String pw, String nickName, boolean social, List<String> roleNames) {
        super(email, pw, roleNames.stream().map(str -> new SimpleGrantedAuthority("ROLE_"+str)).toList());

        this.email = email;
        this.pw = pw;
        this.social = social;
        this.nickName = nickName;
        this.roleNames = roleNames;
    }

    // 현재 사용자의 정보를 Map타입으로 반환하도록 구성 함
    // JWT 문자열 생성시 사용할 예정.
    public Map<String, Object> getClaims() {
        Map<String, Object> dataMap = new HashMap<>();
        dataMap.put("email", email);
        dataMap.put("nickName", nickName);
        dataMap.put("social", social);
        dataMap.put("roleNames", roleNames);
        dataMap.put("pw", pw);
        return dataMap;
    }
}
