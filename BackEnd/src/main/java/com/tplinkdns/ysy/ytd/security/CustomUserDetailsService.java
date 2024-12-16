package com.tplinkdns.ysy.ytd.security;

import com.tplinkdns.ysy.ytd.dto.UserDTO;
import com.tplinkdns.ysy.ytd.entity.User;
import com.tplinkdns.ysy.ytd.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Log4j2
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("================LoadUserByUserName 실행===============");
        log.info("정보 확인 : " + username);
        User user = userRepository.getWithRoles(username);

        if(user == null) {
            throw new UsernameNotFoundException("Not Found");
        }

        UserDTO userDTO = new UserDTO(
                user.getMno(),
                user.getEmail(),
                user.getPw(),
                user.getNickName(),
                user.isSocial(),
                user.getUserRoleList()
                        .stream().map(memberRole -> memberRole.name()).toList());
        log.info("userDTO : " + userDTO);
        return userDTO;
    }
}
