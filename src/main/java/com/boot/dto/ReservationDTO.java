package com.boot.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDTO {
	// TBL_RESERVATION PK (DB에서 자동 생성)
    private Integer rsvNo;
    
    private String storeName;
    
    // ⭐️ FK: TBL_ACCOUNT (예약자)
    private String accountId;
    
    // ⭐️ FK: TBL_STORE (업체)
    private String storeId;
    
    // 예약 정보
    private Date rsvDate; // 예약 날짜 및 시간 (프론트에서 ISO 8601 형태로 전송됨)
    private String carModel;
    private String serviceType;
    private String requestMemo;
    
    // 상태 (DB에서 기본값 'PENDING' 설정됨)
    private String status; 
    private Date createdDate;
}
