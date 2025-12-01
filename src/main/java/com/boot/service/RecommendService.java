package com.boot.service;

import java.util.ArrayList;
import java.util.List;

import com.boot.dto.RecommendDTO; // (주의) Location 클래스의 실제 위치로 수정해야 합니다.

public interface RecommendService {
int selectListCount(RecommendDTO dto);
	
	int insertCoordinate(RecommendDTO dto);

	int updateCoordinate(RecommendDTO dto);
	
	ArrayList<RecommendDTO> selectMapList();

}