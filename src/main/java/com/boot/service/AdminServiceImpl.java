package com.boot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.boot.dao.AdminDAO;
import com.boot.dto.AdminDTO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminDAO adminDAO; 

    private final String ADMIN_SECRET_KEY = "1234"; 

    @Transactional 
    @Override
    public boolean upgradeToAdmin(String loginId, String adminKey) {

        // 1. 관리자 키("1234") 비교
        if (!ADMIN_SECRET_KEY.equals(adminKey)) {
            log.warn("관리자 키 입력 오류 (ID: " + loginId + ")");
            return false; // 키가 틀리면 실패
        }

        try {
            // 2. 키가 맞으면 DTO에 값 세팅
            AdminDTO adminDTO = new AdminDTO();
            adminDTO.setAccountId(loginId);
            adminDTO.setAccountRole("ADMIN");

            // 3. DAO를 호출하여 DB 업데이트
            adminDAO.updateAccountRole(adminDTO);
            log.info(loginId + " 사용자의 권한을 ADMIN으로 변경했습니다.");

            return true; // 성공

        } catch (Exception e) {
            log.error("!!! [관리자 승급 DB 오류] 진짜 원인: " + e.getMessage());
            e.printStackTrace(); 
            return false; // DB 오류 시 실패
        }
    }
    @Override
    public void downgradeToUser(String accountId) {
        adminDAO.downgradeToUser(accountId);
    }
}