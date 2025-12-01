package com.boot.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.boot.dto.ReservationDTO;

@Mapper
public interface ReservationDAO {
	// TBL_RESERVATION 테이블에 DTO를 기반으로 데이터를 삽입.
    public void insertReservation(ReservationDTO reservationDto);
    
    // 예약 상태 업데이트 (CONFIRMED, COMPLETED 등)
    public void updateReservationStatus(@Param("rsvNo") int rsvNo, @Param("status") String status);    
    
    // 사용자별 예약 목록 조회 (마이페이지용)
    public List<ReservationDTO> getListByAccountId(String accountId);
    
    // 예약 정보 수정 (날짜, 메모, 차종 등)
    public int modifyReservation(ReservationDTO reservationDto);
    
    // 예약 상세보기
    public ReservationDTO getReservationByRsvNo(int rsvNo);

}
