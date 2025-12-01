package com.boot.dao;

import com.boot.dto.ConsumableItemDTO;
import com.boot.dto.ConsumableLogDTO;
import com.boot.dto.MypageDTO;
import com.boot.dto.RepairHistoryDTO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface MaintenanceDAO {
    // 조회 메서드 (List, DTO 반환은 OK)
    List<MypageDTO> getMyCars(@Param("account_id") String account_id);
    List<RepairHistoryDTO> getRepairHistory(@Param("car_number") String car_number);
    List<ConsumableItemDTO> getAllConsumableItems();
    List<ConsumableLogDTO> getConsumableLogs(@Param("car_number") String car_number);

    // INSERT 메서드 (반환 타입 int로 수정)
    public int addRepairHistory(RepairHistoryDTO repairHistoryDTO);
    public int addConsumableLog(ConsumableLogDTO consumableLogDTO);
    void addRepairHistoryFromConsumableLog(ConsumableLogDTO consumableLogDTO);
    // DELETE 메서드 (void 반환은 OK)
    void deleteRepairHistory(@Param("repair_id") int repair_id);
    void deleteConsumableLog(@Param("replace_id") int replace_id);
}
