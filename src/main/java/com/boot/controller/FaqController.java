package com.boot.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping; // DELETE 요청
import org.springframework.web.bind.annotation.GetMapping; // GET 요청
import org.springframework.web.bind.annotation.PathVariable; // 경로 변수
import org.springframework.web.bind.annotation.PostMapping; // POST 요청
import org.springframework.web.bind.annotation.PutMapping; // PUT 요청
import org.springframework.web.bind.annotation.RequestBody; // JSON 본문
import org.springframework.web.bind.annotation.RestController;

import com.boot.dto.FaQDTO;
import com.boot.dto.Criteria;
import com.boot.dto.PageDTO;
import com.boot.service.FaqService;

import lombok.extern.slf4j.Slf4j;

@RestController // JSON 응답을 위해 사용
@Slf4j
// React 개발 서버 포트 5173에 대한 CORS 허용
@CrossOrigin(origins = "http://localhost:5173") 
public class FaqController {
	
	@Autowired
	private FaqService service;
	
	@GetMapping("/faq") 
	public ResponseEntity<Map<String, Object>> getFaqList(Criteria cri) { // ⭐️ Map 대신 ResponseEntity 사용 권장
	    log.info("@# getFaqList() with criteria: {}", cri);
	    
	    try {
	        java.util.List<FaQDTO> list = service.getList(cri); 
	        
	        int total = service.getTotal(cri); 
	        
	        Map<String, Object> response = new HashMap<>();
	        response.put("list", list); 
	        response.put("pageMaker", new PageDTO(total, cri)); 
	        
	        return new ResponseEntity<>(response, HttpStatus.OK);
	        
	    } catch (Exception e) {
	        log.error("FAQ 목록 조회 중 오류 발생", e);
	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	    }
	}
    // 2. FAQ 상세 조회 (READ)
    // 프론트엔드 URL 경로에 맞춤: GET /faq/view/{faqNo}
	@GetMapping("/faq/view/{faqNo}") 
	public ResponseEntity<FaQDTO> getFaqDetail(@PathVariable("faqNo") int faqNo) {
	    log.info("@# getFaqDetail() with faqNo: {}", faqNo);
	    
	    // 기존 서비스 메서드 호출
	    FaQDTO faqDto = service.contentView(faqNo); 
	    
	    if (faqDto == null) {
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 데이터가 없으면 404
	    }
	    
	    return new ResponseEntity<>(faqDto, HttpStatus.OK); // 200 OK와 함께 데이터 반환
	}

    // 3. FAQ 등록 (CREATE)
    // 새로운 RESTful 경로: POST /faq (Body에 JSON 데이터)
    @PostMapping("/faq")
    public ResponseEntity<String> registerFaq(@RequestBody Map<String, String> param) {
        log.info("@# registerFaq - DB 저장 요청 param: {}", param);
        
        try {
            // 기존 서비스 메서드 시그니처 유지: HashMap<String, String> 사용
            service.writeFaq((HashMap<String, String>) param); 
            return new ResponseEntity<>("SUCCESS", HttpStatus.CREATED); // 201 Created
        } catch (Exception e) {
            log.error("FAQ 등록 중 오류 발생", e);
            return new ResponseEntity<>("FAIL: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR); // 500 Error
        }
    }
	
    // 4. FAQ 수정 (UPDATE)
    // 새로운 RESTful 경로: PUT /faq/{faqNo}
    // 기존 서비스 메서드는 HashMap을 받으므로, 파라미터와 경로 변수를 합친 Map을 만듭니다.
	@PutMapping("/faq/{faqNo}")
    public ResponseEntity<String> modifyFaq(@PathVariable("faqNo") String faqNo, @RequestBody Map<String, String> requestBody) {
	   log.info("@# modifyFaq() with faqNo: {}", faqNo);
	   
       // JSON 본문과 경로 변수를 하나의 HashMap으로 합치기
       HashMap<String, String> param = new HashMap<>(requestBody);
       param.put("faq_no", faqNo); // 기존 서비스가 요구하는 faq_no 키 추가

       try {
           service.modifyFaq(param); // 기존 서비스 메서드 호출
           return new ResponseEntity<>("SUCCESS", HttpStatus.OK); // 200 OK
       } catch (Exception e) {
           log.error("FAQ 수정 중 오류 발생", e);
           return new ResponseEntity<>("FAIL: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }
   
    // 5. FAQ 삭제 (DELETE)
    // 새로운 RESTful 경로: DELETE /faq/{faqNo}
    // 기존 서비스 메서드는 HashMap을 받으므로, faq_no를 담은 Map을 생성합니다.
	@DeleteMapping("/faq/{faqNo}") 
    public ResponseEntity<String> deleteFaq(@PathVariable("faqNo") String faqNo) {
   	
   	log.info("@# deleteFaq() with faqNo: {}", faqNo);
   	
        // 기존 서비스가 요구하는 HashMap 생성 및 faq_no 추가
        HashMap<String, String> param = new HashMap<>();
        param.put("faq_no", faqNo); 
       
        try {
           service.deleteFaq(param); // 기존 서비스 메서드 호출
           return new ResponseEntity<>("SUCCESS", HttpStatus.OK); // 200 OK
       } catch (Exception e) {
           log.error("FAQ 삭제 중 오류 발생", e);
           return new ResponseEntity<>("FAIL: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }
	
	
}