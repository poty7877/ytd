package com.tplinkdns.ysy.ytd.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "user")
@ToString(exclude = "userRoleList")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mno; // pk 사용자 id

    private String pw;

    private String email; // 사용자 이메일

    private String nickName; // 닉네임

    private boolean social;

    @ElementCollection(fetch = FetchType.LAZY)
    @Builder.Default
    private List<UserRole> userRoleList = new ArrayList<>();

    public void addRole(UserRole role) {
        userRoleList.add(role);
    }

    public void clearRole(){
        userRoleList.clear();
    }
}
