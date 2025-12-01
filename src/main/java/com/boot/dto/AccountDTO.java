package com.boot.dto;

import java.sql.Date;
import lombok.Data;

@Data // @Getter, @Setter, @ToString, @EqualsAndHashCode, @RequiredArgsConstructor
public class AccountDTO {
    
    // application.properties의 camelCase 설정 덕분에
    // DB의 user_name은 userName으로, account_id는 accountId로 자동 매핑됩니다.
    
    private String userName;
    private String accountId;
    private String password;
    private String currentPassword; // 사용자 입력용, DB에는 없음
    private String newPassword;     // 사용자 입력용, DB에는 없음
    private String email;
    private String phoneNumber;
    private String accountRole;
    private Date regDate;
 // 새로 추가된 필드
    private String account_status; // ACTIVE, SUSPENDED, DELETED
}