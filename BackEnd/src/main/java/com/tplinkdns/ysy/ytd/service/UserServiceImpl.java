package com.tplinkdns.ysy.ytd.service;

import com.tplinkdns.ysy.ytd.dto.UserDTO;
import com.tplinkdns.ysy.ytd.dto.UserRequestDTO;
import com.tplinkdns.ysy.ytd.entity.User;
import com.tplinkdns.ysy.ytd.entity.UserRole;
import com.tplinkdns.ysy.ytd.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Log4j2
public class UserServiceImpl implements UserService {

    private final PasswordEncoder passwordEncoder;

    private final UserRepository userRepository;

    @Override
    public void register(UserRequestDTO userDTO) {
        log.info("회원가입 서비스");
        User user = dtoToEntity(userDTO);
        user.setPw(passwordEncoder.encode(user.getPw()));
        user.addRole(UserRole.USER);
        userRepository.save(user);
        log.info(user);
    }

    @Override
    public UserRequestDTO get(String email) {
        User user = userRepository.findByEmail(email);
        UserRequestDTO userDTO = entityToDto(user);
        return userDTO;
    }

    @Override
    public void modify(UserRequestDTO userDTO) {
        log.info("수정 서비스");
        User user = dtoToEntity(userDTO);
        user.setPw(passwordEncoder.encode(user.getPw()));
        userRepository.save(user);
        log.info(user);
    }

    @Override
    public void remove(Long mno) {
        log.info("삭제 서비스");
        userRepository.deleteById(mno);
    }

    @Override
    public Boolean existEmail(String email) {
        log.info("이메일 중복 확인 서비스");
        return userRepository.existsByEmail(email);
    }

    @Override
    public Boolean existNickName(String nickName) {
        log.info("닉네임 중복확인 서비스");
        return userRepository.existsByNickName(nickName);
    }

    public User dtoToEntity(UserRequestDTO userDTO) {
        return User.builder()
                .nickName(userDTO.getNickName())
                .email(userDTO.getEmail())
                .pw(userDTO.getPw())
                .mno(userDTO.getMno())
                .build();
    }

    public UserRequestDTO entityToDto(User user) {
        return UserRequestDTO.builder()
                .mno(user.getMno())
                .nickName(user.getNickName())
                .email(user.getEmail())
                .pw(user.getPw())
                .build();
    }
}
