package shop.buenoMeat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shop.buenoMeat.domain.ItemAnswer;

public interface ItemAnswerRepository extends JpaRepository<ItemAnswer, Long> {

    ItemAnswer findByItemQnaId(Long itemQnaId);
}
