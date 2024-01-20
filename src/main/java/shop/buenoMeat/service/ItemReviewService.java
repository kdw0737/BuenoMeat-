package shop.buenoMeat.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import shop.buenoMeat.domain.*;
import shop.buenoMeat.dto.ConvertToDto;
import shop.buenoMeat.dto.ItemDto;
import shop.buenoMeat.dto.MemberDto;
import shop.buenoMeat.exception.SelfRecommendationException;
import shop.buenoMeat.repository.ItemRepository;
import shop.buenoMeat.repository.MemberRepository;
import shop.buenoMeat.repository.ItemReviewRepository;
import shop.buenoMeat.repository.OrderItemRepository;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ItemReviewService {

    private final ItemRepository itemRepository;
    private final MemberRepository memberRepository;
    private final ItemReviewRepository itemReviewRepository;
    private final OrderItemRepository orderItemRepository;
    private final S3UploadService s3UploadService;


    //-- 리뷰내역(마이페이지) 불러오기 --//
    public ItemDto.getReviewFormPage getReviewFormPage(Long memberId) {
        Member findMember = memberRepository.findOne(memberId);
        List<ItemReview> findAllReviews = itemReviewRepository.findAllByMemberId(memberId);
        int totalRecommend = 0;
        // 회원이 쓴 리뷰의 추천개수 총합 계산
        for (ItemReview findReview : findAllReviews) {
            totalRecommend += findReview.getRecommend();
        }
        ItemDto.reviewUserInfo reviewUserInfo = new ItemDto.reviewUserInfo(findMember.getUsername(), totalRecommend);
        List<ItemDto.reviewItemInfo> reviewItemInfos = findAllReviews.stream()
                .map(ConvertToDto::convertToReviewItemInfo)
                .collect(Collectors.toList());
        return new ItemDto.getReviewFormPage(reviewItemInfos, reviewUserInfo);
    }

    @Transactional
    //-- 리뷰 작성하기 --//
    public void enrollReview(Long memberId, Long itemId, ItemDto.enrollReviewDto enrollReviewDto, MultipartFile image) throws IOException {
        Item findItem = itemRepository.findOne(itemId);
        Member findMember = memberRepository.findOne(memberId);
        String storedFileName = "이미지 없음";
        if (!image.isEmpty()) {
            storedFileName = s3UploadService.upload(image, "image");
        } else {
            log.info("리뷰 사진없이 글만 저장합니다.");
        }
        ItemReview itemReview = ItemReview.createReview(findItem, findMember, enrollReviewDto.getComment(),
                enrollReviewDto.getStarRating(), storedFileName);
        itemReviewRepository.save(itemReview);

        //작성 완료 상태로 바꾸어주기
        orderItemRepository.findByItemId(itemId).changeOrderStatus(OrderItemStatus.REV_COMP);
    }

    @Transactional
    //-- 리뷰 추천 하기 --//
    public MemberDto.reviewRecommendDto addReviewRecommend(Long memberId, Long reviewId) {
        ItemReview findReview = itemReviewRepository.findByReviewId(reviewId);
        if (findReview.getMember().getId().equals(memberId)) { // 자신이 쓴 글 추천 방지
            throw new SelfRecommendationException("자신의 리뷰글에는 추천할 수 없습니다.");

        } else { // 추천을 누를 경우 추천 수 증가
            findReview.addRecommend();
        }
        return new MemberDto.reviewRecommendDto(
                "추천이 성공적으로 완료되었습니다.", findReview.getRecommend());
    }

    @Transactional
    //-- 리뷰 추천 취소하기 --//
    public MemberDto.reviewRecommendDto cancelReviewRecommend(Long memberId, Long reviewId) {
        ItemReview findReview = itemReviewRepository.findByReviewId(reviewId);
        findReview.cancelRecommend(); // 추천 수 감소
        return new MemberDto.reviewRecommendDto(
                "추천을 취소했습니다.", findReview.getRecommend());
    }

    @Transactional
    //-- 리뷰 수정하기 --//
    public void updateReview(Long reviewId, ItemDto.updateReviewDto updateReviewDto) {
        ItemReview findReview = itemReviewRepository.findByReviewId(reviewId);
        findReview.changeComment(updateReviewDto.getComment());
        findReview.changeImage(updateReviewDto.getReviewImage());
        findReview.changeStarRating(updateReviewDto.getStarRating());
    }

    @Transactional
    //-- 리뷰 삭제하기 --//
    public void deleteReview(Long reviewId, Long memberId) {
        ItemReview findReview = itemReviewRepository.findByReviewId(reviewId);

        if (findReview == null) { // 해당 리뷰가 존재하지 않는 경우
            throw new RuntimeException("해당 리뷰가 존재하지 않습니다.");
        } else { // 문의글을 찾은 경우
            if (findReview.getMember().getId().equals(memberId)) { // 자신이 작성한 리뷰가 맞는 경우
                itemReviewRepository.delete(findReview);
            } else { // 자신이 작성한 리뷰가 아닌 경우
                throw new RuntimeException("자신이 작성한 리뷰만 삭제할 수 있습니다");
            }
        }
    }
}
