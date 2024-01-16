package shop.buenoMeat.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ItemQna {

    @Id
    @GeneratedValue
    @Column(name = "itemQnA_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(nullable = false)
    private String title;

    @Column(name = "QnA_comment", nullable = false)
    private String comment;// 문의 내용

    @Column(name = "enroll_time", nullable = false)
    private LocalDateTime qTime; // 문의 날짜

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private QnaStatus qnaStatus; // [COMPLETE, WAITING]

    public ItemQna(Item item, Member member, String title, String comment) {
        this.item = item;
        this.member = member;
        this.title = title;
        this.comment = comment;
        this.qTime = LocalDateTime.now();
        this.qnaStatus = QnaStatus.WAITING;
    }

    //-- 생성 메서드 --//
    public static ItemQna createItemQna(Item item, Member member, String title, String comment) {
        return new ItemQna(item, member, title, comment);
    }

    //-- 질문 상태 수정 --//
    public void changeQnaStatus() {
        this.qnaStatus = QnaStatus.COMPLETE;
    }
}
