package com.boot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.boot.dao.StoreDAO;
import com.boot.dto.StoreDTO;

public interface StoreService {

    /**
     * 업체 회원가입 로직 (비밀번호 암호화 포함)
     * @param storeDTO
     */    
    public List<StoreDTO> getAllStores();
    boolean registerStore(StoreDTO dto);
}