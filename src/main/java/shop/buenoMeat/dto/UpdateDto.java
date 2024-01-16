package shop.buenoMeat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
public class UpdateDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class updatePwDto {
        private String pw;
        private String newPw;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class updateUsernameDto {
        private String username;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class updateNickname {
        private String nickname;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class updatePhone {
        private String phone;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class updateAddress {
        private String address;
        private String detailAddress;
    }

}
