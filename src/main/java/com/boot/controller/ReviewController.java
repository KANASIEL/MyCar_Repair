package com.boot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.boot.dto.ReviewDTO;
import com.boot.service.ReviewService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/review")
@RequiredArgsConstructor
public class ReviewController {

	private final ReviewService service;

	@PostMapping("/add")
	public ResponseEntity<?> addReview(@RequestBody ReviewDTO dto, HttpSession session) {

	    String loginId = (String) session.getAttribute("accountId");
	    if (loginId == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
	                             .body("로그인 후 이용해주세요.");
	    }

	    dto.setAccountId(loginId); // 여기서 accountId 자동 설정

	    service.insertReview(dto, loginId);

	    return ResponseEntity.ok("리뷰 등록 완료");
	}

	@PutMapping("/{reviewNo}")
	public ResponseEntity<?> updateReview(
	        @PathVariable Integer reviewNo,
	        @RequestBody ReviewDTO dto,
	        HttpSession session) {

	    String sessionAccountId = (String) session.getAttribute("accountId");
	    if (sessionAccountId == null) {
	        return ResponseEntity.status(401).body("로그인 필요");
	    }

	    dto.setReviewNo(reviewNo);          // reviewNo 세팅
	    dto.setAccountId(sessionAccountId); // 작성자 세팅

	    try {
	        service.updateReview(dto, sessionAccountId);
	        return ResponseEntity.ok("success");
	    } catch (RuntimeException e) {
	        return ResponseEntity.status(403).body(e.getMessage());
	    }
	}

	
    @GetMapping("/store/{storeId}")
    public List<ReviewDTO> findByStoreId(@PathVariable String storeId) {
        return service.findByStoreId(storeId);
    }
    
    //평균 별점 구하는 메서드
    @GetMapping("/store/{storeId}/average")
    public Double getAverageRating(@PathVariable String storeId) {
        return service.getAverageRating(storeId);
    }
    
    @GetMapping("/session/user")
    public ResponseEntity<?> getSessionUser(HttpSession session) {
        String accountId = (String) session.getAttribute("accountId");

        if (accountId == null) {
            return ResponseEntity.status(401).body("로그인 안됨");
        }

        return ResponseEntity.ok(accountId);
    }
    
    @PostMapping("/delete")
    public ResponseEntity<?> deleteReview(@RequestParam("reviewNo") Integer reviewNo) {

        int result = service.deleteReview(reviewNo);

        if (result > 0) {
            return ResponseEntity.ok("success");
        } else {
            return ResponseEntity.badRequest().body("fail");
        }
    }
    
    @GetMapping("/store/{storeId}/paged")
    public Map<String, Object> getReviewList(
    		@PathVariable  String storeId,
            @RequestParam int pageNum,
            @RequestParam int amount) {

        List<ReviewDTO> list = service.findByStoreIdPaged(storeId, pageNum, amount);
        int total = service.countByStoreId(storeId);

        Map<String, Object> result = new HashMap<>();
        result.put("list", list);
        result.put("total", total);

        return result;
    }
    
}
