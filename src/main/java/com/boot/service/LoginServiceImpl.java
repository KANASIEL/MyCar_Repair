package com.boot.service;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;   // 🔐 추가
import org.springframework.stereotype.Service;

import com.boot.dao.LoginDAO;
import com.boot.dto.LoginDTO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private SqlSession sqlSession;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;   // 🔐 추가

    @Override
    public void register(LoginDTO accountDTO) {

        // 🔐 비밀번호 암호화
        String encPw = passwordEncoder.encode(accountDTO.getPassword());
        accountDTO.setPassword(encPw);

        log.info("회원가입 - 암호화된 비밀번호 저장: {}", encPw);

        LoginDAO dao = sqlSession.getMapper(LoginDAO.class);
        dao.register(accountDTO);
    }

    @Override
    public ArrayList<LoginDTO> loginYn(HashMap<String, String> param) {
        LoginDAO dao = sqlSession.getMapper(LoginDAO.class);
        ArrayList<LoginDTO> list = dao.loginYn(param);

        if (list.isEmpty()) {
            log.warn("로그인 실패: 아이디 불일치");
            return null;
        }

        LoginDTO user = list.get(0);

        if ("PENDING".equalsIgnoreCase(user.getAccountStatus())) {
            user.setAccountStatus("PENDING");
        } else if ("SUSPENDED".equalsIgnoreCase(user.getAccountStatus())) {
            user.setAccountStatus("SUSPENDED");
        } else if ("DELETED".equalsIgnoreCase(user.getAccountStatus())) {
            user.setAccountStatus("DELETED");
        }

        log.info("로그인 시도 결과: {}, 상태 = {}", user.getAccountId(), user.getAccountStatus());
        return list;
    }

    @Override
    public LoginDTO findByAccountId(String accountId) {
        LoginDAO dao = sqlSession.getMapper(LoginDAO.class);
        return dao.findByAccountId(accountId);
    }

}
