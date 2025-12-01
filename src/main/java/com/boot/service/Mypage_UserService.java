package com.boot.service;

import com.boot.dto.AccountDTO;

public interface Mypage_UserService {
    AccountDTO getUserInfo(String accountId);
    int updateUserInfo(AccountDTO account);
    boolean updatePassword(String accountId, String currentPw, String newPw); // 추가
}
