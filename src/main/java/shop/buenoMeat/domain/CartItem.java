package shop.buenoMeat.domain;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class CartItem {

    @Id
    @GeneratedValue
    @Column(name = "cartItem_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cart_id")
    private Cart cart;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id")
    private Item item;

    private int itemCount;

    private int totalPrice;

    private String itemOption;


    public void changeCount(int itemCount) {this.itemCount = itemCount;}

    public void changeTotalPrice(int totalPrice) {this.totalPrice = totalPrice;}

    public void changeItemOption(String itemOption) {this.itemOption = itemOption;}

    public static CartItem createCartItem(Cart cart, Item item, int itemCount, int totalPrice, String itemOption) {
        CartItem cartItem = new CartItem();
        cartItem.cart = cart;
        cartItem.item = item;
        cartItem.itemCount = itemCount;
        cartItem.totalPrice = totalPrice;
        cartItem.itemOption = itemOption;
        return cartItem;
    }

}
