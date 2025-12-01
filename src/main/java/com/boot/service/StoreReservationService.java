package com.boot.service;

import java.util.List;
import com.boot.dto.StoreReservationDTO;

public interface StoreReservationService {
    public List<StoreReservationDTO> getReservations(String storeId);
    public boolean changeStatus(int rsvNo, String status);
}