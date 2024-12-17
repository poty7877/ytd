package com.tplinkdns.ysy.ytd.service;

import com.tplinkdns.ysy.ytd.dto.UserDTO;
import com.tplinkdns.ysy.ytd.dto.UserRequestDTO;
import com.tplinkdns.ysy.ytd.entity.User;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface UserService {

    // C
    void register(UserRequestDTO userDTO);

    // R
    UserRequestDTO get(String email);

    // U
    void modify(UserRequestDTO userDTO);

    // D
    void remove(Long mno);

    // 이메일 체크
    Boolean existEmail(String email);

    // 닉네임 체크
    Boolean existNickName(String nickName);

    UserDTO getKakaoMember(String accessToken);

    UserDTO getGoogleMember(String accessToken);

    UserDTO getNaverMember(String accessToken);

    default UserDTO entityToUserDTO(User user) {
        UserDTO dto = new UserDTO(
                user.getMno(),
                user.getEmail(),
                user.getPw(),
                user.getNickName(),
                user.isSocial(),
                user.getUserRoleList().stream().map(userRole -> userRole.name()).toList()
        );
        return dto;
    }
}
