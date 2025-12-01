package com.boot.dto;

import java.sql.Date;

import lombok.Data;

@Data
public class StoreDTO {
// 1. DB 기본 정보 필드 (TBL_STORE 컬럼)
    private String storeId;       // store_id (PK)
    private String password;      // password
    private String storeName;     // store_name (업체명)
    private String email;         // email
    private String phoneNumber;   // phone_number
    private Date regDate;         // reg_date (날짜 타입이므로 java.sql.Date 유지)
    
    // 2. 업체 상세 정보 필드
    private String address;       // address
    private Double latitude;      // latitude (NULL 허용을 위해 래퍼 클래스 Double 사용)
    private Double longitude;     // longitude (NULL 허용을 위해 래퍼 클래스 Double 사용)
    private String description;   // description (CLOB 또는 긴 문자열)
    private String openingHours;  // opening_hours (DB 저장용)
    
    // 3. 상태 관리 필드
    private String storeStatus;   // store_status (PENDING, APPROVED, REJECTED 등)

    // 4. (선택적) 리액트 폼에서만 받아오는 임시/조합 필드 (DB 저장용 openingHours 조합에 사용)
    // 이 필드들은 DB 컬럼이 아니므로 필요 없으면 제거해도 됩니다.
    // 하지만 openingHours 조합 로직에 필요하다면 유지합니다.
    private String dayType;       // "평일"
    private String startTime;     // "09"
    private String endTime;       // "18"
}