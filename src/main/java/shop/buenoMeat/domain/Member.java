package shop.buenoMeat.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import shop.buenoMeat.dto.MemberDto;
import shop.buenoMeat.exception.NotEnoughPointExist;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {
    @Id
    @GeneratedValue
    @Column(name = "member_id", nullable = false)
    private Long id; //pk

    @Column(name = "name", length = 30)
    private String username;

    @Column(name = "password") // 소셜로그인 추가 ( null 값도 허용 )
    private String pw;

    @Column(unique = true)
    private String email;

    @Column(length = 11)
    private String phone;

    @Column(length = 16, unique = true)
    private String nickname;

    private String address;

    private String detailAddress;
    @Enumerated(EnumType.STRING)
    private MemberRole role; //ADMIN, USER  ( default = USER )

    private int point;

    @Enumerated(EnumType.STRING)
    private SocialType socialType; // KAKAO , GOOGLE

    private String socialId; // 로그인한 소셜 타입의 식별값 ( 일반 로그인인 경우 = null )

    private String refreshToken;

    @OneToMany(mappedBy = "member")
    private List<Order> orders = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<ItemReview> itemReviews = new ArrayList<>();


    public static Member createMember(MemberDto memberDto) {
        Member member = new Member();
        member.username = memberDto.getUsername();
        member.pw = memberDto.getPw();
        member.email = memberDto.getEmail();
        member.phone = memberDto.getPhone();
        member.nickname = memberDto.getNickname();
        member.address = memberDto.getAddress();
        member.detailAddress = memberDto.getDetailAddress();
        member.role = MemberRole.USER;
        member.point = 1000;
        return member;
    }

    public static Member createSocialMember(SocialType socialType, String socialId, String email, String nickname, MemberRole memberRole) {
        Member member = new Member();
        member.socialType = socialType;
        member.socialId = socialId;
        member.email = email;
        member.nickname = nickname;
        member.role = memberRole;
        member.point = 1000;
        return member;
    }

    public void changeUsername(String username) {
        this.username = username;
    }

    public void changePw(String pw, PasswordEncoder passwordEncoder) {
        this.pw = passwordEncoder.encode(pw);
    }

    public void changeEmail(String email) {
        this.email = email;
    }

    public void changePhone(String phone) {
        this.phone = phone;
    }

    public void changeNickname(String nickname) {
        this.nickname = nickname;
    }

    public void changeAddress(String address){this.address = address;}

    public void changeDetailAddress(String detailAddress){this.detailAddress = detailAddress;}

    // 유저 권한 설정 메소드
    public void authorizeUser() { this.role = MemberRole.USER; }

    public void updateRefreshToken(String refreshToken) { this.refreshToken = refreshToken; }

    public void changeMemberRole(MemberRole memberRole) { this.role = memberRole; }

    //-- 포인트 사용  --//
    public void usePoint(int point) {
        if (this.point - point < 0) {
            throw new NotEnoughPointExist("사용가능한 포인트가 부족합니다.");
        } else {
            this.point -= point;
        }
    }

    //-- 포인트 추가 --//
    public void addPoint(int point) {
        this.point += point;
        System.out.println("포인트가 추가되었습니다." + ":" + point);
    }

}
