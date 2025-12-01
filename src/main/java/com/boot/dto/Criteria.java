// Criteria.java  ← 당신 코드 그대로 + offset 추가 (선택)
package com.boot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Criteria {
    private int pageNum = 1;
    private int amount = 10;
    private String type;
    private String keyword;
    
    // MyBatis에서 type을 배열로 쓰고 싶을 때 (검색 기능 확장 대비)
    public String[] getTypeArr() {
        return type == null ? new String[]{} : type.split("");
    }
}