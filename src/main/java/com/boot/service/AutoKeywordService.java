package com.boot.service;

import java.util.List;

import com.boot.entity.AutoKeyword;

public interface AutoKeywordService {

	List<AutoKeyword> searchKeyword(String keyword);
}
