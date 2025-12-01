package com.boot.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import com.boot.dto.StoreDTO;

@Mapper
public interface Mypage_StoreDAO {

    // 업체 정보 조회
    StoreDTO getStoreInfo(String storeId);

    // 업체 정보 수정
    int updateStoreInfo(StoreDTO store);

    // 비밀번호 조회
    String getPasswordById(String storeId);

    // 비밀번호 업데이트
    int updatePassword(@Param("storeId") String storeId, @Param("newPw") String newPw);
}
