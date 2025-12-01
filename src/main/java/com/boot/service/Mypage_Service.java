package com.boot.service;

import java.util.List;
import com.boot.dto.MypageDTO;

public interface Mypage_Service {
    void insertCar(MypageDTO dto);
    List<MypageDTO> selectCarList(String account_id);
    void deleteCar(String car_number);
}
