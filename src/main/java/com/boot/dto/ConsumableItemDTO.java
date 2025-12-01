// 3. 소모품 마스터 DTO
package com.boot.dto;

import lombok.Data;

@Data
public class ConsumableItemDTO {
    private String consumable_key;        // CONSUMABLE_KEY (PK)
    private String name;                 // NAME
    private int standard_cycle_km;     // STANDARD_CYCLE_KM
    private int standard_cycle_months; // STANDARD_CYCLE_MONTHS
    private String category;             // CATEGORY
}