package shop.buenoMeat.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.buenoMeat.domain.*;
import shop.buenoMeat.dto.ConvertToDto;
import shop.buenoMeat.dto.ItemDto;
import shop.buenoMeat.dto.OrderDto;
import shop.buenoMeat.repository.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OrderService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final MemberRepository memberRepository;
    private final ItemRepository itemRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    //-- 주문 페이지 불러오기 --//
    public OrderDto.orderPageResponseDto getOrderPage(Long memberId){
        Cart findCart = cartRepository.findByMemberId(memberId);
        List<CartItem> findAllCartItem = cartItemRepository.findAllByCartId(findCart.getId());
        Member findMember = memberRepository.findOne(memberId);
        OrderDto.orderMemberInfo orderMemberInfo = new OrderDto.orderMemberInfo(findMember.getAddress(), findMember.getDetailAddress(),
                findMember.getUsername(), findMember.getPhone(), findMember.getPoint());
        List<ItemDto.getCartDto> orderItemList = findAllCartItem.stream()
                .map(ConvertToDto::convertToGetCartDto)
                .collect(Collectors.toList());
        return new OrderDto.orderPageResponseDto(orderItemList, orderMemberInfo);
    }


    //-- 주문하기 --// TODO:: 포인트 적립에 관한 부분 처리 (완료 ? 테스트 필요 )
    @Transactional
    public Long order(Long memberId, OrderDto.orderRequestDto orderRequestDto) {
        Member findMember = memberRepository.findOne(memberId);
        Map<Long, Integer> itemAndPoint = orderRequestDto.getItemAndPoint(); // Key: 상품 ID, Value: 사용한 포인트
        List<OrderItem> orderItems = new ArrayList<>(); // 주문된 상품 리스트
        int earnPoint = 0;

        for (Long itemId : itemAndPoint.keySet()) {
            Item findItem = itemRepository.findOne(itemId);
            CartItem findCartItem = cartItemRepository.findByItemId(itemId);
            OrderItem orderItem = OrderItem.createOrderItem(findItem, findCartItem.getItemCount(),
                    findCartItem.getItemOption(), findCartItem.getTotalPrice(), itemAndPoint.get(itemId));
            orderItemRepository.save(orderItem);
            orderItems.add(orderItem);
            findMember.usePoint(orderItem.getUsePoint()); // 포인트 사용
            earnPoint += orderItem.getEarnPoint();

            //판매한 아이템 판매량 증가
            findItem.changeSoldQuantity(findItem.getSoldQuantity() + orderItem.getCount());
        }
        Order order = Order.createOrder(findMember, orderRequestDto.getRecipient(), orderRequestDto.getPhone(),
                orderRequestDto.getEmail(), orderRequestDto.getAddress(), orderRequestDto.getDetailAddress(),
                orderRequestDto.getMemo(), orderRequestDto.getTotalPrice(), orderItems, orderRequestDto.getOrderNum());
        orderRepository.save(order);

        // 연관관계 설정
        for (OrderItem orderItem : orderItems) {
            orderItem.setOrder(order);
        }

        Cart findCart = cartRepository.findByMemberId(memberId);
        List<CartItem> findAllByCartId = cartItemRepository.findAllByCartId(findCart.getId());

        // 구매 후에 장바구니 초기화
        for (CartItem cartItem : findAllByCartId) {
            cartItemRepository.delete(cartItem);
        }

        //구매 후 사용자 포인트 적립
        findMember.addPoint(earnPoint);

        return order.getId();
    }


    //-- 단일상품 주문 취소 --// TODO:: 단일상품에 대한 포인트 사용은 어떻게 복구 ?>? (완료 )
    @Transactional
    public void cancelOrder(Long memberId, String orderNum, Long itemId) {
        Order findOrder = orderRepository.findByMemberIdAndOrderNum(memberId, orderNum);
        OrderItem findOrderItem = orderItemRepository.findByOrderIdAndItemId(findOrder.getId(), itemId);

        //포인트 사용 취소
        Member findMember = memberRepository.findOne(memberId);
        findMember.addPoint(findOrderItem.getUsePoint());

        //포인트 적립 취소
        findMember.usePoint(findOrderItem.getEarnPoint());

        // 상품 재고 증가
        Item findItem = itemRepository.findOne(itemId);
        findItem.addStock(findOrderItem.getCount());

        //판매량 감소
        findItem.changeSoldQuantity(findItem.getSoldQuantity() - findOrderItem.getCount());

         // 주문 상태 변경
        findOrderItem.changeOrderStatus(OrderItemStatus.CANCEL);
    }


    //-- 마이페이지에 주문내역 불러오기 --//
    public List<OrderDto.orderHistoryDto> getOrderHistoryToMyPage(Long memberId) {
        List<Order> findAllOrders = orderRepository.findAllByMemberId(memberId);
        List<OrderItem> orderItems = new ArrayList<>();
        for (Order order : findAllOrders) {
            List<OrderItem> findOrderItems = orderItemRepository.findAllByOrderId(order.getId());
            orderItems.addAll(findOrderItems);
        }
        return orderItems.stream()
                .map(ConvertToDto::convertToGetOrderHistoryDto)
                .collect(Collectors.toList());
    }
}
