package com.boot.service;

import java.util.ArrayList;
import java.util.HashMap;

import com.boot.dto.LoginDTO;

public interface LoginService {
    
    /**
     * 회원가입 로직 (비밀번호 암호화 포함)
     * @param accountDTO
     */
    public void register(LoginDTO accountDTO);
    
    
    public ArrayList<LoginDTO> loginYn(HashMap<String, String>param);

    LoginDTO findByAccountId(String accountId);
}