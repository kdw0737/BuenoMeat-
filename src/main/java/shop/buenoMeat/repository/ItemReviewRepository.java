package shop.buenoMeat.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import shop.buenoMeat.domain.ItemReview;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ItemReviewRepository {

    private final EntityManager em;

    public void save(ItemReview itemReview) {em.persist(itemReview);} //회원 저장

    public ItemReview findByReviewId(Long id){ return em.find(ItemReview.class,id); }

    public List<ItemReview> findAllByMemberId(Long memberId) {
        return em.createQuery("select i from ItemReview i where i.member.id = :member_id", ItemReview.class)
                .setParameter("member_id", memberId).getResultList();
    }

    public List<ItemReview> findAllByItemId(Long itemId) {
        return em.createQuery("select i from ItemReview i where i.item.id = :item_id", ItemReview.class)
                .setParameter("item_id", itemId).getResultList();
    }

    public void delete(ItemReview itemReview){em.remove(itemReview);}

    public void flush() {
        em.flush();
    }

}