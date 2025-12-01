package com.boot.controller;

import com.boot.dto.AccountDTO;
import com.boot.dto.Criteria;
import com.boot.dto.PagingDTO;
import com.boot.dto.StoreDTO;
import com.boot.service.Mypage_AdminService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/mypage/admin")
public class MypageAdminRestController {

    @Autowired
    private Mypage_AdminService adminService;


    /** 🔹 관리자 전체 데이터 조회 (회원 + 대기중 업체 + 페이징 포함) */
    @GetMapping("/dashboard")
    public Map<String, Object> getAdminDashboard(
            @RequestParam(defaultValue = "1") int userPageNum,
            @RequestParam(defaultValue = "10") int userAmount,
            @RequestParam(defaultValue = "1") int storePageNum,
            @RequestParam(defaultValue = "10") int storeAmount) {

        Map<String, Object> result = new HashMap<>();

        /* --- 회원 페이징 Criteria --- */
        Criteria userCri = new Criteria();
        userCri.setPageNum(userPageNum);
        userCri.setAmount(userAmount);

        List<AccountDTO> userList = adminService.getAllUsers(userCri);
        int userTotal = adminService.getTotalUserCount(userCri);
        PagingDTO userPageMaker = new PagingDTO(userTotal, userCri);

        result.put("userList", userList);
        result.put("userPageMaker", userPageMaker);

        /* --- 업체 페이징 Criteria --- */
        Criteria storeCri = new Criteria();
        storeCri.setPageNum(storePageNum);
        storeCri.setAmount(storeAmount);

        List<StoreDTO> pendingStores = adminService.getPendingStoresWithPaging(storeCri);
        int storeTotal = adminService.countPendingStores(storeCri);
        PagingDTO storePageMaker = new PagingDTO(storeTotal, storeCri);

        result.put("pendingStores", pendingStores);
        result.put("storePageMaker", storePageMaker);

        return result;
    }



    /** 🔹 회원 상태 변경 (ACTIVE / SUSPENDED / DELETED) */
    @PostMapping("/user/updateStatus")
    public Map<String, String> updateUserStatus(
            @RequestBody Map<String, String> payload) {

        String accountId = payload.get("accountId");
        String status = payload.get("status");

        log.info("🔧 updateUserStatus: {} → {}", accountId, status);

        adminService.updateAccountStatus(accountId, status);

        Map<String, String> response = new HashMap<>();
        response.put("result", "success");
        return response;        
    }


    /** 🔹 업체 승인/거절 처리 (APPROVED / REJECTED) */
    @PostMapping("/store/updateStatus")
    public Map<String, String> updateStoreStatus(
            @RequestBody Map<String, String> payload) {

        String storeId = payload.get("storeId");
        String status = payload.get("status");

        log.info("🏪 updateStoreStatus: {} → {}", storeId, status);

        adminService.updateStoreStatus(storeId, status);

        Map<String, String> response = new HashMap<>();
        response.put("result", "success");
        return response;
    }
}
