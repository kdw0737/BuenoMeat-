package shop.buenoMeat.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import shop.buenoMeat.domain.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findByMemberId(Long memberId); //회원 아이디로 장바구니 조회

}
