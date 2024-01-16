package shop.buenoMeat.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.buenoMeat.service.WishListService;

@RestController
@RequiredArgsConstructor
public class WishListController { //찜 목록 불러오기는 wishListController 에 존재

    private final WishListService wishListService;

    //-- 찜 목록 추가 --//
    @PostMapping("/products/favorites/{memberId}/{itemId}")
    public ResponseEntity<String> addWishList(@PathVariable Long memberId, @PathVariable Long itemId) {
        return wishListService.addWishList(memberId, itemId);
    }

    //-- 찜 목록 삭제 --//
    @DeleteMapping("/products/favorites/{memberId}/{itemId}")
    public ResponseEntity<String> removeWishList(@PathVariable Long memberId, @PathVariable Long itemId) {
        return wishListService.deleteWishList(memberId, itemId);
    }

}
