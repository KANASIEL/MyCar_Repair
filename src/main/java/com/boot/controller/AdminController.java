package com.boot.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boot.service.AdminService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/admin") // 공통 주소 설정
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true") // 리액트 접속 허용
public class AdminController {

    @Autowired
    private AdminService adminService;

    /**
     * [API] 관리자 승급 처리 (DB: USER -> ADMIN)
     * React 요청: POST /api/admin/promote
     */
    @PostMapping("/promote")
    public Map<String, Object> promoteAdminProc(@RequestBody Map<String, String> payload, 
                                                HttpSession session) {
        
        log.info("@# POST /api/admin/promote (관리자 승급 요청)");
        
        Map<String, Object> response = new HashMap<>();

        // 1. 세션에서 로그인된 아이디 확인
        String loginId = (String) session.getAttribute("accountId"); 

        if (loginId == null) {
            response.put("success", false);
            response.put("message", "로그인이 필요한 서비스입니다.");
            return response;
        }

        // 2. 리액트가 보낸 관리자 키 확인
        String adminKey = payload.get("adminKey");

        // 3. 서비스 호출 (키 검증 및 DB 업데이트)
        boolean isSuccess = adminService.upgradeToAdmin(loginId, adminKey);

        if (isSuccess) {
            // [성공] 세션 권한을 ADMIN으로 변경
            session.setAttribute("ROLE", "ADMIN"); 
            
            response.put("success", true);
            response.put("message", "축하합니다! 관리자로 승급되었습니다.");
            response.put("role", "ADMIN");
        } else {
            // [실패]
            response.put("success", false);
            response.put("message", "관리자 키가 올바르지 않습니다.");
        }

        return response;
    }

    /**
     * [API] 관리자 모드 해제 (DB: ADMIN -> USER)
     * React 요청: GET /api/admin/exit
     */
    @GetMapping("/exit")
    public Map<String, Object> exitAdminMode(HttpSession session) {
        log.info("@# GET /api/admin/exit (관리자 모드 해제 요청)");
        
        Map<String, Object> response = new HashMap<>();
        
        // 세션에서 로그인된 아이디 확인
        String loginId = (String) session.getAttribute("accountId");
        
        if (loginId != null) {
            try {
                // 1. [중요] DB에서 권한을 USER로 변경하는 서비스 호출
                // (AdminService에 downgradeToUser 메소드가 있어야 함)
                adminService.downgradeToUser(loginId); 

                // 2. 세션 권한도 USER로 변경
                session.setAttribute("ROLE", "USER"); 
                
                response.put("success", true);
                response.put("message", "관리자 모드가 해제되었습니다. (일반 유저 전환)");
                response.put("role", "USER");
                
            } catch (Exception e) {
                log.error("관리자 해제 중 오류 발생: " + e.getMessage());
                response.put("success", false);
                response.put("message", "DB 처리 중 오류가 발생했습니다.");
            }
        } else {
            response.put("success", false);
            response.put("message", "로그인 상태가 아닙니다.");
        }
        
        return response;
    }
}