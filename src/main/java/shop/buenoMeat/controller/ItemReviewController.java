package shop.buenoMeat.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import shop.buenoMeat.dto.ItemDto;
import shop.buenoMeat.dto.MemberDto;
import shop.buenoMeat.service.ItemReviewService;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/review")
public class ItemReviewController {

    private final ItemReviewService itemReviewService;

    //-- 리뷰(마이페이지) 불러오기 --//
    @GetMapping("/{memberId}")
    public ResponseEntity<ItemDto.getReviewFormPage> getReviewFormPage(@PathVariable Long memberId) {
        return ResponseEntity.ok(itemReviewService.getReviewFormPage(memberId));
    }

    //-- 리뷰 작성하기 --//
    @PostMapping(value = "/{memberId}/{itemId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> enrollReview(@PathVariable Long memberId, @PathVariable Long itemId,
                                               @RequestPart ItemDto.enrollReviewDto enrollReviewDto,
                                               @RequestPart MultipartFile file) throws IOException {
        itemReviewService.enrollReview(memberId, itemId, enrollReviewDto,file);
        return ResponseEntity.ok("상품리뷰등록이 완료되었습니다.");
    }

    //-- 리뷰 추천 하기 --//
    @PostMapping("/recommend/{memberId}/{reviewId}")
    public ResponseEntity<MemberDto.reviewRecommendDto> addReviewRecommend(@PathVariable Long memberId, @PathVariable Long reviewId) {
        return ResponseEntity.ok(itemReviewService.addReviewRecommend(memberId, reviewId));
    }

    //-- 리뷰 추천 취소하기 --//
    @PatchMapping("/{memberId}/{reviewId}")
    public ResponseEntity<MemberDto.reviewRecommendDto> cancelReviewRecommend(@PathVariable Long memberId, @PathVariable Long reviewId) {
        return ResponseEntity.ok(itemReviewService.cancelReviewRecommend(memberId, reviewId));
    }

    //-- 리뷰 수정하기 --//
    @PatchMapping("/{reviewId}")
    public ResponseEntity<String> updateReview(@PathVariable Long reviewId, @RequestBody ItemDto.updateReviewDto updateReviewDto) {
        itemReviewService.updateReview(reviewId, updateReviewDto);
        return ResponseEntity.ok("리뷰 수정이 완료되었습니다");
    }

    //-- 리뷰 삭제하기 --//
    @DeleteMapping("/{reviewId}/{memberId}")
    public ResponseEntity<String> deleteReview(@PathVariable Long reviewId, @PathVariable Long memberId) {
        itemReviewService.deleteReview(reviewId, memberId);
        return ResponseEntity.ok("리뷰 삭제가 완료되었습니다.");
    }
}
