package com.boot.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.boot.dto.MypageDTO;

@Mapper
public interface MypageDAO {
    void insertCar(MypageDTO dto);
    List<MypageDTO> selectCarList(String account_id);
    void deleteCar(String car_number);
}
