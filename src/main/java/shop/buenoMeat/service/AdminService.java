package shop.buenoMeat.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import shop.buenoMeat.domain.*;
import shop.buenoMeat.dto.AdminDto;
import shop.buenoMeat.dto.ConvertToDto;
import shop.buenoMeat.dto.QnaDto;
import shop.buenoMeat.repository.*;

import java.io.IOException;
import java.nio.file.NoSuchFileException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class AdminService{
    private final MemberRepository memberRepository;
    private final ItemQnaRepository itemQnaRepository;
    private final ItemAnswerRepository itemAnswerRepository;
    private final CategoryRepository categoryRepository;
    private final ItemRepository itemRepository;

    private final S3Service s3Service;

    //-- 관리자 로그인 --//
    public ResponseEntity adminLogin(AdminDto.adminLoginRequestDto adminLoginRequestDto){

        List<Member> findMembers = memberRepository.findByEmail(adminLoginRequestDto.getEmail());

        if (findMembers.isEmpty()) {
            return ResponseEntity.badRequest().body("아이디가 틀렸습니다.");
        } else {
            Member findMember = findMembers.get(0);
            if (findMember.getRole().equals(MemberRole.ADMIN)) { // 관리자인 경우
                if (findMember.getPw().equals(adminLoginRequestDto.getPw())) {
                    AdminDto.adminLoginResponseDto adminLoginResponseDto = new AdminDto.adminLoginResponseDto(
                            "로그인에 성공하였습니다.", findMember.getId(), findMember.getNickname()
                    );
                    return ResponseEntity.ok(adminLoginResponseDto);
                } else {
                    return ResponseEntity.badRequest().body("비밀번호가 틀렸습니다.");
                }
            } else { //관리자가 아닌 경우
                return ResponseEntity.status(401).body("접근 권한이 없습니다.");
            }
        }
    }

    //-- 상품 문의 리스트 불러오기 --//
    public List<QnaDto.getAdminQnaInfo> getAllQnaList() {
        List<ItemQna> getAllQna = itemQnaRepository.findAll();
        return getAllQna.stream().map(ConvertToDto::convertToGetAdminQnaInfo)
                .collect(Collectors.toList());
    }

    //-- 질문 답변 생성 --//
    @Transactional
    public void createQnaAnswer(Long qnaId, String answer) {
        ItemQna findQna = itemQnaRepository.findById(qnaId).orElseThrow(NoSuchElementException::new);
        ItemAnswer itemAnswer = ItemAnswer.createItemAnswer(findQna, answer);
        itemAnswerRepository.save(itemAnswer);

        // 질문 상태  : 대기 -> 완료로 변경
        findQna.changeQnaStatus();
    }

    //-- 관리자 페이지에서 상품 등록하기 --//
    @Transactional
    public void enrollItem(AdminDto.enrollItemDto enrollItemDto, MultipartFile image) throws IOException {
        String storedFileName = null;
        CategoryName categoryName = checkCategory(enrollItemDto);
        Category category = Category.createCategory(categoryName);
        categoryRepository.save(category);
        if (image != null && !image.isEmpty()) {
            storedFileName = s3Service.upload(image, "image");
        } else {
            throw new NoSuchFileException("등록양식에 사진이 없습니다.");
        }
        Item item = Item.createItem(category, enrollItemDto.getInfo(), enrollItemDto.getName(), enrollItemDto.getPrice(), enrollItemDto.getStock(),
                enrollItemDto.getWeight(), enrollItemDto.getWeightUnit(), storedFileName);
        itemRepository.save(item);
        log.info("상품 등록 성공");
    }

    //-- 관리자 페이지에서 상품 수정하기 --//
    @Transactional
    public void updateItem(Long itemId, AdminDto.enrollItemDto enrollItemDto) {
        Item findItem = itemRepository.findOne(itemId);
        Category findCategory = categoryRepository.findById(findItem.getCategory().getId()).orElseThrow(NoSuchElementException::new);
        findItem.changeCategory(findCategory);
        findItem.changeInfo(enrollItemDto.getInfo());
        findItem.changeName(enrollItemDto.getName());
        findItem.changePrice(enrollItemDto.getPrice());
        findItem.changeStock(enrollItemDto.getStock());
        findItem.changeWeight(enrollItemDto.getWeight());
        findItem.changeWeightUnit(enrollItemDto.getWeightUnit());
    }

    //-- 관리자 페이지에서 상품 삭제하기 --//
    @Transactional
    public void removeItem(Long itemId) {
        Item findItem = itemRepository.findOne(itemId);
        Category findCategory = categoryRepository.findById(findItem.getCategory().getId()).orElseThrow(NoSuchElementException::new);
        categoryRepository.delete(findCategory);
    }

    /*
     * 카테고리 확인 메서드
     */
    public CategoryName checkCategory(AdminDto.enrollItemDto enrollItemDto) {
        String categoryName = enrollItemDto.getCategory_name();
        switch (categoryName) {
            case "PIG":
                return CategoryName.PIG;


            case "COW":
                return CategoryName.COW;


            case "SHEEP":
                return CategoryName.SHEEP;


            case "CHICKEN":
                return CategoryName.CHICKEN;


            case "FISH":
                return CategoryName.FISH;


            case "MEAL_KIT":
                return CategoryName.MEAL_KIT;

        }
        return CategoryName.COW; // default 값으로
    }
}