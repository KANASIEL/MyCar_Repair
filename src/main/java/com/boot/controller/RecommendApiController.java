package com.boot.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.boot.dto.RecommendDTO;
import com.boot.service.RecommendService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController // 1. JSON 데이터만 반환하는 컨트롤러
@RequestMapping("/api/react/recommend") // 2. React가 요청하는 주소와 일치시킴
@CrossOrigin(origins = "http://localhost:5173") // 3. React(Vite) 포트 허용 (CORS 해결)
public class RecommendApiController {

    @Autowired
    private RecommendService recommendService;

    @GetMapping
    public List<RecommendDTO> getRecommendData(@RequestParam(value = "region", required = false) String region) {
        
        // 1. 전체 데이터 가져오기 (캐시된 데이터)
        List<RecommendDTO> list = recommendService.selectMapList();
        
        // 2. 지역 필터링 로직 (기존 로직을 그대로 가져와서 적용)
        if (region != null && !region.isEmpty() && !"전체".equals(region)) {
            String r = region.trim();
            
            // 지역명 매핑 (사용자가 '서울' 선택 시 -> '서울', '서울특별시' 모두 포함되게)
            Map<String, List<String>> regionMap = Map.ofEntries(
                Map.entry("서울", List.of("서울", "서울특별시")),
                Map.entry("부산", List.of("부산", "부산광역시")),
                Map.entry("대구", List.of("대구", "대구광역시")),
                Map.entry("인천", List.of("인천", "인천광역시")),
                Map.entry("광주", List.of("광주", "광주광역시")),
                Map.entry("대전", List.of("대전", "대전광역시")),
                Map.entry("울산", List.of("울산", "울산광역시")),
                Map.entry("세종", List.of("세종", "세종특별자치시", "세종시")),
                Map.entry("경기", List.of("경기", "경기도")),
                Map.entry("강원", List.of("강원", "강원도", "강원특별자치도")),
                Map.entry("충북", List.of("충북", "충청북도")),
                Map.entry("충남", List.of("충남", "충청남도")),
                Map.entry("전북", List.of("전북", "전라북도", "전북특별자치도")),
                Map.entry("전남", List.of("전남", "전라남도")),
                Map.entry("경북", List.of("경북", "경상북도")),
                Map.entry("경남", List.of("경남", "경상남도")),
                Map.entry("제주", List.of("제주", "제주특별자치도", "제주도"))
            );

            // 선택된 지역에 해당하는 키워드 리스트 가져오기
            List<String> variants = regionMap.getOrDefault(r, List.of(r));

            // 주소에 해당 키워드가 포함된 데이터만 남김 (Stream API 사용)
            list = list.stream()
                    .filter(dto -> {
                        String addr = dto.getAddress();
                        if (addr == null) return false;
                        return variants.stream().anyMatch(addr::contains);
                    })
                    .collect(Collectors.toList());
        }

        // 3. 데이터 개수 제한 (너무 많으면 지도 렉 걸림)
        int maxCount = (region != null && !region.isEmpty()) ? 2000 : 1000;
        if (list.size() > maxCount) {
            list = list.subList(0, maxCount);
        }

        log.info("[React API] 데이터 요청: 지역={}, 반환 개수={}", region, list.size());
        
        return list;
    }
}