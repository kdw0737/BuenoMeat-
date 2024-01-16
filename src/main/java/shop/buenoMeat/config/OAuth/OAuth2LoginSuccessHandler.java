package shop.buenoMeat.config.OAuth;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import shop.buenoMeat.config.jwt.JwtService;
import shop.buenoMeat.domain.Member;
import shop.buenoMeat.domain.MemberRole;
import shop.buenoMeat.repository.MemberRepository;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Slf4j
@Component
@RequiredArgsConstructor
@Transactional
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final MemberRepository memberRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("OAuth2 Login 성공!");
        try {
            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

            // Member의 Role이 GUEST일 경우 처음 요청한 회원이므로 추가 회원가입 페이지로 리다이렉트
            if(oAuth2User.getRole() == MemberRole.GUEST) {
                String accessToken = jwtService.createAccessToken(oAuth2User.getEmail());
                String redirectUrl = "http://localhost:3000/auth/socialJoin?accessToken=" + accessToken;
                response.sendRedirect(redirectUrl); // 프론트의 회원가입 추가 정보 입력 폼으로 리다이렉트
                log.info("추가 정보 입력으로 리다이렉트");

                jwtService.sendAccessAndRefreshToken(response, accessToken, null);
                Member findMember = Optional.ofNullable(memberRepository.findByEmail(oAuth2User.getEmail()).get(0))
                        .orElseThrow(() -> new IllegalArgumentException("이메일에 해당하는 유저가 없습니다."));
                findMember.authorizeUser(); // GUEST -> USER
                log.info("멤버 권한 수정 완료");
            } else {
                loginSuccess(response, oAuth2User); // 로그인에 성공한 경우 access, refresh 토큰 생성
            }
        } catch (Exception e) {
            throw e;
        }
    }

    private void loginSuccess(HttpServletResponse response, CustomOAuth2User oAuth2User) throws IOException {
        String accessToken = jwtService.createAccessToken(oAuth2User.getEmail());
        String refreshToken = jwtService.createRefreshToken();
        String redirectUrl = "http://localhost:3000/some/path?accessToken=" + accessToken + "&refreshToken=" + refreshToken;
        response.sendRedirect(redirectUrl);
        log.info("토큰을 쿼리 스트링으로 전달하여 리다이렉트");

        jwtService.updateRefreshToken(oAuth2User.getEmail(), refreshToken);
    }
}