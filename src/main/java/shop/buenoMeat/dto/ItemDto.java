package shop.buenoMeat.dto;

import lombok.*;
import shop.buenoMeat.domain.CategoryName;
import shop.buenoMeat.domain.ItemReview;
import shop.buenoMeat.domain.QnaStatus;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ItemDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class itemDetailInfo {
        private CategoryName category;
        private String name;
        private String info;
        private String image;
        private int price;
        private String weight;
        private String weightUnit;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class itemReviewInfo { // 상품 상세페이지 누르면 상품에 해당하는 리뷰
        private Long id;
        private String username;
        private int starRating;
        private LocalDateTime reviewTime;
        private String reviewImage;
        private String comment;
        private int recommend;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class itemQnaInfo { //상품 상세페이지 누르면 상품에 해당하는 QnA
        private Long id;
        private String title;
        private String comment;
        private LocalDateTime qnaTime;
        private QnaStatus qnaStatus;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class itemDetailDto {
        private itemDetailInfo itemDetailInfo;
        private List<itemReviewInfo> itemReviewInfos;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class itemHotAndCategoryDto {
        private Long id;
        private CategoryName category;
        private String name;
        private String info;
        private String image;
        private int price;
        private String weight;
        private String weightUnit;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class mypageWishListDto {
        private Long id;
        private String name;
        private String info;
        private String image;
        private int price;
        private String weight;
        private String weightUnit;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class searchItemByNameDto {
        private Long id;
        private String image;
        private int price;
        private String name;
        private String weight;
        private String weightUnit;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class addToCartDto {
        private String itemName;
        private int itemCount;
        private int totalPrice;
        private String itemOption;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class getCartDto {
        private Long itemId;
        private String itemName;
        private int itemCount;
        private int totalPrice;
        private String itemOption;
        private int stock;
        private String image;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class reviewItemInfo { //리뷰를 작성할 상품
        private Long reviewId;
        private Long itemId;
        private String itemName;
        private String itemImage;
        private int starRating;
        private String comment;
        private String reviewImage;
        private LocalDateTime reviewTime;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class reviewUserInfo {
        private String username;
        private int recommend;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class getReviewFormPage {
        private List<reviewItemInfo> itemInfos;
        private reviewUserInfo reviewUserInfo;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class enrollReviewDto {
        private int starRating;
        private String comment;
        private String reviewImage;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class updateReviewDto {
        private int starRating;
        private String comment;
        private String reviewImage;
    }

}
