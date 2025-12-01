package com.boot.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.boot.dto.Criteria;
import com.boot.dto.FaQDTO;

@Mapper
public interface FaQDAO {
	public ArrayList<FaQDTO> list();
	public FaQDTO contentView(int faq_no);

	public void writeFaq(HashMap<String, String> param);
	public void modifyFaq(HashMap<String, String> param);
	public void deleteFaq(HashMap<String, String> param);
	public void updateViewCount(int faq_no);
	
    public List<FaQDTO> getFaqList(Criteria cri); 

    public int getTotal(Criteria cri);
}






















