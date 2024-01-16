package shop.buenoMeat.dto;

import lombok.*;
import shop.buenoMeat.domain.WishList;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class LoginDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class loginRequestDto {
        private String email;
        private String pw;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class loginResponseDto {
        private String msg;
        private String nickname;
        private Long id;
        private int point;
        private List<WishList> wishListItems;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class socialLoginRequestDto {
        private String email;
        private String username;
        private String phone;
        private String address;
        private String detailAddress;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class socialLoginResponse {
        private String msg;
        private Long id;
        private String nickname;
    }
}
