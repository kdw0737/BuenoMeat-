package shop.buenoMeat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import shop.buenoMeat.domain.QnaStatus;

import java.time.LocalDateTime;
import java.util.List;

public class QnaDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class qnaRequestDto {
        String title;
        String comment;
    }


    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class qnaInfo {
        private Long id;
        private String image;
        private String itemName;
        private LocalDateTime qnaTime;
        private QnaStatus qnaStatus;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class getAdminQnaInfo {
        private Long id;
        private String title;
        private String comment;
        private LocalDateTime qnaTime;
        private QnaStatus qnaStatus;
    }
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class getQnaListToMyPage {
        List<qnaInfo> qnaInfos;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class getQnaDetailDto {
        private String title;
        private String image;
        private String itemName;
        private String comment;
        private LocalDateTime qTime;
        private QnaStatus qnaStatus;
        private String answer;
        private LocalDateTime answerTime;
    }
}
