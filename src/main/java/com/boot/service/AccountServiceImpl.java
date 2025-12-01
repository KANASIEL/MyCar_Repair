package com.boot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;   // 🔥 추가
import org.springframework.stereotype.Service;

import com.boot.dao.AccountDAO;
import com.boot.dto.AccountDTO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountDAO accountDAO;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;   // 🔥 추가

    @Override
    public void register(AccountDTO accountDTO) {

        try {
            String encPw = passwordEncoder.encode(accountDTO.getPassword());
            accountDTO.setPassword(encPw);

            log.info("🔐 암호화된 비밀번호 = {}", encPw);

            accountDAO.register(accountDTO);

        } catch (Exception e) {
            log.error("🔥 회원가입 INSERT 실패 원인:", e);
            throw e;   // 반드시 터뜨려서 Controller에서 감지하게 함
        }
    }

}
