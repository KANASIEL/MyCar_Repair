package com.boot.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.boot.dto.ReviewDTO;

@Mapper
public interface ReviewDAO {
	
    // 예약번호로 리뷰 존재 여부
    Integer existsByRsvNo(Integer rsvNo);

    // 리뷰 등록
    int insertReview(ReviewDTO dto);

    // 리뷰 수정
    int updateReview(ReviewDTO dto);
    
    // 리뷰 삭제
    Integer deleteReview(Integer reviewNo);

    // 특정 가게 리뷰 리스트
    List<ReviewDTO> findByStoreId(String storeId);

    // 리뷰 상세
    ReviewDTO findById(Integer reviewNo);

    // 예약 상태 조회 (리뷰 권한 확인용)
    String findReservationStatus(Integer rsvNo);

    // 예약자 ID 검증
    String findAccountIdByRsvNo(Integer rsvNo);
    
    // 별점 평균
    Double getAverageRating(String storeId);
    
    // 페이징
    List<ReviewDTO> findByStoreIdPaged(@Param("storeId") String storeId,
            @Param("pageNum") int pageNum,
            @Param("amount") int amount);

    //전체 개수 조회
    int countByStoreId(String storeId);
    
}
