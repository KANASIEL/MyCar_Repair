package com.boot.dto;

import java.sql.Date;
import lombok.Data;

@Data
public class StoreLoginDTO {
    
    // application.properties의 camelCase 설정 덕분에
    // DB의 store_id는 storeId로, phone_number는 phoneNumber로 자동 매핑됩니다.
    
    private String storeId;
    private String password;
    private String email;
    private String phoneNumber;
    private Date regDate;
    
    // 업체 상세 정보
    private String address;
    private double latitude;    // 위도 (NUMBER -> double)
    private double longitude;   // 경도 (NUMBER -> double)
    private String description; // CLOB -> String
    private String openingHours;
    
 // 추가: 승인 상태 컬럼
    private String storeStatus;  // PENDING, APPROVED, REJECTED
}