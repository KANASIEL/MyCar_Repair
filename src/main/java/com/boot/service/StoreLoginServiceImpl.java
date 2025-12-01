package com.boot.service;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.dao.StoreLoginDAO;
import com.boot.dto.StoreLoginDTO;

@Service
public class StoreLoginServiceImpl implements StoreLoginService{

	@Autowired
	private SqlSession sqlSession;
	
	@Override
	public ArrayList<StoreLoginDTO> storeLoginYn(HashMap<String, String> param) {
	    StoreLoginDAO dao = sqlSession.getMapper(StoreLoginDAO.class);
	    ArrayList<StoreLoginDTO> list = dao.storeLoginYn(param);

	    if (list.isEmpty()) return null;

	    StoreLoginDTO store = list.get(0);

	    if ("PENDING".equalsIgnoreCase(store.getStoreStatus())) {
	        throw new IllegalStateException("관리자 승인 대기 중입니다.");
	    } else if ("REJECTED".equalsIgnoreCase(store.getStoreStatus())) {
	        throw new IllegalStateException("승인 거절된 계정입니다.");
	    }

	    return list;
	}


}
