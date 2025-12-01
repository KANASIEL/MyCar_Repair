package com.boot.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boot.dto.ReservationDTO;
import com.boot.service.ReservationService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/reservation")
@Slf4j
@CrossOrigin(origins = "http://localhost:5173")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    // 1. 등록 (C): POST /api/reservation
    @PostMapping
    public ResponseEntity<String> registerReservation(@RequestBody ReservationDTO reservationDto) {
        log.info("Received reservation request: {}", reservationDto);
        
        if (reservationDto.getAccountId() == null || reservationDto.getStoreId() == null) {
             return new ResponseEntity<>("ERROR: Missing user or store ID", HttpStatus.BAD_REQUEST);
        }
        
        try {
            reservationService.registerReservation(reservationDto);
            return new ResponseEntity<>("Reservation registered successfully", HttpStatus.CREATED); 
        } catch (Exception e) {
            log.error("Reservation registration failed", e);
            return new ResponseEntity<>("Reservation failed: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR); 
        }
    }
    
    // 2. 조회 - 사용자 목록 (R): GET /api/reservation/user/{accountId}
    @GetMapping("/user/{accountId}")
    public ResponseEntity<List<ReservationDTO>> getReservationsByUser(@PathVariable("accountId") String accountId) {
        log.info("Fetching reservations for user: {}", accountId);
        
        // 🚨 보안: 실제로는 세션/토큰 ID와 accountId가 일치하는지 확인해야 함
        
        try {
            List<ReservationDTO> list = reservationService.getReservationsByAccountId(accountId);
            return new ResponseEntity<>(list, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Failed to fetch reservations for user {}", accountId, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // 3. 수정 (U): PUT /api/reservation/{rsvNo}
    @PutMapping("/{rsvNo}")
    public ResponseEntity<String> modifyReservation(@PathVariable("rsvNo") int rsvNo, @RequestBody ReservationDTO reservationDto) {
        log.info("Request to modify reservation: {}", rsvNo);
        
        // 경로 변수를 DTO에 넣어 Service로 전달
        reservationDto.setRsvNo(rsvNo); 
        
        try {
            if (reservationService.modifyReservation(reservationDto)) {
                return new ResponseEntity<>("Modification successful", HttpStatus.OK);
            }
            return new ResponseEntity<>("Modification failed (Already approved/completed)", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error("Error during modification: {}", rsvNo, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 4. 취소 (D): DELETE /api/reservation/{rsvNo} (상태 변경)
    @DeleteMapping("/{rsvNo}")
    public ResponseEntity<String> cancelReservation(@PathVariable("rsvNo") int rsvNo) {
        log.info("Request to cancel reservation: {}", rsvNo);
        try {
            if (reservationService.cancelReservation(rsvNo)) {
                return new ResponseEntity<>("Cancellation successful", HttpStatus.OK);
            }
            return new ResponseEntity<>("Cancellation failed (Invalid status or data)", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            log.error("Error during cancellation: {}", rsvNo, e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // 상세보기
    @GetMapping("/{rsvNo}") 
    public ResponseEntity<ReservationDTO> getReservationDetail(@PathVariable("rsvNo") int rsvNo) {
        try {
            ReservationDTO reservation = reservationService.getReservationDetail(rsvNo);
            if (reservation != null) {
                return new ResponseEntity<>(reservation, HttpStatus.OK);
            } else {
                // 해당 예약 번호가 없을 경우
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
            }
        } catch (Exception e) {
            log.error("Error fetching reservation detail: {}", rsvNo, e); 
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}