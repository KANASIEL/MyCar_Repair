package com.boot.controller;
import com.boot.dto.Criteria;
import com.boot.dto.InquiryDTO;
import com.boot.dto.PagingDTO;
import com.boot.service.InquiryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/inquiry")
public class InquiryController {

    private final InquiryService inquiryService;

    @GetMapping("/history")
    public ResponseEntity<Map<String, Object>> inquiryHistory(Criteria cri, HttpSession session) {
        String customer_id = (String) session.getAttribute("accountId");

        List<InquiryDTO> inquiryList = inquiryService.getInquiryListWithPaging(cri, customer_id);
        int total = inquiryService.getTotalUserInquiry(cri, customer_id);
        PagingDTO pageMaker = new PagingDTO(total, cri);

        Map<String, Object> response = new HashMap<>();
        response.put("inquiryList", inquiryList);
        response.put("pageMaker", pageMaker);

        return ResponseEntity.ok(response);
    }


    @GetMapping("/manage")
    public ResponseEntity<Map<String, Object>> inquiryManage(Criteria cri, HttpSession session) {
        String role = (String) session.getAttribute("ROLE");

        List<InquiryDTO> inquiryManage = inquiryService.getInquiryManageWithPaging(cri);
        int total = inquiryService.getTotalAllInquiry(cri);
        PagingDTO pageMaker = new PagingDTO(total, cri);

        Map<String, Object> response = new HashMap<>();
        response.put("inquiryManage", inquiryManage);
        response.put("pageMaker", pageMaker);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/view/{inquiry_no}")
    public Map<String, Object> inquiryView(@PathVariable("inquiry_no") int inquiry_no) {

        InquiryDTO inquiryView = inquiryService.getInquiryView(inquiry_no);

        Map<String, Object> response = new HashMap<>();
        response.put("inquiryView", inquiryView);
        return response;
    }

    @GetMapping("/reply_write/{inquiry_no}")
    public Map<String, Object> replyWrite(@PathVariable("inquiry_no") int inquiry_no) {

        InquiryDTO reply = inquiryService.getInquiryView(inquiry_no);

        Map<String, Object> response = new HashMap<>();
        response.put("reply", reply);
        return response;
    }

    @PostMapping("/replyProcess")
    public ResponseEntity<Map<String, Object>> inquiryReplyProcess(InquiryDTO inquiryDTO){
        inquiryService.inquiryReplyProcess(inquiryDTO);
        return ResponseEntity.ok(Map.of("success", true));
    }


    @GetMapping("/write")
    public ResponseEntity<Map<String, Object>> inquiryWrite(HttpSession session) {
        String customer_id = (String) session.getAttribute("accountId");

        InquiryDTO customerInfo = inquiryService.getUserInfo(customer_id);

        if (customerInfo == null) {
            // 회원 정보가 조회되지 않을 경우 (매우 드문 경우)
            return ResponseEntity.status(500).body(Map.of("message", "회원 정보를 불러올 수 없습니다."));
        }

        // 💡 2. 조회된 정보를 응답에 담아 보냅니다.
        Map<String, Object> response = new HashMap<>();
        response.put("customerInfo", customerInfo);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/writeProcess")
    public ResponseEntity<Map<String, Object>> inquiryWriteProcess(InquiryDTO inquiryDTO, HttpSession session){
        String customer_id = (String) session.getAttribute("accountId");
        inquiryDTO.setCustomer_id(customer_id);

        inquiryService.inquiryWriteProcess(inquiryDTO);

        return ResponseEntity.ok(Map.of("success", true));
    }

    @PostMapping("/deleteProcess")
    public ResponseEntity<Map<String, Object>> deleteInquiry(@RequestBody Map<String, List<Integer>> requestBody,
                                                             HttpSession session) {
        String customer_id = (String) session.getAttribute("accountId");
        List<Integer> inquiryNos = requestBody.get("inquiryNos");

        inquiryService.inquiryDeleteProcess(inquiryNos, customer_id);
        return ResponseEntity.ok(Map.of("success", true));
    }


}