// src/main/java/com/boot/service/InquiryServiceImpl.java
package com.boot.service;

import com.boot.dao.InquiryDAO;
import com.boot.dto.Criteria;
import com.boot.dto.InquiryDTO;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InquiryServiceImpl implements InquiryService {
    private final SqlSession sqlSession;

    @Override
    public List<InquiryDTO> getInquiryListWithPaging(Criteria cri, String customer_id) {
        InquiryDAO dao = sqlSession.getMapper(InquiryDAO.class);
        return dao.getInquiryListWithPaging(cri, customer_id);
    }

    @Override
    public int getTotalUserInquiry(Criteria cri, String customer_id) {
        InquiryDAO dao = sqlSession.getMapper(InquiryDAO.class);
        return dao.getTotalUserInquiry(cri, customer_id);
    }

    @Override
    public List<InquiryDTO> getInquiryManageWithPaging(Criteria cri) {
        InquiryDAO dao = sqlSession.getMapper(InquiryDAO.class);
        return dao.getInquiryManageWithPaging(cri);
    }

    @Override
    public int getTotalAllInquiry(Criteria cri) {
        InquiryDAO dao = sqlSession.getMapper(InquiryDAO.class);
        return dao.getTotalAllInquiry(cri);
    }

    @Override
    public InquiryDTO getInquiryView(int inquiry_no) {
        InquiryDAO dao = sqlSession.getMapper(InquiryDAO.class);
        return dao.getInquiryView(inquiry_no);
    }

    @Override
    public void inquiryReplyProcess(InquiryDTO inquiryDTO) {
        InquiryDAO dao = sqlSession.getMapper(InquiryDAO.class);
        dao.inquiryReplyProcess(inquiryDTO);
    }

    @Override
    public InquiryDTO getUserInfo(String customer_id) {
        InquiryDAO dao = sqlSession.getMapper(InquiryDAO.class);
        return dao.getUserInfo(customer_id);
    }

    @Override
    public void inquiryWriteProcess(InquiryDTO inquiryDTO) {
        InquiryDAO dao = sqlSession.getMapper(InquiryDAO.class);
        dao.inquiryWriteProcess(inquiryDTO);
    }

    @Override
    public void inquiryDeleteProcess(List<Integer> inquiryNos, String customer_id) {
        InquiryDAO dao = sqlSession.getMapper(InquiryDAO.class);
        dao.inquiryDeleteProcess(inquiryNos, customer_id);
    }
}