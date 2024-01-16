package shop.buenoMeat.service;

import com.mysql.cj.x.protobuf.MysqlxDatatypes;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.buenoMeat.domain.Cart;
import shop.buenoMeat.domain.CartItem;
import shop.buenoMeat.domain.Item;
import shop.buenoMeat.domain.Member;
import shop.buenoMeat.dto.ConvertToDto;
import shop.buenoMeat.dto.ItemDto;
import shop.buenoMeat.exception.CartItemAlreadyExistsException;
import shop.buenoMeat.exception.CartItemNotExistException;
import shop.buenoMeat.exception.CartNotExistException;
import shop.buenoMeat.repository.CartItemRepository;
import shop.buenoMeat.repository.CartRepository;
import shop.buenoMeat.repository.ItemRepository;
import shop.buenoMeat.repository.MemberRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CartService {

    private final MemberRepository memberRepository;
    private final ItemRepository itemRepository;
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    //-- 장바구니 담기 --//
    @Transactional
    public Long addToCart(Long memberId, Long itemId, ItemDto.addToCartDto addToCartDto) {
        Member findMember = memberRepository.findOne(memberId);
        Cart findCart = cartRepository.findByMemberId(memberId);

        //장바구니가 존재하지 않으면 새롭게 생성 ( 관계 주입 )
        if (findCart == null) {
            findCart = Cart.createCart(findMember);
            cartRepository.save(findCart);
        }

        Item findItem = itemRepository.findOne(itemId);
        CartItem findCartItem = cartItemRepository.findByCartIdAndItemId(findCart.getId(), findItem.getId());
        //해당 상품이 장바구니에 존재하지 않으면 생성 후 추가
        if (findCartItem == null) {
            findCartItem = CartItem.createCartItem(findCart, findItem, addToCartDto.getItemCount(), addToCartDto.getTotalPrice(), addToCartDto.getItemOption());
            cartItemRepository.save(findCartItem);
            return findCartItem.getId();
        //해당 상품이 장바구니에 이미 존재하면 이미 존재한다는 경고 메세지 return
        } else {
            throw new CartItemAlreadyExistsException("이미 장바구니에 존재하는 상품입니다.");
        }
    }


    //-- 마이페이지 장바구니 불러오기 --//
    @Transactional
    public Object getCartToMyPage(Long id) {
        Cart findCart = cartRepository.findByMemberId(id);
        if (findCart == null) { // 장바구니 존재하지 않는경우 예외처리
            throw new CartNotExistException("장바구니가 존재하지 않습니다.");
        }
        List<CartItem> findAllCartItem = cartItemRepository.findAllByCartId(findCart.getId());
        if (findAllCartItem == null) { // 장바구니가 비어있는 경우
            return "장바구니에 상품이 존재하지 않습니다.";
        }else { // 장바구니에 상품이 있는 경우
            return findAllCartItem.stream()
                    .map(ConvertToDto::convertToGetCartDto)
                    .collect(Collectors.toList());
        }
    }


    //-- 장바구니 전체 삭제 --//
    @Transactional
    public void deleteAllFromCart(Long id) {
        Cart findCart = cartRepository.findByMemberId(id);
        if (findCart != null) {
            List<CartItem> findAllCartItem = cartItemRepository.findAllByCartId(findCart.getId());
            for (CartItem cartItem : findAllCartItem) {
                cartItemRepository.delete(cartItem);
            }
        } else {
            throw new CartNotExistException("해당 회원은 장바구니가 존재하지 않습니다.");
        }
    }

    //-- 장바구니 단일 상품 삭제 --//
    @Transactional
    public void deleteSingleItemFromCart(Long memberId, Long itemId) {
        Cart findCart = cartRepository.findByMemberId(memberId);

        if (findCart != null) { // 장바구니가 존재하는 경우
            CartItem findCartItem = cartItemRepository.findByCartIdAndItemId(findCart.getId(), itemId);

            if (findCartItem != null) { // 해당 상품이 장바구니에 존재하는 경우
                cartItemRepository.delete(findCartItem);
            } else { // 해당 상품이 장바구니에 존재하지 않는 경우 예외 처리
                throw new CartItemNotExistException("장바구니에 해당 상품이 존재하지 않습니다.");
            }
        }else { // 장바구니가 존재하지 않을 경우 예외 처리
            throw new CartNotExistException("해당 회원은 장바구니가 존재하지 않습니다.");
        }
    }

    @Transactional
    //-- 장바구니 상품 수량 변경 --//
    public void changeCartItemCount(Long memberId, Long itemId, int count) {
        Cart findCart = cartRepository.findByMemberId(memberId);

        if (findCart != null) { // 장바구니가 존재하는 경우
            CartItem findCartItem = cartItemRepository.findByCartIdAndItemId(findCart.getId(), itemId);
            if (findCartItem != null) { // 해당 상품이 장바구니에 존재하는 경우

                findCartItem.changeTotalPrice((findCartItem.getTotalPrice() / findCartItem.getItemCount()) * count);
                findCartItem.changeCount(count);

            } else {// 해당 상품이 장바구니에 존재하지 않는 경우 예외 처리
                throw new CartItemNotExistException("장바구니에 해당 상품이 존재하지 않습니다.");
            }

        } else {// 장바구니가 존재하지 않을 경우 예외 처리
            throw new CartNotExistException("해당 회원은 장바구니가 존재하지 않습니다.");
        }
    }
}
