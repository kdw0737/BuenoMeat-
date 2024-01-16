package shop.buenoMeat.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.aspectj.weaver.ast.Or;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class OrderItem {

    @Id
    @GeneratedValue
    @Column(name = "orderItem_id")
    private Long id;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id")
    private Order order;

    @Column(name = "orderCount", nullable = false)
    private int count; // 주문 수량

    private String itemOption; // 상품 옵션

    private LocalDateTime itemOutDate; // 출고 날짜

    @Column(nullable = false)
    @Enumerated(value = EnumType.STRING)
    private OrderItemStatus orderItemStatus; //결제대기, 출고대기, 출고, 취소

    @Column(nullable = false)
    private int itemPrice; // 주문 상품 가격

    private int usePoint; // 사용한 포인트

    @Column(nullable = false)
    private int earnPoint; //적립금


    public OrderItem(Item item, int count, String itemOption, LocalDateTime itemOutDate, OrderItemStatus orderItemStatus,int itemPrice, int usePoint) {
        this.item = item;
        this.count = count;
        this.itemOption = itemOption;
        this.itemOutDate = itemOutDate;
        this.orderItemStatus = orderItemStatus;
        this.itemPrice = itemPrice;
        this.usePoint = usePoint;
        this.earnPoint = setEarnPoint(itemPrice);
    }

    public static OrderItem createOrderItem(Item item, int count, String itemOption, int itemPrice, int usePoint) {
        OrderItem orderItem = new OrderItem(item, count, itemOption, LocalDateTime.now(), OrderItemStatus.RELEASE, itemPrice, usePoint); //결제 완료상태로 ( 결제기능 미구현 )
        item.removeStock(count);
        return orderItem;
    }

    public void changeOrderStatus(OrderItemStatus orderItemStatus) {
        this.orderItemStatus = orderItemStatus;
    }

    //-- 연관관계 메소드 --//
    public void setOrder(Order order) {
        this.order = order;
    }

    //-- 적립금 추가 --//
    public int setEarnPoint(int itemPrice) {
        if (itemPrice < 5000) {
            return 0;
        } else {
            return (int) (itemPrice * 0.01);
        }
    }

}
