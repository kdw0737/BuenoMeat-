package shop.buenoMeat.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import shop.buenoMeat.domain.CategoryName;
import shop.buenoMeat.domain.Item;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ItemRepository {

    private final EntityManager em;

    public Item findOne(Long id){return em.find(Item.class,id);} // 아이디로 상품 조회

    public void save(Item item){em.persist(item);} // 상품 저장

    public List<Item> findByItemName(String name) {
        return em.createQuery("SELECT i FROM Item i WHERE i.name LIKE :itemName", Item.class)
                .setParameter("itemName", "%" + name + "%")
                .getResultList();
    } // 검색어가 이름에 포함된 상품 조회

    public List<Item> findAll() {
        return em.createQuery("select i from Item i", Item.class)
                .getResultList();
    } // 상품 전체 조회

    public List<Item> findAllByCategory(CategoryName categoryName) {
        String jpql = "select i from Item i join i.category c where c.categoryName = :categoryName";
        return em.createQuery(jpql, Item.class)
                .setParameter("categoryName", categoryName)
                .getResultList();
    } // 카테고리명으로 상품 조회
}
