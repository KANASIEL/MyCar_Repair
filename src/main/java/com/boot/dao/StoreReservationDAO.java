package com.boot.dao;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Mapper;
import com.boot.dto.StoreReservationDTO;

@Mapper
public interface StoreReservationDAO {
    // 1. 업체별 예약 목록 조회 (고객 정보 포함)
    public List<StoreReservationDTO> selectReservationsByStoreId(String storeId);

    // 2. 예약 상태 변경 (승인/거절)
    public int updateReservationStatus(Map<String, Object> params);
}