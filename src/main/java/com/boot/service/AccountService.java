package com.boot.service;

import com.boot.dto.AccountDTO;

public interface AccountService {
    
    /**
     * 회원가입 로직 (비밀번호 암호화 포함)
     * @param accountDTO
     */
    public void register(AccountDTO accountDTO);
}