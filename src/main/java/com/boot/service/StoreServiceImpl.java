package com.boot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;   // 🔥 추가
import org.springframework.stereotype.Service;

import com.boot.dao.StoreDAO;
import com.boot.dto.StoreDTO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class StoreServiceImpl implements StoreService {

    @Autowired
    private StoreDAO storeDAO;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;   // 🔥 추가

    @Override
    public boolean registerStore(StoreDTO dto) {
        log.info("업체 가입 요청 데이터: {}", dto);

        // 🔐 비밀번호 암호화 (StoreDTO에 password가 있다면)
        if (dto.getPassword() != null) {
            String encPw = passwordEncoder.encode(dto.getPassword());
            dto.setPassword(encPw);
            log.info("🔐 정비소 암호화 비밀번호 저장됨: {}", encPw);
        }

        // 영업시간 조합
        String combinedTime = "";
        if (dto.getDayType() != null && dto.getStartTime() != null) {
            combinedTime = String.format("%s %s시 ~ %s시", 
                    dto.getDayType(), dto.getStartTime(), dto.getEndTime());
        }
        dto.setOpeningHours(combinedTime);

        try {
            int result = storeDAO.registerStore(dto);
            return result > 0;
        } catch (Exception e) {
            log.error("DB 저장 중 에러 발생", e);
            return false;
        }
    }

    @Override
    public List<StoreDTO> getAllStores() {
        return storeDAO.findAllStores();
    }
}
