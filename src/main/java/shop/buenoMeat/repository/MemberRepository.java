package shop.buenoMeat.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import shop.buenoMeat.domain.Member;
import shop.buenoMeat.domain.SocialType;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class MemberRepository {

    private final EntityManager em;

    public void save(Member member) {em.persist(member);} //회원 저장

    public void flush() {
        em.flush();
    }

    public Member findOne(Long id) {return em.find(Member.class, id);} // member_id 로 회원 검색

    public List<Member> findAll() {
        return em.createQuery("select m from Member m", Member.class).getResultList();
    } // 회원 전체를 리스트로 반환

    public List<Member> findByNickname(String nickname) {
        return em.createQuery("select m from Member m where m.nickname = :nickname", Member.class)
                .setParameter("nickname", nickname).getResultList();
    } // 닉네임으로 회원 조회

    public List<Member> findByEmail(String email) {
        return em.createQuery("select m from Member m where m.email = :email", Member.class)
                .setParameter("email", email).getResultList();
    }// 이메일로 회원 조회

    public Member findByRefreshToken(String refreshToken) {
        return em.createQuery("select m from Member m where m.refreshToken = :refreshToken", Member.class)
                .setParameter("refreshToken", refreshToken).getSingleResult();
    } // 리프레쉬 토큰으로 조회

    public List<Member> findBySocialTypeAndSocialId(SocialType socialType, String socialId) {
        return em.createQuery("select m from Member m where m.socialId = :socialId and m.socialType = :socialType",Member.class)
                .setParameter("socialId", socialId)
                .setParameter("socialType", socialType).getResultList();
    } //추가 정보를 입력받아 회원 가입을 진행할 때 소셜 타입, 식별자로 해당 회원을 찾기 위한 메소드

    public Member findByPhone(String phone) {
        return em.createQuery("select m from Member m where m.phone = :phone", Member.class)
                .setParameter("phone", phone).getSingleResult();
    }
}
