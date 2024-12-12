package com.tplinkdns.ysy.ytd.Controller.User;

import com.tplinkdns.ysy.ytd.dto.UserRequestDTO;
import com.tplinkdns.ysy.ytd.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
@Log4j2
public class UserController {

    private final UserService userService;

    @PostMapping("/sign")
    public ResponseEntity<String> register(@Valid @RequestBody UserRequestDTO userDTO) {
        log.info("컨트롤러 userDTO : " + userDTO);
        userService.register(userDTO);
        return ResponseEntity.ok("SUCCESS");
    }

    @PutMapping("/{mno}")
    public ResponseEntity<String> updateUser(@PathVariable Long mno, @Valid @RequestBody UserRequestDTO userDTO) {
        log.info("컨트롤러 userDTO : " + userDTO);
        log.info("mno : " + mno);
        userService.modify(userDTO);
        return ResponseEntity.ok("SUCCESS");
    }

    @DeleteMapping("/{mno}")
    public ResponseEntity<String> deleteUser(@PathVariable Long mno) {
        userService.remove(mno);
        return ResponseEntity.ok("SUCCESS");
    }

    @PostMapping("/checkNickName/{nickName}")
    public ResponseEntity<Boolean> checkNickName(@PathVariable String nickName) {
        Boolean result = userService.existNickName(nickName);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/checkEmail/{email}")
    public ResponseEntity<Boolean> checkEmail(@PathVariable String email) {
        log.info("email : " + email);
        Boolean result = userService.existEmail(email);
        log.info(result);
        return ResponseEntity.ok(result);
    }


}
