// src/main/java/com/boot/dao/InquiryDAO.java
package com.boot.dao;

import com.boot.dto.Criteria;
import com.boot.dto.InquiryDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface InquiryDAO {
    List<InquiryDTO> getInquiryListWithPaging(@Param("cri") Criteria cri, @Param("customer_id") String customer_id);
    int getTotalUserInquiry(@Param("cri") Criteria cri, @Param("customer_id") String customer_id);
    List<InquiryDTO> getInquiryManageWithPaging(@Param("cri") Criteria cri);
    int getTotalAllInquiry(@Param("cri") Criteria cri);
    InquiryDTO getInquiryView(int inquiry_no);
    void inquiryReplyProcess(InquiryDTO inquiryDTO);
    InquiryDTO getUserInfo(@Param("customer_id") String customer_id);
    void inquiryWriteProcess(InquiryDTO inquiryDTO);
    void inquiryDeleteProcess(List<Integer> inquiryNos,@Param("customer_id") String customer_id);
}