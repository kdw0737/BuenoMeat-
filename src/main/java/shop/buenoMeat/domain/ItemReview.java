package shop.buenoMeat.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ItemReview {

    @Id
    @GeneratedValue
    @Column(name = "review_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "rev_comment", length = 500)
    private String comment; // 리뷰 내용

    @Column(name = "rev_date")
    private LocalDateTime reviewTime; //작성 시간

    @Column(name = "rev_star")
    private int starRating; //별점

    @Column(name = "rev_recommend")
    private int recommend; // 추천 수

    @Column(name = "rev_image")
    private String image;

    public ItemReview(Item item, Member member, String comment, int starRating, String image) {
        this.item = item;
        this.member = member;
        this.comment = comment;
        this.reviewTime = LocalDateTime.now();
        this.starRating = starRating;
        this.recommend = 0;
        this.image = image;
    }

    //-- 생성 메서드 --//
    public static ItemReview createReview(Item item, Member member, String comment, int starRating, String image) {
        ItemReview itemReview = new ItemReview(item, member, comment, starRating, image);
        member.addPoint(500); // 리뷰 적립금 500원
        return itemReview;
    }

    //-- 추천 수 증가 메서드 --//
    public void addRecommend() {
        this.recommend += 1;
    }

    //-- 추천 수 감소 메서드 --//
    public void cancelRecommend() { this.recommend -= 1; }

    //-- 업데이트 메서드 --//
    public void changeStarRating(int starRating){ this.starRating = starRating; }

    public void changeComment(String comment){ this.comment = comment; }

    public void changeImage(String image){ this.image = image; }
}
