package shop.buenoMeat.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.buenoMeat.dto.QnaDto;
import shop.buenoMeat.service.ItemQnaService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/qna")
public class ItemQnaController {

    private final ItemQnaService itemQnaService;

    //-- 문의 글 작성하기 --//
    @PostMapping("/{memberId}/{itemId}")
    public ResponseEntity<String> enrollQna(@PathVariable Long memberId, @PathVariable Long itemId, @RequestBody QnaDto.qnaRequestDto qnaRequestDto) {
        itemQnaService.enrollQna(memberId, itemId, qnaRequestDto);
        return ResponseEntity.ok("문의글이 성공적으로 작성되었습니다.");
    }

    //-- 문의 글 삭제 --//
    @DeleteMapping("/{qnaId}/{memberId}")
    public ResponseEntity<String> deleteQna(@PathVariable Long qnaId, @PathVariable Long memberId) {
        itemQnaService.deleteQna(qnaId, memberId);
        return ResponseEntity.ok("문의글 삭제가 성공적으로 완료되었습니다.");
    }

    //-- 문의 기록 불러오기 ( 마이페이지 ) --//
    @GetMapping("/member/{memberId}")
    public ResponseEntity<QnaDto.getQnaListToMyPage> getAllQnaToMyPage(@PathVariable Long memberId) {
        return ResponseEntity.ok(itemQnaService.getAllQnaToMyPage(memberId));
    }

    //-- 문의 기록 클릭한 경우 ( 마이페이지 ) --//
    @GetMapping("/{qnaId}")
    public QnaDto.getQnaDetailDto getQnaDetailToMyPage(@PathVariable Long qnaId) {
        return itemQnaService.getQnaDetailToMyPage(qnaId);
    }

}
