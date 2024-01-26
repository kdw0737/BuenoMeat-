package shop.buenoMeat.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import shop.buenoMeat.config.jwt.JwtService;
import shop.buenoMeat.dto.LoginDto;
import shop.buenoMeat.dto.MemberDto;
import shop.buenoMeat.exception.AccessTokenNotExistException;
import shop.buenoMeat.service.MemberService;

import javax.servlet.http.HttpServletRequest;
import java.util.NoSuchElementException;
import java.util.Optional;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @PostMapping("/join")
    public ResponseEntity<String> join(@RequestBody MemberDto memberDto) {
        memberService.join(memberDto.toEntity(passwordEncoder));
        return ResponseEntity.ok("회원가입이 성공적으로 완료됐습니다!");
    }

    @PostMapping("/login")
    public ResponseEntity<LoginDto.loginResponseDto> login(@RequestBody LoginDto.loginRequestDto loginRequestDto) {
        return memberService.login(loginRequestDto);
    }

    @PostMapping("/socialLogin")
    public ResponseEntity<String> socialLogin(@RequestBody LoginDto.socialLoginRequestDto socialLoginRequestDto) {
        memberService.socialLogin(socialLoginRequestDto);
        return ResponseEntity.ok("추가 정보 입력을 완료했습니다.");
    }

    //-- 토큰 유효성 확인 및 데이터 전달 --//
    @PostMapping("/socialLogin/token")
    public ResponseEntity<LoginDto.socialLoginResponse> checkTokenSocialLogin(HttpServletRequest request) {
        //accessToken 추출
        Optional<String> accessToken = jwtService.extractAccessToken(request);

        if (accessToken.isEmpty()) { // accessToken이 존재하지 않는 경우
            throw new AccessTokenNotExistException("accessToken이 존재하지 않습니다.");
        } else{ // accessToken이 존재하는 경우
            Optional<String> email = jwtService.extractEmail(accessToken.get());
            if (email.isEmpty()) { // 이메일이 비어있으면
                log.info("이메일이 비어있습니다.");
                return ResponseEntity.status(401).build();
            } else { // 이메일이 존재하는 경우
                return ResponseEntity.ok(memberService.checkTokenSocialLogin(email.get()));
            }
        }
    }
}
