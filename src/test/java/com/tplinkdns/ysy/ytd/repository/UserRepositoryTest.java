package com.tplinkdns.ysy.ytd.repository;

import com.tplinkdns.ysy.ytd.entity.User;
import com.tplinkdns.ysy.ytd.entity.UserRole;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Log4j2
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void insert() {
        User user = User.builder()
                .email("test@test.com")
                .pw(passwordEncoder.encode("1111"))
                .nickName("test")
                .build();
        user.addRole(UserRole.USER);
        userRepository.save(user);
    }

    @Test
    public void select() {
        String email = "test@test.com";

        User user = userRepository.getWithRoles(email);

        log.info(user);
    }

    @Test
    public void update() {

    }

    @Test
    public void delete() {
        userRepository.deleteById(1L);
    }

}