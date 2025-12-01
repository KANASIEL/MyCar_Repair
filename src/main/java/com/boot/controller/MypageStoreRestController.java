package com.boot.controller;

import com.boot.dto.StoreDTO;
import com.boot.service.Mypage_StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mypage/store")
public class MypageStoreRestController {

    private final Mypage_StoreService service;

    /** 업체 정보 조회 */
    @GetMapping("/info")
    public StoreDTO getStoreInfo(HttpSession session) {
        String storeId = (String) session.getAttribute("storeId");
        if (storeId == null) return null;

        return service.getStoreInfo(storeId);
    }

    /** 업체 정보 수정 */
    @PostMapping("/update")
    public Map<String, Object> updateInfo(@RequestBody StoreDTO dto, HttpSession session) {

        String storeId = (String) session.getAttribute("storeId");
        dto.setStoreId(storeId);

        int result = service.updateStoreInfo(dto);

        Map<String, Object> res = new HashMap<>();
        res.put("success", result > 0);
        return res;
    }

    /** 비밀번호 변경 */
    @PostMapping("/updatePassword")
    public Map<String, Object> updatePw(
            @RequestBody Map<String, String> req,
            HttpSession session) {

        String storeId = (String) session.getAttribute("storeId");

        String currentPw = req.get("currentPw");
        String newPw = req.get("newPw");

        boolean ok = service.updatePassword(storeId, currentPw, newPw);

        Map<String, Object> res = new HashMap<>();
        res.put("success", ok);
        return res;
    }
}
