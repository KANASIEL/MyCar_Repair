package com.boot.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.boot.dto.FaQDTO;
import com.boot.dto.Criteria;

public interface FaqService {
	public ArrayList<FaQDTO> listWithPaging(Criteria cri);
	public FaQDTO contentView(int faq_no);
	public int getTotalCount(Criteria cri);
	public void writeFaq(HashMap<String, String> param);
	public void modifyFaq(HashMap<String, String> param);
	public void deleteFaq(HashMap<String, String> param);
	public void updateViewCount(int faq_no);
    public List<FaQDTO> getList(Criteria cri); 
    public int getTotal(Criteria cri);
}
