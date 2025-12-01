package com.boot.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.boot.dao.ReviewDAO;
import com.boot.dto.ReviewDTO;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService{

	private final ReviewDAO dao;

    @Override
    public Integer existsByRsvNo(Integer rsvNo) {
        return dao.existsByRsvNo(rsvNo);
    }

    @Override
    public int insertReview(ReviewDTO dto, String sessionAccountId) {

        // 1. 세션 사용자와 예약한 사용자 일치하는지 확인
        String rsvOwner = dao.findAccountIdByRsvNo(dto.getRsvNo());
        if (rsvOwner == null || !rsvOwner.equals(sessionAccountId)) {
            throw new RuntimeException("해당 예약의 작성자가 아닙니다.");
        }

        // 2. 예약 상태 확인 (COMPLETED만 리뷰 가능)
        String status = dao.findReservationStatus(dto.getRsvNo());
        if (!"COMPLETED".equals(status)) {
            throw new RuntimeException("이용 완료된 예약만 리뷰 작성이 가능합니다.");
        }

        // 3. 중복 리뷰 방지
        if (dao.existsByRsvNo(dto.getRsvNo()) > 0) {
            throw new RuntimeException("이미 리뷰가 존재합니다.");
        }

        dto.setAccountId(sessionAccountId);

        return dao.insertReview(dto);
    }

    @Override
    public int updateReview(ReviewDTO dto, String sessionAccountId) {

        // 리뷰가 존재하는지 확인
        ReviewDTO origin = dao.findById(dto.getReviewNo());
        if (origin == null) {
            throw new RuntimeException("리뷰가 존재하지 않습니다.");
        }

        // 작성자 본인인지 검증
        if (!origin.getAccountId().equals(sessionAccountId)) {
            throw new RuntimeException("본인의 리뷰만 수정할 수 있습니다.");
        }

        // 수정 처리
        return dao.updateReview(dto);
    }


    @Override
    public List<ReviewDTO> findByStoreId(String storeId) {
        return dao.findByStoreId(storeId);
    }

    @Override
    public ReviewDTO getReview(Integer reviewNo) {
        return dao.findById(reviewNo);
    }

	@Override
	public Double getAverageRating(String storeId) {
		return dao.getAverageRating(storeId);
	}

	@Override
	public Integer deleteReview(Integer reviewNo) {
		return dao.deleteReview(reviewNo);
	}

	@Override
	public List<ReviewDTO> findByStoreIdPaged(String storeId, int pageNum, int amount) {
		return dao.findByStoreIdPaged(storeId, pageNum, amount);
	}

	@Override
	public int countByStoreId(String storeId) {
		return dao.countByStoreId(storeId);
	}
    
}
