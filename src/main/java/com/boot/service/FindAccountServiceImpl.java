package com.boot.service;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;   // 🔐 추가
import org.springframework.stereotype.Service;

import com.boot.dao.FindAccountDAO;
import com.boot.dto.FindAccountDTO;

@Service
public class FindAccountServiceImpl implements FindAccountService {

    @Autowired
    private SqlSession sqlSession;

    @Autowired
    private FindAccountDAO dao;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;   // 🔐 추가

    @Override
    public ArrayList<FindAccountDTO> findAccount(HashMap<String, String> param) {
        FindAccountDAO dao = sqlSession.getMapper(FindAccountDAO.class);
        return dao.findAccount(param);
    }

    @Override
    public ArrayList<FindAccountDTO> findPW(HashMap<String, String> param) {
        FindAccountDAO dao = sqlSession.getMapper(FindAccountDAO.class);
        return dao.findPW(param);
    }

    @Override
    public void newPW(String accountId, String newPassword, String role) {

        // 🔐 비밀번호 암호화
        String encPw = passwordEncoder.encode(newPassword);

        dao.newPW(accountId, encPw, role);
    }

}
