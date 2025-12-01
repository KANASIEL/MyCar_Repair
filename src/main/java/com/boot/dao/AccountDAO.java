package com.boot.dao;

import org.apache.ibatis.annotations.Mapper;
import com.boot.dto.AccountDTO;

@Mapper // MyBatis가 이 인터페이스를 Mapper(DAO)로 인식
public interface AccountDAO {
    
    /**
     * 회원가입 (tbl_account에 삽입)
     * @param accountDTO (암호화된 DTO 객체)
     */
    public void register(AccountDTO accountDTO);
}