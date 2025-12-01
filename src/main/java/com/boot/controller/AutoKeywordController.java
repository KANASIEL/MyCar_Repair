package com.boot.controller;

import java.util.List; 

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.boot.dto.KeywordDTO;
import com.boot.entity.AutoKeyword;
import com.boot.service.AutoKeywordService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/keyword")
public class AutoKeywordController {

    private final AutoKeywordService autoKeywordService;

    @GetMapping("/search")
    public List<KeywordDTO> search(@RequestParam String keyword) {
        List<AutoKeyword> list = autoKeywordService.searchKeyword(keyword);

        return list.stream()
                   .map(k -> new KeywordDTO(k.getId(), k.getKeyword(), k.getLink()))
                   .toList();
    }
}
