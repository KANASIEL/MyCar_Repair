package com.boot.dto;

import lombok.Data;

@Data
public class ReviewDTO {

	private Integer reviewNo; // 리뷰 번호 
	private Integer rsvNo; // 예약 번호 
	private String accountId; // 작성자 
	private String storeId; // 가게 ID 
	private Double rating; // 별점 
	private String content; // 내용 
	private String createdDate; // 작성일
	
	//예약 정보 
	private String reservationStatus; // PENDING / CONFIRMED / COMPLETED / etc
}