package com.boot.dao;

import com.boot.dto.MaintenanceFavoritesDTO;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface MaintenanceFavoriteDAO {
    List<MaintenanceFavoritesDTO> getFavoritesByCarNumber(@Param("car_number") String car_number);
    int isFavorite(MaintenanceFavoritesDTO favoritesDTO);
    void insertFavorite(MaintenanceFavoritesDTO favoritesDTO);
    void deleteFavorite(MaintenanceFavoritesDTO favoritesDTO);
    int getMaxOrder(@Param("car_number") String car_number);
    void reorderAfterDelete(MaintenanceFavoritesDTO favoritesDTO);
    int getCurrentOrder(MaintenanceFavoritesDTO favoritesDTO);
}
