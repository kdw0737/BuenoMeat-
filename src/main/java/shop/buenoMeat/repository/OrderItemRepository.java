package shop.buenoMeat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shop.buenoMeat.domain.OrderItem;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    List<OrderItem> findAllByOrderId(Long orderId);

    OrderItem findByOrderIdAndItemId(Long orderId, Long itemId);

    OrderItem findByItemId(Long itemId);
}
