// 2. 소모품 교체 이력 DTO
package com.boot.dto;

import lombok.Data;
import java.util.Date;

@Data
public class ConsumableLogDTO {
    private int replace_id;
    private String car_number;
    private String consumable_key;
    private String replacement_date;
    private int replacement_mileage;
    private String shop_name;
    private int cost;
    private String memo;
}