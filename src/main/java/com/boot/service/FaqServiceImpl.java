package com.boot.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.dao.FaQDAO;
import com.boot.dao.PageDAO;
import com.boot.dto.FaQDTO;
import com.boot.dto.Criteria;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class FaqServiceImpl implements FaqService{

	@Autowired
	private SqlSession sqlSession;
	
	@Autowired 
    private FaQDAO faqDAO;

	@Override
	public ArrayList<FaQDTO> listWithPaging(Criteria cri) {
		log.info("@# listWithPaging()");
		log.info("@# cri=>"+cri);
		
		PageDAO dao = sqlSession.getMapper(PageDAO.class);
		ArrayList<FaQDTO> list = dao.listWithPaging(cri);
		
		return list;
	}


	
	@Override
	public void writeFaq(HashMap<String, String> param) {
		log.info("@# writeFaq()");
		FaQDAO dao = sqlSession.getMapper(FaQDAO.class);
		dao.writeFaq(param);
		
	}

	@Override
	public void modifyFaq(HashMap<String, String> param) {
		log.info("@# modifyFaq()");
		FaQDAO dao = sqlSession.getMapper(FaQDAO.class);
		dao.modifyFaq(param);
		
	}

	@Override
	public void deleteFaq(HashMap<String, String> param) {
		log.info("@# deleteFaq()");
		log.info("@# FaqNo=>"+param.get("FaqNo"));

		FaQDAO dao = sqlSession.getMapper(FaQDAO.class);
		
		dao.deleteFaq(param);
	}



	@Override
	public FaQDTO contentView(int faq_no) {
		log.info("@# getFaqDetail");
		FaQDAO dao = sqlSession.getMapper(FaQDAO.class);
		
		dao.updateViewCount(faq_no); 
        
	    return dao.contentView(faq_no);	
    }



	@Override
	public void updateViewCount(int faq_no) {
		log.info("@# updateViewCount");
        
		FaQDAO dao = sqlSession.getMapper(FaQDAO.class);
        
        dao.updateViewCount(faq_no);		
	}



	@Override
	public int getTotalCount(Criteria cri) {
		log.info("@# getTotalCount()");
        
		PageDAO dao = sqlSession.getMapper(PageDAO.class);
        
		int total = dao.getTotalCount(cri);
		
		return total;
	}



	@Override
	public List<FaQDTO> getList(Criteria cri) {
		return faqDAO.getFaqList(cri);
	}


	@Override
	public int getTotal(Criteria cri) {
		return faqDAO.getTotal(cri);
	}
}

















