package shop.buenoMeat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class EmailDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class setNewPwRequest {
        String email;
        String pw;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class findIdRequest {
        String username;
        String phone;
    }
}

