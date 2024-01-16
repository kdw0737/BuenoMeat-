package shop.buenoMeat.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import shop.buenoMeat.domain.Member;
import shop.buenoMeat.repository.MemberRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SocialLoginService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Member member = Optional.ofNullable(memberRepository.findByEmail(email).get(0))
                .orElseThrow(() -> new UsernameNotFoundException("해당 이메일이 존재하지 않습니다."));
        return org.springframework.security.core.userdetails.User.builder()
                .username(member.getEmail())
                .password(member.getPw())
                .roles(member.getRole().name())
                .build();
    }
}
