package shop.buenoMeat.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.buenoMeat.domain.*;
import shop.buenoMeat.dto.ConvertToDto;
import shop.buenoMeat.dto.QnaDto;
import shop.buenoMeat.repository.ItemAnswerRepository;
import shop.buenoMeat.repository.ItemQnaRepository;
import shop.buenoMeat.repository.ItemRepository;
import shop.buenoMeat.repository.MemberRepository;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemQnaService {

    private final MemberRepository memberRepository;
    private final ItemRepository itemRepository;
    private final ItemQnaRepository itemQnaRepository;

    private final ItemAnswerRepository itemAnswerRepository;


    //-- 문의 글 작성하기 --//
    @Transactional
    public void enrollQna(Long memberId, Long itemId, QnaDto.qnaRequestDto qnaRequestDto) {
        Member findMember = memberRepository.findOne(memberId);
        Item findItem = itemRepository.findOne(itemId);
        ItemQna itemQna = ItemQna.createItemQna(findItem, findMember, qnaRequestDto.getTitle(), qnaRequestDto.getComment());
        itemQnaRepository.save(itemQna);
    }


    //-- 문의 글 삭제 --//
    @Transactional
    public void deleteQna(Long itemQnA_id, Long memberId) {
        Optional<ItemQna> findQna = itemQnaRepository.findById(itemQnA_id);

        if (findQna.isEmpty()) { // 해당 문의 글이 존재하지 않는 경우
            throw new RuntimeException("해당 문의글이 존재하지 않습니다.");
        } else { // 문의글을 찾은 경우
            if (findQna.get().getMember().getId().equals(memberId)) { // 자신이 작성한 글이 맞는 경우
                if (findQna.get().getQnaStatus().equals(QnaStatus.WAITING)) { //답변 대기중이면 바로 삭제 가능
                    itemQnaRepository.delete(findQna.get());
                } else {// 답변 완료상태면 답변먼저 지우고 문의 삭제
                    ItemAnswer findItemAnwer = itemAnswerRepository.findByItemQnaId(findQna.get().getId());
                    itemAnswerRepository.delete(findItemAnwer);
                    itemQnaRepository.delete(findQna.get());
                }
            } else { // 자신이 작성한 글이 아닌 경우
                throw new RuntimeException("자신이 작성한 글만 삭제할 수 있습니다");
            }
        }
    }


    //-- 문의 기록 불러오기 ( 마이페이지 ) --//
    public QnaDto.getQnaListToMyPage getAllQnaToMyPage(Long memberId) {
        List<ItemQna> findAllByMemberId = itemQnaRepository.findAllByMemberId(memberId);
        List<QnaDto.qnaInfo> qnaInfos = findAllByMemberId.stream()
                .map(ConvertToDto::convertToQnaInfo)
                .collect(Collectors.toList());
        return new QnaDto.getQnaListToMyPage(qnaInfos);
    }

    //-- 문의 기록 클릭한 경우 ( 마이페이지 ) --//
    public QnaDto.getQnaDetailDto getQnaDetailToMyPage(Long qnaId) {
        ItemQna findQna = itemQnaRepository.findById(qnaId).orElseThrow(NoSuchElementException::new);
        ItemAnswer findQnaAnswer = itemAnswerRepository.findByItemQnaId(findQna.getId());
        return new QnaDto.getQnaDetailDto(
                findQna.getTitle(), findQna.getItem().getImage(), findQna.getItem().getName(), findQna.getComment(),
                findQna.getQTime(), findQna.getQnaStatus(), findQnaAnswer.getAnswer(), findQnaAnswer.getAnswerTime()
        );
    }
}
