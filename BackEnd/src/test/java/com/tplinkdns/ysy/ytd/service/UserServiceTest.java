package com.tplinkdns.ysy.ytd.service;

import com.tplinkdns.ysy.ytd.dto.UserRequestDTO;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
@Log4j2
class UserServiceTest {

    @Autowired
    UserService userService;

    @Test
    public void register() {
        UserRequestDTO userDTO = UserRequestDTO.builder()
                .nickName("서비스테스트")
                .email("test2@test.com")
                .pw("2222")
                .build();
        userService.register(userDTO);
    }

    @Test
    public void modify() {
        UserRequestDTO userDTO = UserRequestDTO.builder()
                .mno(5L)
                .nickName("수정 서비스")
                .email("test2@test.com")
                .pw("3333")
                .build();
        userService.modify(userDTO);
    }

    @Test
    public void delete() {
        userService.remove(5L);
    }

    @Test
    public void checkEmail() {
       Boolean existEmail =  userService.existEmail("test@test.com");
       log.info(existEmail);
    }

    @Test
    public void checkNickName() {
        Boolean existNickName = userService.existNickName("test");
        log.info(existNickName);
    }
}