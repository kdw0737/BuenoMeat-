package shop.buenoMeat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import shop.buenoMeat.domain.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
