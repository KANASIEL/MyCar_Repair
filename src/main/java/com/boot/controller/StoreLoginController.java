package com.boot.controller;

import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;   // 🔐 추가
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boot.dto.StoreLoginDTO;
import com.boot.service.StoreLoginService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api")
@Slf4j
public class StoreLoginController {

    @Autowired
    private StoreLoginService storeLoginService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;   // 🔐 추가됨

    @PostMapping("/storeLogin")
    public HashMap<String, Object> login(@RequestBody HashMap<String, String> req,
                                         HttpSession session,
                                         HttpServletResponse response) {

        String storeId = req.get("storeId");
        String password = req.get("password");
        String saveId = req.get("saveId");

        HashMap<String, Object> result = new HashMap<>();

        // 로그인 실패 및 잠금 확인
        Integer failCount = (Integer) session.getAttribute("loginFailCount");
        Long lockTime = (Long) session.getAttribute("lockTime");
        if (failCount == null) failCount = 0;

        if (lockTime != null) {
            long diff = (System.currentTimeMillis() - lockTime) / 1000;
            if (diff < 30) {
                result.put("success", false);
                result.put("msg", "로그인 잠금 상태입니다. " + (30 - diff) + "초 후 다시 시도하세요.");
                return result;
            } else {
                session.removeAttribute("lockTime");
                session.setAttribute("loginFailCount", 0);
                failCount = 0;
            }
        }

        // DB 조회
        HashMap<String, String> param = new HashMap<>();
        param.put("storeId", storeId);

        ArrayList<StoreLoginDTO> list = storeLoginService.storeLoginYn(param);

        if (list == null || list.isEmpty()) {
            failCount++;
            session.setAttribute("loginFailCount", failCount);

            if (failCount >= 5) {
                session.setAttribute("lockTime", System.currentTimeMillis());
                result.put("msg", "5회 이상 실패로 30초간 잠금되었습니다.");
            } else {
                result.put("msg", "아이디 또는 비밀번호가 틀렸습니다. (" + failCount + "/5)");
            }

            result.put("success", false);
            return result;
        }

        StoreLoginDTO dto = list.get(0);

        // ❌ 기존: !password.equals()
        // ✔ 변경: !passwordEncoder.matches()
        if (!passwordEncoder.matches(password, dto.getPassword())) {
            failCount++;
            session.setAttribute("loginFailCount", failCount);

            if (failCount >= 5) {
                session.setAttribute("lockTime", System.currentTimeMillis());
                result.put("msg", "5회 이상 실패로 30초간 잠금되었습니다.");
            } else {
                result.put("msg", "비밀번호가 틀렸습니다. (" + failCount + "/5)");
            }

            result.put("success", false);
            return result;
        }

        // 로그인 성공
        session.setAttribute("storeId", dto.getStoreId());
        session.setAttribute("ROLE", "STORE");

        // 아이디 저장
        if ("true".equals(saveId)) {
            Cookie cookie = new Cookie("storeSavedId", storeId);
            cookie.setMaxAge(60 * 60 * 24 * 7);
            cookie.setPath("/");
            response.addCookie(cookie);
        } else {
            Cookie cookie = new Cookie("storeSavedId", null);
            cookie.setMaxAge(0);
            cookie.setPath("/");
            response.addCookie(cookie);
        }

        session.removeAttribute("loginFailCount");
        session.removeAttribute("lockTime");

        result.put("success", true);
        result.put("msg", "로그인 성공!");
        result.put("storeId", dto.getStoreId());

        return result;
    }
}
