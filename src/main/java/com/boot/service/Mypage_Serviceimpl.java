package com.boot.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.boot.dao.MypageDAO;
import com.boot.dto.MypageDTO;

@Service
public class Mypage_Serviceimpl implements Mypage_Service {

    @Autowired
    private MypageDAO dao;

    @Override
    public void insertCar(MypageDTO dto) {
        dao.insertCar(dto);
    }

    @Override
    public List<MypageDTO> selectCarList(String account_id) {
        return dao.selectCarList(account_id);
    }

    @Override
    public void deleteCar(String car_number) {
        dao.deleteCar(car_number);
    }
}
