package shop.buenoMeat.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Category {

    @Id
    @GeneratedValue
    @Column(name = "category_id")
    private Long id;

    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    private List<Item> items = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CategoryName categoryName; // PIG,COW,CHICKEN,SHEEP,FISH,MEAL_KIT

    public Category(CategoryName categoryName) {
        this.categoryName = categoryName;
    }

    //-- 생성 메서드 --//
    public static Category createCategory(CategoryName categoryName) {
        return new Category(categoryName);
    }
}
