package shop.buenoMeat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shop.buenoMeat.domain.ItemQna;

import java.util.List;

public interface ItemQnaRepository extends JpaRepository<ItemQna, Long> {

    List<ItemQna> findAllByMemberId(Long memberId);

    List<ItemQna> findAllByItemId(Long itemId);
}
