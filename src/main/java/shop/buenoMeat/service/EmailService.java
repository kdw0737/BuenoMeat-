package shop.buenoMeat.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import shop.buenoMeat.domain.Member;
import shop.buenoMeat.dto.EmailDto;
import shop.buenoMeat.repository.MemberRepository;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
@Transactional
public class EmailService {
    private final JavaMailSender emailSender;
    private final MemberRepository memberRepository;
    private String authNum; // 인증 번호
    private final PasswordEncoder passwordEncoder;

    //-- 인증번호 8자리 무작위 생성 --//
    public void createCode() {
        Random random = new Random();
        StringBuffer key = new StringBuffer();

        for(int i=0; i<8; i++) {
            int idx = random.nextInt(3);

            switch (idx) {
                case 0 :
                    key.append((char) ((int)random.nextInt(26) + 97));
                    break;
                case 1:
                    key.append((char) ((int)random.nextInt(26) + 65));
                    break;
                case 2:
                    key.append(random.nextInt(9));
                    break;
            }
        }
        authNum = key.toString();
    }

    //-- 메일 양식 작성 --//
    public MimeMessage createEmailForm(String email) throws MessagingException, UnsupportedEncodingException {
        createCode();
        String setFrom = "kdw981129@gmail.com";
        String toEmail = email;
        String title = "BuenoMeat 인증번호입니다.";

        MimeMessage message = emailSender.createMimeMessage();
        message.addRecipients(MimeMessage.RecipientType.TO, toEmail);
        message.setSubject(title);

        // 메일 내용
        String msgOfEmail="";
        msgOfEmail += "<div style='margin:20px;'>";
        msgOfEmail += "<h1> 안녕하세요 BuenoMeat 인증번호입니다. </h1>";
        msgOfEmail += "<br>";
        msgOfEmail += "<p>아래 코드를 입력해주세요<p>";
        msgOfEmail += "<br>";
        msgOfEmail += "<p>감사합니다.<p>";
        msgOfEmail += "<br>";
        msgOfEmail += "<div align='center' style='border:1px solid black; font-family:verdana';>";
        msgOfEmail += "<h3 style='color:blue;'>회원가입 인증 코드입니다.</h3>";
        msgOfEmail += "<div style='font-size:130%'>";
        msgOfEmail += "CODE : <strong>";
        msgOfEmail += authNum + "</strong><div><br/> ";
        msgOfEmail += "</div>";

        message.setFrom(setFrom);
        message.setText(msgOfEmail, "utf-8", "html");

        return message;
    }

    //-- 실제 메일 전송 --//
    public String sendEmail(String email) throws MessagingException, UnsupportedEncodingException {

        //메일전송에 필요한 정보 설정
        MimeMessage emailForm = createEmailForm(email);
        //실제 메일 전송
        emailSender.send(emailForm);

        return authNum; //인증 코드 반환
    }

    //-- 비밀번호 재설정 --//
    public void setNewPw(EmailDto.setNewPwRequest req) {
        List<Member> findMemberByEmail = Optional.ofNullable(memberRepository.findByEmail(req.getEmail())).orElseThrow(NoSuchElementException::new);
        Member findMember = findMemberByEmail.get(0);
        findMember.changePw(req.getPw(), passwordEncoder);
    }

    //-- 아이디 찾기 --//
    public ResponseEntity<Object> findId(EmailDto.findIdRequest req) {
        Optional<Member> findMember = Optional.ofNullable(memberRepository.findByPhone(req.getPhone()));
        if (findMember.isEmpty()) {
            return ResponseEntity.badRequest().body("일치하는 회원이 없습니다.");
        } else {
            return ResponseEntity.ok(findMember.get().getEmail());
        }
    }
}