package com.boot.dto;

import java.sql.Date;
import lombok.Data;

@Data // @Getter, @Setter, @ToString, @EqualsAndHashCode, @RequiredArgsConstructor
public class LoginDTO {
    
    // application.properties의 camelCase 설정 덕분에
    // DB의 user_name은 userName으로, account_id는 accountId로 자동 매핑됩니다.
    
    private String userName;
    private String accountId;
    private String password;
    private String email;
    private String phoneNumber;
    private String accountRole;
    private Date regDate;
    private String accountStatus;

}