package com.boot.service;

import com.boot.dto.Criteria;
import com.boot.dto.NoticeDTO;

import java.util.List;

// Service 인터페이스
public interface NoticeService {
    List<NoticeDTO> getNoticeList(Criteria cri);
    int getTotalCount(Criteria cri);
    NoticeDTO getNoticeById(Long noticeNo);
    void increaseViews(Long noticeNo);
    void writeNotice(NoticeDTO notice);
    void updateNotice(NoticeDTO notice);
    void deleteNotice(Long noticeNo);
}