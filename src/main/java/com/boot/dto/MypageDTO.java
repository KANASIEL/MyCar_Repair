package com.boot.dto;

import lombok.Data;

import java.util.Date;

@Data
public class MypageDTO {
    private String car_number;
    private String account_id;
    private String car_model;
    private String car_type;
    private int car_mileage;
    private String model_year;
    private Date regi_date;
}
