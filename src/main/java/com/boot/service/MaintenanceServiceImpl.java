package com.boot.service;

import com.boot.dao.MaintenanceDAO;
import com.boot.dto.ConsumableItemDTO;
import com.boot.dto.ConsumableLogDTO;
import com.boot.dto.MypageDTO;
import com.boot.dto.RepairHistoryDTO;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MaintenanceServiceImpl implements MaintenanceService {

    private final SqlSession sqlSession;

    @Override
    public List<MypageDTO> getMyCars(String account_id) {
        MaintenanceDAO dao = sqlSession.getMapper(MaintenanceDAO.class);
        return dao.getMyCars(account_id);
    }

    @Override
    public List<RepairHistoryDTO> getRepairHistory(String car_number) {
        MaintenanceDAO dao = sqlSession.getMapper(MaintenanceDAO.class);
        return dao.getRepairHistory(car_number);
    }

    @Override
    public RepairHistoryDTO addRepairHistory(RepairHistoryDTO repairHistoryDTO) {
        MaintenanceDAO dao = sqlSession.getMapper(MaintenanceDAO.class);
        dao.addRepairHistory(repairHistoryDTO);
        return repairHistoryDTO;
    }

    @Override
    public List<ConsumableItemDTO> getAllConsumableItems() {
        MaintenanceDAO dao = sqlSession.getMapper(MaintenanceDAO.class);
        return dao.getAllConsumableItems();
    }

    @Override
    public List<ConsumableLogDTO> getConsumableLogs(String car_number) {
        MaintenanceDAO dao = sqlSession.getMapper(MaintenanceDAO.class);
        return dao.getConsumableLogs(car_number);
    }

    @Override
    public ConsumableLogDTO addConsumableLog(ConsumableLogDTO consumableLogDTO) {
        MaintenanceDAO dao = sqlSession.getMapper(MaintenanceDAO.class);
        dao.addConsumableLog(consumableLogDTO);
        return consumableLogDTO;
    }

    @Override
    public void deleteRepairHistory(int repair_id) {
        MaintenanceDAO dao = sqlSession.getMapper(MaintenanceDAO.class);
        dao.deleteRepairHistory(repair_id);
    }

    @Override
    public void deleteConsumableLog(int replace_id) {
        MaintenanceDAO dao = sqlSession.getMapper(MaintenanceDAO.class);
        dao.deleteConsumableLog(replace_id);
    }

    @Override
    public void addRepairHistoryFromConsumableLog(ConsumableLogDTO consumableLogDTO) {
        MaintenanceDAO dao = sqlSession.getMapper(MaintenanceDAO.class);
        dao.addRepairHistoryFromConsumableLog(consumableLogDTO);
    }
}
