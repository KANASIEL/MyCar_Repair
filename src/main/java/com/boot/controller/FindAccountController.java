package com.boot.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.UUID;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;   // 🔐 추가
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.boot.dto.FindAccountDTO;
import com.boot.service.FindAccountService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api")
@Slf4j
public class FindAccountController {

    @Autowired
    private FindAccountService service;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;   // 🔐 추가됨

    // -------------------------
    // 아이디 찾기
    // -------------------------
    @PostMapping("findAccount")
    public HashMap<String, Object> findAccount(@RequestBody HashMap<String, String> param) {

        HashMap<String, Object> result = new HashMap<>();

        String email = param.get("email");
        String phone = param.get("phone");

        ArrayList<FindAccountDTO> dtos = service.findAccount(param);

        if (dtos != null && !dtos.isEmpty()) {
            FindAccountDTO dbDto = dtos.get(0);

            if (phone.equals(dbDto.getPhoneNumber()) && email.equals(dbDto.getEmail())) {

                try {
                    MimeMessage message = mailSender.createMimeMessage();
                    MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

                    helper.setFrom("carrepair3team@gmail.com");
                    helper.setTo(email);
                    helper.setSubject("[MY CAR 정비소] 아이디 안내");

                    String htmlContent = String.format("""
	                        <html>
	                        <body>
	                          <h3>MY CAR 정비소</h3>
	                          <p>회원님의 아이디는 <b>%s</b> 입니다.</p>
	                        </body>
	                        </html>
	                        """, dbDto.getAccountId());

                    helper.setText(htmlContent, true);
                    mailSender.send(message);

                    result.put("success", true);
                    return result;

                } catch (MessagingException e) {
                    result.put("success", false);
                    result.put("message", "메일 전송 실패");
                    return result;
                }
            }
        }

        result.put("success", false);
        result.put("message", "입력 정보가 일치하지 않음");
        return result;
    }


    // -------------------------
    // 비밀번호 찾기
    // -------------------------
    @PostMapping("/findPW")
    public HashMap<String, Object> findPw(@RequestBody HashMap<String, String> param) {

        HashMap<String, Object> result = new HashMap<>();

        String email = param.get("email");
        String phone = param.get("phone");
        String accountId = param.get("accountId");

        ArrayList<FindAccountDTO> dtos = service.findPW(param);

        if (dtos != null && !dtos.isEmpty()) {

            FindAccountDTO dbDto = dtos.get(0);

            if (phone.equals(dbDto.getPhoneNumber()) && 
                email.equals(dbDto.getEmail()) &&
                accountId.equals(dbDto.getAccountId())) {

                try {
                    // 🔐 임시 비밀번호 생성
                    String tempPw = UUID.randomUUID().toString().substring(0, 10);

                    // 🔐 암호화 후 DB 저장
                    String encPw = passwordEncoder.encode(tempPw);
                    service.newPW(accountId, encPw, dbDto.getRole());

                    // 메일 발송
                    MimeMessage message = mailSender.createMimeMessage();
                    MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

                    helper.setFrom("carrepair3team@gmail.com");
                    helper.setTo(email);
                    helper.setSubject("[MY CAR 정비소] 임시 비밀번호 발급");

                    String htmlContent = String.format("""
						    <html>
						    <body>
						        <h3>임시 비밀번호 안내</h3>
						        <p>임시 비밀번호: <b>%s</b></p>
						        <p>로그인 후 즉시 비밀번호를 변경해주세요.</p>
						    </body>
						    </html>
						    """, tempPw);

                    helper.setText(htmlContent, true);

                    mailSender.send(message);

                    result.put("success", true);
                    result.put("message", "임시 비밀번호 발송 완료");
                    return result;

                } catch (MessagingException e) {
                    result.put("success", false);
                    result.put("message", "메일 전송 실패");
                    return result;
                }
            }
        }

        result.put("success", false);
        result.put("message", "입력 정보가 일치하지 않음");
        return result;
    }
}
