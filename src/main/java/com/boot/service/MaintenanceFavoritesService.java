package com.boot.service;

import com.boot.dto.MaintenanceFavoritesDTO;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface MaintenanceFavoritesService {
    List<MaintenanceFavoritesDTO> getFavoritesByCarNumber(String car_number);

    void toggleFavorite(String car_number, String consumable_key);
    Map<String, Integer> getFavoriteMap(String car_number);

}
