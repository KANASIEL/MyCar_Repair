package com.boot.dao;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;

import com.boot.dto.StoreLoginDTO;

@Mapper
public interface StoreLoginDAO {

	public ArrayList<StoreLoginDTO> storeLoginYn(HashMap<String, String>param);
}
