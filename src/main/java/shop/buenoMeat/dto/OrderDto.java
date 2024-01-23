package shop.buenoMeat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import shop.buenoMeat.domain.OrderItemStatus;

import javax.persistence.criteria.CriteriaBuilder;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class OrderDto {

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class orderPageResponseDto {
        private Long cartId;
        private List<ItemDto.getCartDto> orderItemList;
        private orderMemberInfo orderMemberInfo;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class orderMemberInfo {
        private String address;
        private String detailAddress;
        private String name;
        private String phone;
        private int point;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class orderRequestDto {
        private String memo;
        private Map<Long,Integer> itemAndPoint;
        private String address;
        private String detailAddress;
        private String recipient;
        private String email;
        private String phone;
        private int totalPrice;
        private String orderNum;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class orderResponseDto {
        private String msg;
        private Long id;
    }


    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class orderHistoryDto {
        private Long itemId;
        private String itemName;
        private int itemCount;
        private int totalPrice;
        private String itemOption;
        private String image;
        private String orderNum;
        private LocalDateTime orderDate;
        private OrderItemStatus orderItemStatus;
    }


}
