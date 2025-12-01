package com.boot.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.boot.dto.AccountDTO;

@Mapper
public interface Mypage_UserDAO {

    AccountDTO getUserInfo(String accountId);
    int updateUserInfo(AccountDTO account);

    String getPasswordByAccountId(String accountId); // 추가
    int updatePassword(@Param("accountId") String accountId, @Param("newPassword") String newPassword); // 추가
}
