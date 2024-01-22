package shop.buenoMeat.domain;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import shop.buenoMeat.exception.NotEnoughStockException;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Item {

    @Id
    @GeneratedValue
    @Column(name = "item_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "item")
    private List<ItemReview> itemReviews = new ArrayList<>();

    @OneToMany(mappedBy = "item")
    private List<ItemQna> itemQnas = new ArrayList<>();

    @Column(nullable = false)
    private String name;

    private String info;

    @Column(nullable = false)
    private int price;

    @Column(nullable = false)
    private String weight;

    @Column(nullable = false)
    private String weightUnit;

    private int stock;

    @Column(nullable = false)
    private LocalDateTime enrolled;

    @Column(length = 1000)
    private String image;

    private Integer soldQuantity; // 판매수량, 판매량이 없는경우 0 or null

    public Item(Category category, String info, String name, int price, int stock, String weight, String weightUnit, String image) {
        this.category = category;
        this.info = info;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.weight = weight;
        this.weightUnit = weightUnit;
        this.enrolled = LocalDateTime.now();
        this.soldQuantity = 0;
        this.image = image;
    }

    //-- 생성 메서드 --//
    public static Item createItem(Category category, String info, String name, int price, int stock, String weight, String weightUnit, String image) {
        return new Item(category, info, name, price, stock, weight, weightUnit, image);
    }

    //-- 수정 메서드 --//
    public void changeCategory(Category category){ this.category = category; }
    public void changeInfo(String info){ this.info = info; }
    public void changeName(String name){ this.name = name; }
    public void changePrice(int price){ this.price = price; }
    public void changeStock(int stock){ this.stock = stock; }
    public void changeWeight(String weight){ this.weight = weight; }
    public void changeWeightUnit(String weightUnit){ this.weightUnit = weightUnit; }
    public void changeSoldQuantity(int soldQuantity){ this.soldQuantity = soldQuantity; }

    /***
     * 재고 감소
     */
    public void removeStock(int quantity) {
        int remainStock = this.stock - quantity;
        if (remainStock < 0) {
            throw new NotEnoughStockException("남아있는 재고가 없습니다.");
        }
        this.stock = remainStock;
    }

    /*
     * 재고 증가
     */
    public void addStock(int quantity) {
        this.stock += quantity;
    }

}
