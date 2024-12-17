package com.tplinkdns.ysy.ytd.service;

import com.tplinkdns.ysy.ytd.dto.UserDTO;
import com.tplinkdns.ysy.ytd.dto.UserRequestDTO;
import com.tplinkdns.ysy.ytd.entity.User;
import com.tplinkdns.ysy.ytd.entity.UserRole;
import com.tplinkdns.ysy.ytd.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.LinkedHashMap;


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

    @Override
    public UserDTO getKakaoMember(String accessToken) {
        String email = getEmailFromKakaoAccessToken(accessToken);
        String nickName = getNickNameFromKakaoAccessToken(accessToken);
        log.info("email : " + email);
        log.info("nickName : " + nickName);

        try {
            User user = userRepository.findByEmail(email);
            UserDTO userDTO = entityToUserDTO(user);
            return userDTO;
        } catch (Exception e) {
            User socailUser = makeSocialMember(email);
            socailUser.setNickName(nickName);
            userRepository.save(socailUser);

            UserDTO userDTO = entityToUserDTO(socailUser);
            return userDTO;
        }

    }

    private String getEmailFromKakaoAccessToken(String accessToken) {
        log.info("이메일 메서드");
        String kakaoGetUserURL = "https://kapi.kakao.com/v2/user/me";

        if (accessToken == null) {
            throw new RuntimeException("Access Token is null");
        }

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-Type", "application/x-www-form-urlencoded");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        UriComponents uriBuilder = UriComponentsBuilder.fromUriString(kakaoGetUserURL).build();

        ResponseEntity<LinkedHashMap> response = restTemplate.exchange(uriBuilder.toString(), HttpMethod.GET, entity, LinkedHashMap.class);

        log.info(response);

        LinkedHashMap<String, LinkedHashMap> bodyMap = response.getBody();

        log.info("==========================");
        log.info(bodyMap);

        LinkedHashMap<String, String> kakaoAccount = bodyMap.get("kakao_account");

        log.info("kakaoAccount : " + kakaoAccount);

        return kakaoAccount.get("email");
    }

    private String getNickNameFromKakaoAccessToken(String accessToken) {
        log.info("닉네임 메서드");
        String kakaoGetUserURL = "https://kapi.kakao.com/v2/user/me";

        if (accessToken == null) {
            throw new RuntimeException("Access Token is null");
        }

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-Type", "application/x-www-form-urlencoded");
        HttpEntity<String> entity = new HttpEntity<>(headers);
        UriComponents uriBuilder = UriComponentsBuilder.fromUriString(kakaoGetUserURL).build();

        ResponseEntity<LinkedHashMap> response = restTemplate.exchange(uriBuilder.toString(), HttpMethod.GET, entity, LinkedHashMap.class);

        log.info("Response Body: " + response.getBody());

        LinkedHashMap<String, LinkedHashMap> bodyMap = response.getBody();
        LinkedHashMap<String, Object> kakaoAccount = bodyMap.get("kakao_account");

        if (kakaoAccount == null) {
            throw new RuntimeException("kakao_account is null");
        }

        LinkedHashMap<String, Object> profile = (LinkedHashMap<String, Object>) kakaoAccount.get("profile");

        if (profile == null) {
            throw new RuntimeException("profile is null");
        }

        String nickname = (String) profile.get("nickname");

        log.info("Nickname: " + nickname);

        return nickname;
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

    private String makeTempPassword() {
        StringBuffer buffer = new StringBuffer();
        for (int i = 0; i < 10; i++) {
            buffer.append((char) ((int) (Math.random() * 55) + 65));
        }
        return buffer.toString();
    }

    private User makeSocialMember(String email) {
        String tempPassword = makeTempPassword();
        log.info("tempPassword:" + tempPassword);
        String nickName = "소셜회원";
        User user = User.builder()
                .email(email)
                .nickName(nickName)
                .pw(passwordEncoder.encode(tempPassword))
                .nickName(nickName)
                .social(true)
                .build();
        user.addRole(UserRole.USER);
        return user;
    }


    private String getEmailFromGoogleAccessToken(String accessToken) {
        log.info("이메일 메서드");
        String googleGetUserURL = "https://www.googleapis.com/userinfo/v2/me";

        if (accessToken == null) {
            throw new RuntimeException("Access Token is null");
        }

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-Type", "application/x-www-form-urlencoded");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        UriComponents uriBuilder = UriComponentsBuilder.fromUriString(googleGetUserURL).build();

        ResponseEntity<LinkedHashMap> response = restTemplate.exchange(uriBuilder.toString(), HttpMethod.GET, entity, LinkedHashMap.class);

        log.info(response);

        LinkedHashMap<String, Object> bodyMap = response.getBody();

        // 구글 응답에서 이메일을 추출 (email 필드는 String 타입)
        String email = (String) bodyMap.get("email");

        if (email == null) {
            throw new RuntimeException("Email is null");
        }

        log.info("Email: " + email);
        return email;
    }

    private String getNickNameFromGoogleAccessToken(String accessToken) {
        log.info("닉네임 메서드");
        String googleGetUserURL = "https://www.googleapis.com/userinfo/v2/me";

        if (accessToken == null) {
            throw new RuntimeException("Access Token is null");
        }

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-Type", "application/x-www-form-urlencoded");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        UriComponents uriBuilder = UriComponentsBuilder.fromUriString(googleGetUserURL).build();

        ResponseEntity<LinkedHashMap> response = restTemplate.exchange(uriBuilder.toString(), HttpMethod.GET, entity, LinkedHashMap.class);

        log.info(response);

        LinkedHashMap<String, Object> bodyMap = response.getBody();

        // 구글 응답에서 이메일을 추출 (email 필드는 String 타입)
        String name = (String) bodyMap.get("name");

        if (name == null) {
            throw new RuntimeException("Email is null");
        }

        log.info("name: " + name);
        return name;
    }

    private String getEmailFromNaverAccessToken(String accessToken) {
        log.info("이메일 메서드");
        String naverGetUserURL = "https://openapi.naver.com/v1/nid/me";

        if (accessToken == null) {
            throw new RuntimeException("Access Token is null");
        }

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-Type", "application/x-www-form-urlencoded");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        UriComponents uriBuilder = UriComponentsBuilder.fromUriString(naverGetUserURL).build();

        ResponseEntity<LinkedHashMap> response = restTemplate.exchange(uriBuilder.toString(), HttpMethod.GET, entity, LinkedHashMap.class);

        log.info(response);
        LinkedHashMap<String, LinkedHashMap> bodyMap = response.getBody();
        LinkedHashMap<String, Object> naverAccount = bodyMap.get("response");
        log.info("========================");
        log.info(naverAccount);

        // 구글 응답에서 이메일을 추출 (email 필드는 String 타입)
        String email = (String) naverAccount.get("email");

        if (email == null) {
            throw new RuntimeException("Email is null");
        }

        log.info("Email: " + email);



        return email;
    }

    private String getNickNameFromNaverAccessToken(String accessToken) {
        log.info("닉네임 메서드");
        String naverGetUserURL = "https://openapi.naver.com/v1/nid/me";

        if (accessToken == null) {
            throw new RuntimeException("Access Token is null");
        }

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-Type", "application/x-www-form-urlencoded");
        HttpEntity<String> entity = new HttpEntity<>(headers);

        UriComponents uriBuilder = UriComponentsBuilder.fromUriString(naverGetUserURL).build();

        ResponseEntity<LinkedHashMap> response = restTemplate.exchange(uriBuilder.toString(), HttpMethod.GET, entity, LinkedHashMap.class);

        log.info(response);
        LinkedHashMap<String, LinkedHashMap> bodyMap = response.getBody();
        LinkedHashMap<String, Object> naverAccount = bodyMap.get("response");
        log.info("========================");
        log.info(naverAccount);

        // 구글 응답에서 이메일을 추출 (email 필드는 String 타입)
        String name = (String) naverAccount.get("name");

        if (name == null) {
            throw new RuntimeException("name is null");
        }

        log.info("name: " + name);



        return name;
    }


    @Override
    public UserDTO getGoogleMember(String accessToken) {
        String email = getEmailFromGoogleAccessToken(accessToken);
        String name = getNickNameFromGoogleAccessToken(accessToken);
        log.info("email : " + email);
        log.info("name : " + name);

        try {
            User user = userRepository.findByEmail(email);
            UserDTO userDTO = entityToUserDTO(user);
            return userDTO;
        } catch (Exception e) {
            User socailUser = makeSocialMember(email);
            socailUser.setNickName(name);

            userRepository.save(socailUser);
            UserDTO userDTO = entityToUserDTO(socailUser);
            return userDTO;
        }

    }

    @Override
    public UserDTO getNaverMember(String accessToken) {
        String email = getEmailFromNaverAccessToken(accessToken);
        String name = getNickNameFromNaverAccessToken(accessToken);
        log.info("email : " + email);
        log.info("name : " + name);
        try {
            User user = userRepository.findByEmail(email);
            UserDTO userDTO = entityToUserDTO(user);
            return userDTO;
        } catch (Exception e) {
            User socailUser = makeSocialMember(email);
            socailUser.setNickName(name);
            userRepository.save(socailUser);
            UserDTO userDTO = entityToUserDTO(socailUser);
            return userDTO;
        }
    }

}
