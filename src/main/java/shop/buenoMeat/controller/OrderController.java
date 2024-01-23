package shop.buenoMeat.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.buenoMeat.dto.OrderDto;
import shop.buenoMeat.service.ItemService;
import shop.buenoMeat.service.MemberService;
import shop.buenoMeat.service.OrderService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/order")
public class OrderController {

    private final MemberService memberService;
    private final ItemService itemService;
    private final OrderService orderService;


    //-- 주문 페이지 불러오기 --//
    @GetMapping("/{memberId}")
    public ResponseEntity<OrderDto.orderPageResponseDto> getOrderPage(@PathVariable Long memberId) {
        return ResponseEntity.ok(orderService.getOrderPage(memberId));
    }

    //-- 주문하기 --//
    @PostMapping("/{memberId}/{cartId}")
    public ResponseEntity<OrderDto.orderResponseDto> Order(@PathVariable Long memberId, @PathVariable Long cartId, @RequestBody OrderDto.orderRequestDto orderRequestDto) {
        Long orderId = orderService.order(memberId, cartId, orderRequestDto);
        return ResponseEntity.ok(new OrderDto.orderResponseDto("주문이 완료되었습니다.", orderId));
    }

    //-- 단일상품 주문 취소하기 --//
    @DeleteMapping("/{memberId}/{orderNum}/{itemId}")
    public ResponseEntity<String> cancelOrder(@PathVariable Long memberId, @PathVariable String orderNum, @PathVariable Long itemId) {
        orderService.cancelOrder(memberId, orderNum, itemId);
        return ResponseEntity.ok("단일상품 주문이 취소되었습니다.");
    }
}
