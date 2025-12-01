package com.boot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class KeywordDTO {
	private Long id;
    private String keyword;
    private String link;
}
