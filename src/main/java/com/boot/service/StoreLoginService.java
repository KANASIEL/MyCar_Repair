package com.boot.service;

import java.util.ArrayList;
import java.util.HashMap;

import com.boot.dto.StoreLoginDTO;

public interface StoreLoginService {
	
	public ArrayList<StoreLoginDTO> storeLoginYn(HashMap<String, String>param);

}
