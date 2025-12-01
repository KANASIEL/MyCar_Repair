package com.boot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.dao.ReservationDAO;
import com.boot.dto.ReservationDTO;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ReservationServiceImpl implements ReservationService{

	@Autowired
    private ReservationDAO reservationDAO;
	
	@Override
	public void registerReservation(ReservationDTO reservationDto) {
		log.info("Registering new reservation: {}", reservationDto);
        // DB에 예약 정보를 삽입
        reservationDAO.insertReservation(reservationDto);		
	}

	@Override
	public List<ReservationDTO> getReservationsByAccountId(String accountId) {
		if (accountId == null || accountId.isEmpty()) {
            // 빈 목록 반환 또는 예외 발생
            return List.of(); 
        }
		return reservationDAO.getListByAccountId(accountId);
	}


	@Override
	public boolean modifyReservation(ReservationDTO reservationDto) {
        int updatedRows = reservationDAO.modifyReservation(reservationDto);
        return updatedRows > 0;
	}

	@Override
	public boolean cancelReservation(int rsvNo) {
		log.info("Cancelling reservation rsvNo: {}", rsvNo);
        // 상태를 'CANCELED'로 업데이트
        reservationDAO.updateReservationStatus(rsvNo, "CANCELED");
        return true; 
	}

	@Override
	public ReservationDTO getReservationDetail(int rsvNo) {
		return reservationDAO.getReservationByRsvNo(rsvNo);
	}




}
