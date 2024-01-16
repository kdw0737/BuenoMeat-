package shop.buenoMeat.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.buenoMeat.domain.Item;
import shop.buenoMeat.domain.Member;
import shop.buenoMeat.domain.WishList;
import shop.buenoMeat.dto.ConvertToDto;
import shop.buenoMeat.dto.ItemDto;
import shop.buenoMeat.repository.ItemRepository;
import shop.buenoMeat.repository.MemberRepository;
import shop.buenoMeat.repository.WishListRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class WishListService {

    private final MemberRepository memberRepository;
    private final ItemRepository itemRepository;
    private final WishListRepository wishListRepository;

    //-- 찜 목록 상품 추가 --//
    @Transactional
    public ResponseEntity<String> addWishList(Long memberId, Long itemId) {
        Member findMember = memberRepository.findOne(memberId);
        Item findItem = itemRepository.findOne(itemId);
        Long findWishListId = wishListRepository.findAlreadyExist(memberId, itemId);
        if (findWishListId == 0) {
            WishList wishList = WishList.createWishList(findMember, findItem);
            wishListRepository.save(wishList);
            return ResponseEntity.ok("찜 목록에 추가를 완료하였습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("찜 목록에 상품이 이미 존재합니다.");
        }
    }


    //-- 찜 목록 상품 삭제 --//
    @Transactional
    public ResponseEntity<String> deleteWishList(Long memberId, Long itemId) {
        Member findMember = memberRepository.findOne(memberId);
        Item findItem = itemRepository.findOne(itemId);
        Long findWishListId = wishListRepository.findAlreadyExist(memberId, itemId);
        if (findWishListId != 0) {
            WishList wishList = wishListRepository.findOne(findWishListId);
            wishListRepository.delete(wishList);
            wishListRepository.flush();
            return ResponseEntity.ok("찜 목록에서 성공적으로 삭제하였습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("찜 목록에 해당 상품이 존재하지 않습니다.");
        }
    }

    //-- 마이페이지 찜 목록 불러오기 --//
    public List<ItemDto.mypageWishListDto> getWishListToMyPage(Long id) {
        List<WishList> findWishLists = wishListRepository.findAllByMemberId(id);
        List<Item> findItems = new ArrayList<>();
        for (WishList findWishList : findWishLists) {
            findItems.add(findWishList.getItem());
        }
        return findItems.stream()
                .map(ConvertToDto::convertToMyPageWishListDto)
                .collect(Collectors.toList());
    }
}
