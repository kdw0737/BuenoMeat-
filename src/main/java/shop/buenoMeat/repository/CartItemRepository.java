package shop.buenoMeat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import shop.buenoMeat.domain.CartItem;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    CartItem findByCartIdAndItemId(Long cartId, Long itemID);

    List<CartItem> findAllByCartId(Long cartId);

    Long countByCartId(Long cartId);

    CartItem findByCartId(Long cartId);

    CartItem findByItemId(Long itemId);

    @Query("delete ")
}
