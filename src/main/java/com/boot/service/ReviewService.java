package com.boot.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.boot.dto.ReviewDTO;

public interface ReviewService {
	
	// 예약 조회
	Integer existsByRsvNo(Integer rsvNo);

	// 리뷰 작성
	int insertReview(ReviewDTO dto, String sessionAccountId);

	// 리뷰 수정
	int updateReview(ReviewDTO dto, String sessionAccountId);
	
	// 리뷰 삭제
    Integer deleteReview(Integer reviewNo);

    // 리뷰 목록
	List<ReviewDTO> findByStoreId(String storeId);

	ReviewDTO getReview(Integer reviewNo);
	
	// 별점
	Double getAverageRating(String storeId);
	
	// 페이징
    List<ReviewDTO> findByStoreIdPaged(@Param("storeId") String storeId,
            @Param("pageNum") int pageNum,
            @Param("amount") int amount);

    //전체 개수 조회
    int countByStoreId(String storeId);
}
