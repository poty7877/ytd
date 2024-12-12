package com.tplinkdns.ysy.ytd.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserRequestDTO {

    private Long mno;

    @NotBlank(message = "닉네임은 필수 입니다.")
    @Size(min = 2, max = 7, message = "닉네임은 2~7자 사이여야 합니다.")
    private String nickName;

    @NotBlank(message = "이메일은 필수 입니다.")
    @Email(message = "유효한 이메일 주소를 입력해주세요.")
    private String email;

    @NotBlank(message = "비밀번호는 필수 입니다.")
    @Size(min = 8, max = 16, message = "비밀번호는 8~16자 사이여야 합니다.")
    private String pw;

}
