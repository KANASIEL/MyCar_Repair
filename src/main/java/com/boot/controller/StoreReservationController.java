package com.boot.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.boot.dto.StoreReservationDTO;
import com.boot.service.StoreReservationService;

@RestController
@RequestMapping("/api/store")
public class StoreReservationController {

    @Autowired
    private StoreReservationService storeReservationService;

    // 1. 내 정비소 예약 목록 조회
    @GetMapping("/reservations/{storeId}")
    public ResponseEntity<List<StoreReservationDTO>> getReservations(@PathVariable String storeId) {
        List<StoreReservationDTO> list = storeReservationService.getReservations(storeId);
        return ResponseEntity.ok(list);
    }

    // 2. 예약 승인 및 거절 (상태 변경)
    @PutMapping("/reservation/{rsvNo}/status")
    public ResponseEntity<String> updateStatus(
            @PathVariable int rsvNo, 
            @RequestBody Map<String, String> payload) {
        
        String status = payload.get("status");
        boolean isSuccess = storeReservationService.changeStatus(rsvNo, status);
        
        if (isSuccess) {
            return ResponseEntity.ok("상태가 변경되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("상태 변경에 실패했습니다.");
        }
    }
}