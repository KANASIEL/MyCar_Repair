package com.boot.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boot.dto.StoreDTO;
import com.boot.service.StoreService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController // (또는 @Controller)
@RequestMapping("/api") // ⭐️ 최종 주소: /api/stores
@Slf4j // ⭐️ 로깅 사용
@RequiredArgsConstructor // ⭐️ 생성자 주입을 위한 Lombok 어노테이션
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"}, allowCredentials = "true")
public class StoreController {

    private final StoreService storeService;

    // 2. 세부 주소 registerstore -> 최종 주소: /api/registerstore
    @PostMapping("/registerstore")
    public ResponseEntity<String> registerStore(@RequestBody StoreDTO dto) {
        
        boolean isSuccess = storeService.registerStore(dto);
        
        if (isSuccess) {
            // 리액트에서 response.text() === "success" 로 비교하므로 "success" 반환
            return ResponseEntity.ok("success");
        } else {
            return ResponseEntity.badRequest().body("fail");
        }
    }

    /**
     * GET /api/stores : 예약 가능한 정비소 목록 조회 (프론트엔드 Reservation 컴포넌트에서 호출)
     */
    @GetMapping("/stores")
    public ResponseEntity<List<StoreDTO>> getStoreList() {
        List<StoreDTO> stores = storeService.getAllStores();
        
        // 목록이 비어있으면 204 No Content 대신 빈 배열과 200 OK를 반환하여 프론트 처리가 용이하도록 합니다.
        return ResponseEntity.ok(stores); 
    }
}