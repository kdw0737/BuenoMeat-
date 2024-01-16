package shop.buenoMeat.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import shop.buenoMeat.dto.ItemDto;
import shop.buenoMeat.service.CartService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class CartController { // 장바구니 화면 불러오기는 myPageController 에 존재

    private final CartService cartService;


    //-- 장바구니 담기 --//
    @PostMapping("/products/putCart/{memberId}/{itemId}")
    public ResponseEntity<String> addToCart(@PathVariable Long memberId, @PathVariable Long itemId, @RequestBody @Valid ItemDto.addToCartDto addToCartDto,
                                            BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            StringBuilder sb = new StringBuilder();
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();
            for (FieldError fieldError : fieldErrors) {
                sb.append(fieldError.getDefaultMessage());
            }
            return new ResponseEntity<String>(sb.toString(), HttpStatus.BAD_REQUEST);
        }
        try {
            Long cartItemId = cartService.addToCart(memberId, itemId, addToCartDto);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
        return ResponseEntity.ok("장바구니 담기에 성공하였습니다.");
    }


    //-- 장바구니 전체 삭제 --//
    @DeleteMapping("/mypage/cart/{memberId}")
    public ResponseEntity<String> deleteAllFromCart(@PathVariable("memberId") Long id) {
        cartService.deleteAllFromCart(id);
        return ResponseEntity.ok("장바구니 전체 삭제에 성공하였습니다");
    }


    //-- 장바구니 단일 상품 삭제 --//
    @DeleteMapping("/mypage/cart/{memberId}/{itemId}")
    public ResponseEntity<String> deleteSingleItemFromCart(@PathVariable Long memberId, @PathVariable Long itemId) {
        cartService.deleteSingleItemFromCart(memberId, itemId);
        return ResponseEntity.ok("장바구니 단일항목 삭제에 성공하였습니다.");
    }


    //- - 장바구니 상품 수량 변경 --//
    @PatchMapping("/mypage/cart/{memberId}/{itemId}")
    public ResponseEntity<String> changeCartItemCount(@PathVariable Long memberId, @PathVariable Long itemId, @RequestBody int count) {
        cartService.changeCartItemCount(memberId, itemId, count);
        return ResponseEntity.ok("상품 수량 변경을 성공하였습니다.");
    }
}
