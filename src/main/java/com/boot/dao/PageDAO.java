package com.boot.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.boot.dto.FaQDTO;
import com.boot.dto.Criteria;

@Mapper
public interface PageDAO {
	public ArrayList<FaQDTO> listWithPaging(Criteria cri);
	int getTotalCount(@Param("cri") Criteria cri);
}






















