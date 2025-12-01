// src/main/java/com/boot/service/InquiryService.java
package com.boot.service;

import com.boot.dto.Criteria;
import com.boot.dto.InquiryDTO;

import java.util.List;

public interface InquiryService {
    List<InquiryDTO> getInquiryListWithPaging(Criteria cri, String customer_id);
    int getTotalUserInquiry(Criteria cri, String customer_id);
    List<InquiryDTO> getInquiryManageWithPaging(Criteria cri);
    int getTotalAllInquiry(Criteria cri);
    InquiryDTO getInquiryView(int inquiry_no);
     void inquiryReplyProcess(InquiryDTO inquiryDTO);
    InquiryDTO getUserInfo(String customer_id);
    void inquiryWriteProcess(InquiryDTO inquiryDTO);
    void inquiryDeleteProcess(List<Integer> inquiryNos, String customer_id);
}