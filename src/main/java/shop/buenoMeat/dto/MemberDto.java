package shop.buenoMeat.dto;

import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import shop.buenoMeat.domain.Member;

@Getter @Setter
public class MemberDto {
    private String username;
    private String pw;
    private String email;
    private String phone;
    private String nickname;
    private String address;
    private String detailAddress;
    public Member toEntity(PasswordEncoder passwordEncoder) {
        Member member = Member.createMember(this);
        member.changeUsername(username);
        member.changePw(pw,passwordEncoder);
        member.changeEmail(email);
        member.changePhone(phone);
        member.changeNickname(nickname);
        member.changeAddress(address);
        member.changeDetailAddress(detailAddress);
        return member;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class reviewRecommendDto {
        private String msg;
        private int recommend;
    }

}
