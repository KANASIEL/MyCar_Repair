package com.boot.controller;

import com.boot.dto.*;
import com.boot.service.MaintenanceFavoritesService;
import com.boot.service.MaintenanceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/maintenance")
public class MaintenanceController {

    private final MaintenanceService maintenanceService;
    private final MaintenanceFavoritesService maintenanceFavoritesService;

    @GetMapping("/cars")
    public ResponseEntity<List<MypageDTO>> getMyCars(HttpSession session) {
        String account_id = (String) session.getAttribute("accountId");
        return ResponseEntity.ok(maintenanceService.getMyCars(account_id));
    }

    @GetMapping("/repairHistory/{car_number}")
    public ResponseEntity<List<RepairHistoryDTO>> getRepairHistory(@PathVariable String car_number) {
        return ResponseEntity.ok(maintenanceService.getRepairHistory(car_number));
    }

    @PostMapping("/repair")
    public ResponseEntity<RepairHistoryDTO> repair(@RequestBody RepairHistoryDTO repairHistoryDTO) {
        return ResponseEntity.ok(maintenanceService.addRepairHistory(repairHistoryDTO));
    }


    @GetMapping("/consumables")
    public ResponseEntity<List<ConsumableItemDTO>> getConsumableItems() {
        return ResponseEntity.ok(maintenanceService.getAllConsumableItems());
    }

    @GetMapping("/consumable/log/{car_number}")
    public ResponseEntity<List<ConsumableLogDTO>> getConsumableLogs(@PathVariable String car_number) {
        return ResponseEntity.ok(maintenanceService.getConsumableLogs(car_number));
    }

    @PostMapping("/consumable/log")
    public ResponseEntity<ConsumableLogDTO> addConsumableLog(@RequestBody ConsumableLogDTO consumableLogDTO) {

        ConsumableLogDTO result = maintenanceService.addConsumableLog(consumableLogDTO);
        maintenanceService.addRepairHistoryFromConsumableLog(consumableLogDTO);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/delete/repairHistory/{repair_id}")
    public ResponseEntity<Void> deleteRepair(@PathVariable int repair_id) {
        maintenanceService.deleteRepairHistory(repair_id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/delete/consumableLog/{replace_id}")
    public ResponseEntity<Void> deleteConsumableLog(@PathVariable int replace_id) {
        maintenanceService.deleteConsumableLog(replace_id);
        return ResponseEntity.ok().build();
    }

    // 수정 (한글 100% 해결!)
    @GetMapping("/{car_number:.+}")
    public Map<String, Integer> getFavoriteMap(@PathVariable String car_number) {
        log.info("즐겨찾기 목록 요청 - 차량번호: {}", car_number);
        return maintenanceFavoritesService.getFavoriteMap(car_number);
    }


    @PostMapping("/toggle")
    public ResponseEntity<String> toggleFavorite(@RequestBody MaintenanceFavoritesDTO dto) {
        log.info("즐겨찾기 토글 요청 - 차량: {}, 항목: {}", dto.getCar_number(), dto.getConsumable_key());

        try {
            maintenanceFavoritesService.toggleFavorite(dto.getCar_number(), dto.getConsumable_key());
            return ResponseEntity.ok("success");
        } catch (Exception e) {
            log.error("즐겨찾기 처리 실패", e);
            return ResponseEntity.status(500).body("fail");
        }
    }

}
