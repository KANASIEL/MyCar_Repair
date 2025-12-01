package com.boot.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FindAccountDTO {

	private String accountId;
    private String phoneNumber;
    private String email;
    private String role;
}
