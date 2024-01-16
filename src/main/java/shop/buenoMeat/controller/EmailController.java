package shop.buenoMeat.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.buenoMeat.dto.EmailDto;
import shop.buenoMeat.service.EmailService;
import shop.buenoMeat.service.MemberService;

import javax.mail.MessagingException;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/email")
public class EmailController {

    private final EmailService emailService;
    private final MemberService memberService;

    //-- 이메일로 인증번호 메일 전송 (비밀번호 찾기 ) --//
    @PostMapping("/findPw")
    public String sendEmail(@Valid @RequestBody String email) throws MessagingException, UnsupportedEncodingException {
        return emailService.sendEmail(email);
    }

    //-- 새로운 비밀번호 설정 --//
    @PatchMapping("/newPw")
    public String setNewPw(@Valid @RequestBody EmailDto.setNewPwRequest request) {
        emailService.setNewPw(request);
        return "비밀번호 변경이 완료되었습니다.";
    }

    //-- 아이디 찾기 --//
    @PostMapping("/findId")
    public ResponseEntity<Object> findId(@Valid @RequestBody EmailDto.findIdRequest request) {
        return emailService.findId(request);
    }
}
