package shop.buenoMeat.config.OAuth;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.buenoMeat.config.jwt.JwtService;
import shop.buenoMeat.domain.Member;
import shop.buenoMeat.domain.SocialType;
import shop.buenoMeat.repository.MemberRepository;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final MemberRepository memberRepository;
    private final JwtService jwtService;

    private static final String KAKAO = "kakao";

    @Transactional
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        log.info("CustomOAuth2UserService.loadUser() 실행 - OAuth2 로그인 요청 진입");

        /**
         * DefaultOAuth2UserService 객체를 생성하여, loadUser(userRequest)를 통해 DefaultOAuth2User 객체를 생성 후 반환
         * DefaultOAuth2UserService의 loadUser()는 소셜 로그인 API의 사용자 정보 제공 URI로 요청을 보내서
         * 사용자 정보를 얻은 후, 이를 통해 DefaultOAuth2User 객체를 생성 후 반환한다.
         * 결과적으로, OAuth2User는 OAuth 서비스에서 가져온 유저 정보를 담고 있는 유저
         */
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        /**
         * userRequest에서 registrationId 추출 후 registrationId으로 SocialType 저장
         * http://localhost:8080/oauth2/authorization/kakao에서 kakao가 registrationId
         * userNameAttributeName은 이후에 nameAttributeKey로 설정된다.
         */
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        SocialType socialType = getSocialType(registrationId);
        String userNameAttributeName = userRequest.getClientRegistration()
                .getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName(); // OAuth2 로그인 시 키(PK)가 되는 값
        Map<String, Object> attributes = oAuth2User.getAttributes(); // 소셜 로그인에서 API가 제공하는 userInfo의 Json 값(유저 정보들)

        // socialType에 따라 유저 정보를 통해 OAuthAttributes 객체 생성
        OAuthAttributes extractAttributes = OAuthAttributes.of(socialType, userNameAttributeName, attributes);

        Member createMember = getMember(extractAttributes, socialType); // getMember() 메소드로 Member 객체 생성 후 반환

        // DefaultOAuth2User를 구현한 CustomOAuth2User 객체를 생성해서 반환
        return new CustomOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority(createMember.getRole().getKey())),
                attributes,
                extractAttributes.getNameAttributeKey(),
                createMember.getEmail(),
                createMember.getRole()
        );
    }

    private SocialType getSocialType(String registrationId) {
        if(KAKAO.equals(registrationId)) {
            return SocialType.KAKAO;
        }
        return SocialType.GOOGLE;
    }

    /**
     * SocialType과 attributes에 들어있는 소셜 로그인의 식별값 id를 통해 회원을 찾아 반환하는 메소드
     * 만약 찾은 회원이 있다면, 그대로 반환하고 없다면 saveUser()를 호출하여 회원을 저장한다.
     */
    private Member getMember(OAuthAttributes attributes, SocialType socialType) {
        log.info("getMember 메서드로 회원 조회 ");
        List<Member> findMembers = memberRepository.findByEmail(attributes.getOauth2UserInfo().getEmail());
        if (!(findMembers.size() == 0)) {
            Member findMember = findMembers.get(0);
            log.info("이미 존재하는 유저 검색완료");
        }else{
            log.info("해당 유저가 존재하지않아 OAUTH로 새로 회원을 저장합니다.");
            return saveUser(attributes, socialType);
        }
        return findMembers.get(0);
    }

    /**
     * OAuthAttributes의 toEntity() 메소드를 통해 빌더로 Member 객체 생성 후 반환
     * 생성된 Member 객체를 DB에 저장 : socialType, socialId, email, role 값만 있는 상태
     */
    private Member saveUser(OAuthAttributes attributes, SocialType socialType) {
        Member createdUser = attributes.toEntity(socialType, attributes.getOauth2UserInfo());
        memberRepository.save(createdUser);
        log.info(" OAUTH 회원 저장 완료 ");
        return createdUser;
    }
}