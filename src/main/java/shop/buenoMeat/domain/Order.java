package shop.buenoMeat.domain;

import lombok.*;

import javax.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Table(name = "Orders")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Order {

    @Id
    @GeneratedValue
    @Column(name = "order_id", nullable = false)
    private Long id; //pk

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems = new ArrayList<>();

    @Column(length = 30, nullable = false)
    private String recipient;

    @Column(name = "rcp_phone", length = 11, nullable = false)
    private String phone;

    @Column(name = "rcp_email", nullable = false)
    private String email;

    @Column(nullable = false)
    private LocalDateTime orderDate;

    @Column(name = "delivery_address", nullable = false)
    private String address;

    @Column(nullable = false)
    private String detailAddress;

    @Column(length = 100)
    private String memo; // 주문 요청 사항

    @Column(nullable = false)
    private int totalPrice; // 해당 주문 상품들 총 가격

    @Column(nullable = false, unique = true)
    private String orderNum; //주문 번호

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus; // COMPLETE, CANCEL

    public Order(Member member, String recipient, String phone, String email, String address, String detailAddress,
                 String memo, int totalPrice, OrderStatus orderStatus, String orderNum) {
        this.member = member;
        this.recipient = recipient;
        this.phone = phone;
        this.email = email;
        this.orderDate = LocalDateTime.now();
        this.address = address;
        this.detailAddress = detailAddress;
        this.memo = memo;
        this.totalPrice = totalPrice;
        this.orderStatus = orderStatus;
        this.orderNum = orderNum;
    }

    //--생성 메서드--//
    public static Order createOrder(Member member, String recipient, String phone, String email, String address,
                                    String detailAddress, String memo, int totalPrice, List<OrderItem> orderItems, String orderNum) {
        Order order = new Order(member, recipient, phone, email, address, detailAddress, memo, totalPrice, OrderStatus.COMPLETE, orderNum);
        order.orderItems.addAll(orderItems);
        return order;
    }

}
