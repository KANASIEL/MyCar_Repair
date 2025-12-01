package com.boot.dto;

import lombok.*;
import java.sql.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter @ToString @EqualsAndHashCode
public class RecommendDTO {
    private String storeId;
    private String password;
    private String email;
    private String phoneNumber;
    private Date regDate;
    private String address;
    private double latitude;
    private double longitude;
    private String description;
    private String openingHours;
    
    private String provider;

}
