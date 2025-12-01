package com.boot.service;

import com.boot.dto.ConsumableItemDTO;
import com.boot.dto.ConsumableLogDTO;
import com.boot.dto.MypageDTO;
import com.boot.dto.RepairHistoryDTO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface MaintenanceService {
    List<MypageDTO> getMyCars(String account_id);
    List<RepairHistoryDTO> getRepairHistory(String car_number);

    // DTO 반환으로 복원: Front-end에서 ID 포함된 객체 전체를 필요로 함
    RepairHistoryDTO addRepairHistory(RepairHistoryDTO repairHistoryDTO);

    List<ConsumableItemDTO> getAllConsumableItems();
    List<ConsumableLogDTO> getConsumableLogs(String car_number);

    // DTO 반환 유지: Front-end에서 ID 포함된 객체 전체를 필요로 함
    ConsumableLogDTO addConsumableLog(ConsumableLogDTO consumableLogDTO);

    void addRepairHistoryFromConsumableLog(ConsumableLogDTO consumableLogDTO);

    void deleteRepairHistory(int repair_id);
    void deleteConsumableLog(int replace_id);
}
