package com.boot.controller;

import com.boot.dto.AccountDTO;
import com.boot.service.AccountService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@Slf4j
@CrossOrigin(origins = "http://localhost:5173") // [중요] 리액트 서버(5173)의 접속을 허용
public class AccountController {

    @Autowired
    private AccountService accountService;

    // ==========================================
    // [1] 기존 JSP용 메소드 (그대로 유지)
    // ==========================================

    @GetMapping("/main")
    public String showMainPage() {
        return "main";
    }

    @GetMapping("/register")
    public String registerForm() {
        log.info("@# GET /register (JSP 회원가입 페이지)");
        return "register";
    }

    @PostMapping("/registerProc")
    public String registerProc(AccountDTO accountDTO, RedirectAttributes rttr) {
        log.info("@# POST /registerProc (JSP 회원가입 처리)");
        try {
            accountService.register(accountDTO);
        } catch (Exception e) {
            log.error("!!! 회원가입 실패: " + e.getMessage());
            rttr.addFlashAttribute("error_msg", "가입 실패");
            return "redirect:/register";
        }
        rttr.addFlashAttribute("success_msg", "회원가입 성공!");
        return "redirect:/login";
    }

    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }

    // ==========================================
    // [2] 리액트(React) 연동용 메소드 (추가됨)
    // ==========================================

    /**
     * 리액트에서 보내는 회원가입 요청을 처리하는 메소드
     * 주소: http://localhost:8484/api/register
     */
    @PostMapping("/api/register")
    @ResponseBody // [중요] JSP 파일이 아니라, 데이터(글자) 그 자체를 응답으로 보냄
    public String registerAPI(@RequestBody AccountDTO accountDTO) {
        // @RequestBody: 리액트가 보낸 JSON 데이터를 자바 객체로 변환
        
        log.info("🚀 [React] 회원가입 요청 데이터: " + accountDTO);

        try {
            accountService.register(accountDTO);
            log.info("✅ [React] 회원가입 성공");
            return "success"; // 리액트로 "success" 문자열 전송
        } catch (Exception e) {
            log.error("❌ [React] 회원가입 에러: " + e.getMessage());
            return "fail"; // 리액트로 "fail" 문자열 전송
        }
    }
}