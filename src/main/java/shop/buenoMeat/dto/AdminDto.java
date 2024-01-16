package shop.buenoMeat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import shop.buenoMeat.domain.Category;
import shop.buenoMeat.domain.CategoryName;
import shop.buenoMeat.domain.QnaStatus;

import java.time.LocalDateTime;
import java.util.List;


public class AdminDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class adminLoginRequestDto {
        private String email;
        private String pw;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class adminLoginResponseDto {
        private String msg;
        private Long adminId;
        private String nickname;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class enrollItemDto {
        private String category_name;
        private String info;
        private String name;
        private int price;
        private int stock;
        private String weight;
        private String weightUnit;
    }
}
