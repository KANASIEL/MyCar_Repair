package com.boot.dto;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StoreReservationDTO {
    // TBL_RESERVATION PK
    private Integer rsvNo;
    
    // 외래키 관련
    private String accountId;
    private String storeId;
    
    // 예약 상세 정보
    private String storeName; // 필요 시 사용
    private Date rsvDate; 
    private String carModel;
    private String serviceType;
    private String requestMemo;
    
    // 예약 상태 (PENDING, CONFIRMED, CANCELED 등)
    private String status; 
    private Date createdDate;

    // ⭐️ 화면 출력용 (TBL_ACCOUNT 조인 데이터)
    private String customerName;  // 고객 이름
    private String customerPhone; // 고객 전화번호
}