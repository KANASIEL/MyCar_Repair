package com.boot.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import com.boot.dao.Mypage_StoreDAO;
import com.boot.dto.StoreDTO;

@Service
public class Mypage_StoreServiceImpl implements Mypage_StoreService {

    @Autowired
    private Mypage_StoreDAO dao;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public StoreDTO getStoreInfo(String storeId) {
        return dao.getStoreInfo(storeId);
    }

    @Override
    public int updateStoreInfo(StoreDTO dto) {
        return dao.updateStoreInfo(dto);
    }

    @Override
    public boolean updatePassword(String storeId, String currentPw, String newPw) {

        String dbPw = dao.getPasswordById(storeId);
        if (dbPw == null) return false;

        // bcrypt 비교
        if (!passwordEncoder.matches(currentPw, dbPw)) {
            return false;
        }

        // bcrypt 암호화 저장
        String encodedPw = passwordEncoder.encode(newPw);
        dao.updatePassword(storeId, encodedPw);

        return true;
    }
}
