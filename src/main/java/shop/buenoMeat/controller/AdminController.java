package shop.buenoMeat.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import shop.buenoMeat.dto.AdminDto;
import shop.buenoMeat.dto.QnaDto;
import shop.buenoMeat.service.AdminService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;

    //-- 관리자 로그인 --//
    @PostMapping("/login")
    public ResponseEntity<AdminDto.adminLoginResponseDto> adminLogin(@RequestBody AdminDto.adminLoginRequestDto adminLoginRequestDto) {
        return adminService.adminLogin(adminLoginRequestDto);
    }

    //-- 문의글 모두 불러오기 --//
    @GetMapping("/qna")
    public ResponseEntity<List<QnaDto.getAdminQnaInfo>> getAllQnaList() {
        return ResponseEntity.ok(adminService.getAllQnaList());
    }

    //-- 문의글 답변 작성 --//
    @PostMapping("/qna/answer/{qnaId}")
    public String createQnaAnswer(@PathVariable Long qnaId, @RequestBody String answer) {
        adminService.createQnaAnswer(qnaId,answer);
        return "해당 문의에 대한 답변을 성공적으로 완료하였습니다.";
    }

    //-- 관리자 페이지에서 상품 등록하기 --//
    @PostMapping("/product/upload")
    public String enrollItem(@RequestBody AdminDto.enrollItemDto enrollItemDto) {
        adminService.enrollItem(enrollItemDto);
        return "상품 등록이 완료되었습니다.";
    }

    //-- 상품 정보 수정하기 --//
    @PutMapping("/product/modify/{itemId}")
    public String updateItem(@PathVariable Long itemId, @RequestBody AdminDto.enrollItemDto enrollItemDto) {
        adminService.updateItem(itemId, enrollItemDto);
        return "상품 정보 수정이 완료되었습니다.";
    }

    //-- 상품 삭제하기 --//
    @DeleteMapping("/product/{itemId}")
    public String deleteItem(@PathVariable Long itemId) {
        adminService.removeItem(itemId);
        return "상품 삭제가 완료되었습니다.";
    }
}
