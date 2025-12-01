// src/main/java/com/boot/dto/InquiryDTO.java
package com.boot.dto;

import lombok.Data;

@Data
public class InquiryDTO {
    private Long inquiry_no;
    private String customer_id;
    private String customer_name;
    private String customer_phone;
    private String customer_email;
    private String inquiry_title;
    private String inquiry_content;
    private String inquiry_created;      // TO_CHAR 적용된 "2025년 11월 25일 14시30분"
    private String inquiry_status;       // "답변대기" or "답변완료"
    private String reply_content;
    private String reply_created;
}