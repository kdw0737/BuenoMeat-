package shop.buenoMeat.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import shop.buenoMeat.domain.WishList;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class WishListRepository {

    private final EntityManager em;

    public void save(WishList wishList){em.persist(wishList);} // 찜 목록에 저장

    public void delete(WishList wishList){em.remove(wishList);} // 찜 목록에서 삭제

    public void flush() {
        em.flush();
    }

    public WishList findOne(Long id) {
        return em.find(WishList.class, id);
    } // 아이디로 찜 상품 검색

    public List<WishList> findAllByMemberId(Long id) {
        return em.createQuery("select w from WishList w where w.member.id = :member_id", WishList.class)
                .setParameter("member_id", id)
                .getResultList();
    } // 회원아이디로 검색

    public List<WishList> findAllByItemId(Long id) {
        return em.createQuery("select w from WishList w where w.item.id = :item_id", WishList.class)
                .setParameter("item_id", id)
                .getResultList();
    } // 상품 아이디로 검색

    public Long findAlreadyExist(Long memberId, Long itemId) {
        List<WishList> findByMemberId = findAllByMemberId(memberId);
        for (WishList wishList : findByMemberId) {
            if (wishList.getItem().getId().equals(itemId)) {
                return wishList.getId();
            }
        }
        return Long.parseLong("0");
    } // 찜 목록에 존재하는지 체크 및 wishList 아이디 반환

}
