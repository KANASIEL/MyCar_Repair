package com.boot.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.dao.StoreReservationDAO;
import com.boot.dto.StoreReservationDTO;

@Service
public class StoreReservationServiceImpl implements StoreReservationService {

    @Autowired
    private StoreReservationDAO storeReservationDAO;

    @Override
    public List<StoreReservationDTO> getReservations(String storeId) {
        return storeReservationDAO.selectReservationsByStoreId(storeId);
    }

    @Override
    public boolean changeStatus(int rsvNo, String status) {
        Map<String, Object> map = new HashMap<>();
        map.put("rsvNo", rsvNo);
        map.put("status", status); // "CONFIRMED" or "CANCELED"
        
        int result = storeReservationDAO.updateReservationStatus(map);
        return result > 0;
    }
}