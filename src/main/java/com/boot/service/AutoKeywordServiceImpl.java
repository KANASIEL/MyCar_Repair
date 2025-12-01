package com.boot.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.boot.dao.AutoKeywordDAO;
import com.boot.entity.AutoKeyword;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AutoKeywordServiceImpl implements AutoKeywordService{

	private final AutoKeywordDAO dao;
	
	@Override
	public List<AutoKeyword> searchKeyword(String keyword) {
		
		 return dao.searchKeyword(keyword);		

	}

}
