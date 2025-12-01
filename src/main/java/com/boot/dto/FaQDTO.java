package com.boot.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FaQDTO {
	private int faqNo;
	private String faqTitle;
	private String faqContent;
	private String faqWriter;
	private String faqCreated;
	private String faqHit;
}
