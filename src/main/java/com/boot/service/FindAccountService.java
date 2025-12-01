package com.boot.service;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.ibatis.annotations.Param;

import com.boot.dto.FindAccountDTO;

public interface FindAccountService {
	
//	아이디 찾기
	public ArrayList<FindAccountDTO> findAccount(HashMap<String, String>param);
	
//	비밀번호 찾기
	public ArrayList<FindAccountDTO> findPW(HashMap<String, String>param);
	
//	비밀번호 재설정
	public void newPW(@Param("accountId") String accountId,
            @Param("password") String password,
            @Param("role") String role);
	
}
