package com.tplinkdns.ysy.ytd.service;

import com.tplinkdns.ysy.ytd.dto.UserDTO;
import com.tplinkdns.ysy.ytd.dto.UserRequestDTO;

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
}
