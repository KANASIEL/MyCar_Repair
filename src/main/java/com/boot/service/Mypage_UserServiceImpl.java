package com.boot.service;

import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.crypto.password.PasswordEncoder; // 1. PasswordEncoder import 삭제
import org.springframework.stereotype.Service;

import com.boot.dao.Mypage_UserDAO;
import com.boot.dto.AccountDTO;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class Mypage_UserServiceImpl implements Mypage_UserService {

    @Autowired
    private Mypage_UserDAO dao;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public AccountDTO getUserInfo(String accountId) {
        return dao.getUserInfo(accountId);
    }

    @Override
    public int updateUserInfo(AccountDTO account) {
        return dao.updateUserInfo(account);
    }

    @Override
    public boolean updatePassword(String accountId, String currentPw, String newPw) {

        // DB 해시 비밀번호 가져오기
        String dbPassword = dao.getPasswordByAccountId(accountId);
        if (dbPassword == null) return false;

        // 평문 vs 해시 비교 → matches() 사용 필수
        if (!passwordEncoder.matches(currentPw, dbPassword)) {
            return false;
        }

        // 새 비밀번호 암호화하여 저장
        String encodedNew = passwordEncoder.encode(newPw);
        dao.updatePassword(accountId, encodedNew);

        return true;
    }
}

