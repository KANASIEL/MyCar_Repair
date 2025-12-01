package com.boot.service;

import com.boot.dao.MaintenanceFavoriteDAO;
import com.boot.dto.MaintenanceFavoritesDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class MaintenanceFavoritesServiceImpl implements MaintenanceFavoritesService {

    private final SqlSession sqlSession;

    @Override
    public List<MaintenanceFavoritesDTO> getFavoritesByCarNumber(String car_number) {
        MaintenanceFavoriteDAO dao = sqlSession.getMapper(MaintenanceFavoriteDAO.class);
        return dao.getFavoritesByCarNumber(car_number);
    }


    @Transactional
    @Override
    public void toggleFavorite(String car_number, String consumable_key) {
        MaintenanceFavoriteDAO dao = sqlSession.getMapper(MaintenanceFavoriteDAO.class);

        MaintenanceFavoritesDTO dto = new MaintenanceFavoritesDTO();
        dto.setCar_number(car_number);
        dto.setConsumable_key(consumable_key);

        if (dao.isFavorite(dto) > 0) {
            // 삭제 전에 현재 순서 저장 (재정렬 정확도 100%)
            Integer currentOrder = dao.getCurrentOrder(dto);
            dao.deleteFavorite(dto);

            if (currentOrder != null) {
                // 현재 순서를 가진 DTO 재사용해서 재정렬
                MaintenanceFavoritesDTO reorderDto = new MaintenanceFavoritesDTO();
                reorderDto.setCar_number(car_number);
                reorderDto.setConsumable_key(consumable_key);
                reorderDto.setFav_order(currentOrder);
                dao.reorderAfterDelete(reorderDto);
            }
        } else {
            int newOrder = dao.getMaxOrder(car_number);
            dto.setFav_order(newOrder);
            dao.insertFavorite(dto);
        }
    }
    @Override
    public Map<String, Integer> getFavoriteMap(String car_number) {
        List<MaintenanceFavoritesDTO> list = getFavoritesByCarNumber(car_number);
        Map<String, Integer> map = new HashMap<>();
        for (MaintenanceFavoritesDTO dto : list) {
            map.put(dto.getConsumable_key(), dto.getFav_order());
        }
        return map;
    }

}
